// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title Crowdfill
 * @dev A decentralized OTC marketplace for ERC20 tokens
 * @notice Allows users to create and fill orders for ERC20 tokens with partial fills
 */
contract Crowdfill is ReentrancyGuard, Pausable, Ownable {
    /**
     * @dev Order structure to store order details
     * @notice Using uint96 for amounts and prices, uint32 for timestamps to optimize gas
     */
    struct Order {
        address seller;
        address token;
        uint96 amount;
        uint96 price;
        uint96 filled;
        bool isActive;
        uint32 createdAt;
        uint32 updatedAt;
    }

    /**
     * @dev Fill structure to track individual fills
     */
    struct Fill {
        address buyer;
        uint96 amount;
        uint96 value;
        uint32 timestamp;
    }

    mapping(uint256 => Order) public orders;
    mapping(uint256 => Fill[]) public fills;
    uint256 public orderCount;
    uint16 public platformFee; // in basis points (1% = 100)
    address public feeCollector;

    event OrderCreated(uint256 indexed orderId, address indexed seller, address token, uint96 amount, uint96 price);
    event OrderFilled(uint256 indexed orderId, address indexed buyer, uint96 amount, uint96 value);
    event OrderClosed(uint256 indexed orderId);
    event OrderCancelled(uint256 indexed orderId);
    event PlatformFeeUpdated(uint16 newFee);
    event FeeCollectorUpdated(address newCollector);

    /**
     * @dev Constructor sets the fee collector and initial platform fee
     * @param _feeCollector Address that will receive platform fees
     */
    constructor(address _feeCollector) Ownable(msg.sender) {
        require(_feeCollector != address(0), "Invalid fee collector");
        feeCollector = _feeCollector;
        platformFee = 50; // 0.5% default fee
    }

    /**
     * @dev Creates a new order to sell ERC20 tokens
     * @param _token Address of the ERC20 token to sell
     * @param _amount Amount of tokens to sell
     * @param _price Price per token in wei
     * @return orderId The ID of the created order
     */
    function createOrder(address _token, uint96 _amount, uint96 _price) external whenNotPaused returns (uint256) {
        require(_amount > 0, "Amount must be greater than 0");
        require(_price > 0, "Price must be greater than 0");
        
        IERC20(_token).transferFrom(msg.sender, address(this), _amount);
        
        uint256 orderId = orderCount++;
        orders[orderId] = Order({
            seller: msg.sender,
            token: _token,
            amount: _amount,
            price: _price,
            filled: 0,
            isActive: true,
            createdAt: uint32(block.timestamp),
            updatedAt: uint32(block.timestamp)
        });

        emit OrderCreated(orderId, msg.sender, _token, _amount, _price);
        return orderId;
    }

    /**
     * @dev Fills an existing order by buying tokens
     * @param _orderId ID of the order to fill
     * @param _amount Amount of tokens to buy
     */
    function fillOrder(uint256 _orderId, uint96 _amount) external payable nonReentrant whenNotPaused {
        Order storage order = orders[_orderId];
        require(order.isActive, "Order is not active");
        require(_amount > 0, "Amount must be greater than 0");
        require(order.filled + _amount <= order.amount, "Amount exceeds remaining order size");
        
        uint96 value = _amount * order.price;
        require(msg.value >= value, "Insufficient payment");

        // Calculate and transfer platform fee
        uint96 fee = (value * platformFee) / 10000;
        if (fee > 0) {
            payable(feeCollector).transfer(fee);
        }

        // Transfer remaining ETH to seller
        payable(order.seller).transfer(value - fee);

        order.filled += _amount;
        order.updatedAt = uint32(block.timestamp);
        
        fills[_orderId].push(Fill({
            buyer: msg.sender,
            amount: _amount,
            value: value,
            timestamp: uint32(block.timestamp)
        }));

        IERC20(order.token).transfer(msg.sender, _amount);
        
        if (order.filled == order.amount) {
            order.isActive = false;
            emit OrderClosed(_orderId);
        }

        emit OrderFilled(_orderId, msg.sender, _amount, value);
    }

    /**
     * @dev Closes an active order and returns remaining tokens to seller
     * @param _orderId ID of the order to close
     */
    function closeOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(msg.sender == order.seller, "Only seller can close order");
        require(order.isActive, "Order is not active");
        
        uint96 remaining = order.amount - order.filled;
        if (remaining > 0) {
            IERC20(order.token).transfer(order.seller, remaining);
        }
        
        order.isActive = false;
        order.updatedAt = uint32(block.timestamp);
        emit OrderClosed(_orderId);
    }

    /**
     * @dev Cancels an unfilled order
     * @param _orderId ID of the order to cancel
     */
    function cancelOrder(uint256 _orderId) external {
        Order storage order = orders[_orderId];
        require(msg.sender == order.seller, "Only seller can cancel order");
        require(order.isActive, "Order is not active");
        require(order.filled == 0, "Cannot cancel partially filled order");
        
        uint96 remaining = order.amount - order.filled;
        if (remaining > 0) {
            IERC20(order.token).transfer(order.seller, remaining);
        }
        
        order.isActive = false;
        order.updatedAt = uint32(block.timestamp);
        emit OrderCancelled(_orderId);
    }

    /**
     * @dev Returns all details of an order
     * @param _orderId ID of the order to query
     */
    function getOrder(uint256 _orderId) external view returns (
        address seller,
        address token,
        uint96 amount,
        uint96 price,
        uint96 filled,
        bool isActive,
        uint32 createdAt,
        uint32 updatedAt
    ) {
        Order storage order = orders[_orderId];
        return (
            order.seller,
            order.token,
            order.amount,
            order.price,
            order.filled,
            order.isActive,
            order.createdAt,
            order.updatedAt
        );
    }

    /**
     * @dev Returns all fills for an order
     * @param _orderId ID of the order to query
     */
    function getFills(uint256 _orderId) external view returns (Fill[] memory) {
        return fills[_orderId];
    }

    /**
     * @dev Updates the platform fee
     * @param _newFee New fee in basis points (max 500 = 5%)
     */
    function setPlatformFee(uint16 _newFee) external onlyOwner {
        require(_newFee <= 500, "Fee too high");
        platformFee = _newFee;
        emit PlatformFeeUpdated(_newFee);
    }

    /**
     * @dev Updates the fee collector address
     * @param _newCollector New fee collector address
     */
    function setFeeCollector(address _newCollector) external onlyOwner {
        require(_newCollector != address(0), "Invalid fee collector");
        feeCollector = _newCollector;
        emit FeeCollectorUpdated(_newCollector);
    }

    /**
     * @dev Pauses the contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpauses the contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Withdraws any remaining ETH from the contract
     */
    function withdrawETH() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
} 
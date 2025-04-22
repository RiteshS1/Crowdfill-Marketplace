// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title TestToken
 * @dev A simple ERC20 token for testing the Crowdfill marketplace
 * @notice This token is only for testing purposes and should not be used in production
 */
contract TestToken is ERC20 {
    /**
     * @dev Constructor mints initial supply to the deployer
     */
    constructor() ERC20("Test Token", "TEST") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
} 
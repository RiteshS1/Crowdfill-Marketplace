# Crowdfill Marketplace

A decentralized OTC marketplace for ERC20 tokens with partial fill support.

## Features

- Create and fill orders for ERC20 tokens
- Partial fill support
- Platform fee mechanism
- Order management (close/cancel)
- Emergency pause functionality
- Gas-optimized design

## Contract Architecture

### Crowdfill.sol
Main marketplace contract that handles:
- Order creation and filling
- Partial fills tracking
- Fee collection
- Order management

### TestToken.sol
Simple ERC20 token for testing purposes.

## Development

### Prerequisites
- Node.js
- npm
- Hardhat
- MetaMask

### Setup
1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```
PRIVATE_KEY=your_metamask_private_key
SEPOLIA_URL=your_alchemy_sepolia_url
ETHERSCAN_API_KEY=your_etherscan_api_key
```

### Testing
```bash
npx hardhat test
```

### Deployment
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

## Contract Interaction

### Creating an Order
```solidity
// Approve tokens first
await token.approve(crowdfill.address, amount);
// Create order
await crowdfill.createOrder(token.address, amount, price);
```

### Filling an Order
```solidity
// Fill order with ETH
await crowdfill.fillOrder(orderId, amount, { value: price * amount });
```

### Closing an Order
```solidity
// Close order and get remaining tokens back
await crowdfill.closeOrder(orderId);
```

## Security
- ReentrancyGuard for fill operations
- Pausable for emergency stops
- Ownable for admin functions
- Gas optimizations for cost efficiency

## License
MIT 
const CrowdfillABI = [
    {
      inputs: [
        {
          internalType: "address",
          name: "_feeCollector",
          type: "address",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "OrderCancelled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
      ],
      name: "OrderClosed",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: false,
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint96",
          name: "amount",
          type: "uint96",
        },
        {
          indexed: false,
          internalType: "uint96",
          name: "price",
          type: "uint96",
        },
      ],
      name: "OrderCreated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "uint256",
          name: "orderId",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint96",
          name: "amount",
          type: "uint96",
        },
        {
          indexed: false,
          internalType: "uint96",
          name: "value",
          type: "uint96",
        },
      ],
      name: "OrderFilled",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "previousOwner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "OwnershipTransferred",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Paused",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "newCollector",
          type: "address",
        },
      ],
      name: "FeeCollectorUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "uint16",
          name: "newFee",
          type: "uint16",
        },
      ],
      name: "PlatformFeeUpdated",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: "address",
          name: "account",
          type: "address",
        },
      ],
      name: "Unpaused",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "cancelOrder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "closeOrder",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_token",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "_amount",
          type: "uint96",
        },
        {
          internalType: "uint96",
          name: "_price",
          type: "uint96",
        },
      ],
      name: "createOrder",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "feeCollector",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
        {
          internalType: "uint96",
          name: "_amount",
          type: "uint96",
        },
      ],
      name: "fillOrder",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "getFills",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "buyer",
              type: "address",
            },
            {
              internalType: "uint96",
              name: "amount",
              type: "uint96",
            },
            {
              internalType: "uint96",
              name: "value",
              type: "uint96",
            },
            {
              internalType: "uint32",
              name: "timestamp",
              type: "uint32",
            },
          ],
          internalType: "struct Crowdfill.Fill[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_orderId",
          type: "uint256",
        },
      ],
      name: "getOrder",
      outputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "amount",
          type: "uint96",
        },
        {
          internalType: "uint96",
          name: "price",
          type: "uint96",
        },
        {
          internalType: "uint96",
          name: "filled",
          type: "uint96",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "createdAt",
          type: "uint32",
        },
        {
          internalType: "uint32",
          name: "updatedAt",
          type: "uint32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "orderCount",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "orders",
      outputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          internalType: "address",
          name: "token",
          type: "address",
        },
        {
          internalType: "uint96",
          name: "amount",
          type: "uint96",
        },
        {
          internalType: "uint96",
          name: "price",
          type: "uint96",
        },
        {
          internalType: "uint96",
          name: "filled",
          type: "uint96",
        },
        {
          internalType: "bool",
          name: "isActive",
          type: "bool",
        },
        {
          internalType: "uint32",
          name: "createdAt",
          type: "uint32",
        },
        {
          internalType: "uint32",
          name: "updatedAt",
          type: "uint32",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "owner",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "pause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "paused",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "platformFee",
      outputs: [
        {
          internalType: "uint16",
          name: "",
          type: "uint16",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "renounceOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_newCollector",
          type: "address",
        },
      ],
      name: "setFeeCollector",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint16",
          name: "_newFee",
          type: "uint16",
        },
      ],
      name: "setPlatformFee",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "newOwner",
          type: "address",
        },
      ],
      name: "transferOwnership",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "unpause",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdrawETH",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
  ]
  
  export default CrowdfillABI
  
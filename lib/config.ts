// Contract addresses and configuration
export const CONFIG = {
  // Network configuration
  NETWORK: {
    name: "Sepolia",
    chainId: 11155111,
    rpcUrl: "https://sepolia.infura.io/v3/",
  },

  // Contract addresses
  CONTRACTS: {
    TOKEN: "0x8e90E7a1D70c38987B0bac7F2dbfDA41aD752AD7",
    IDO: "0x98ad7104D652173Ca00BD89805625A15b950dbA9",
    TREASURY: "0x3F9F3Ef80CC1A53ba77a00B5ee66262ED2FEa72D",
  },

  // Token configuration
  TOKEN: {
    name: "g8sToken",
    symbol: "G8S",
    decimals: 18,
    price: 0.000001, // ETH per token (updated price)
    totalSupply: "1000000000000000000000000", // 1M tokens
    tokensForSale: "100000000000000000000000", // 100K tokens
  },

  // IDO configuration
  IDO: {
    startTime: null, // Can be set later
    endTime: null, // Can be set later
    minContribution: "0.001", // ETH
    maxContribution: "10", // ETH
  },

  // UI configuration
  UI: {
    refreshInterval: 5000, // 5 seconds
    gasLimit: 300000,
  },
} as const;

export type Config = typeof CONFIG;

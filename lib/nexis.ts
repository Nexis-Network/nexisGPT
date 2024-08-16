import { defineChain } from 'viem'

export const nexisTestnet = /*#__PURE__*/ defineChain({
  id: 5003,
  name: 'Nexis Testnet',
  network: 'nexis',
  nativeCurrency: {
    decimals: 18,
    name: 'Nexis',
    symbol: 'MNT'
  },
  rpcUrls: {
    default: { http: ['https://evm-devnet.nexis.network'] },
    public: { http: ['https://evm-devnet.nexis.network'] }
  },
  blockExplorers: {
    etherscan: {
      name: 'Nexscan Explorer',
      url: 'https://explorer.sepolia.mantle.xyz'
    },
    default: {
      name: 'Nexscan Explorer',
      url: 'https://explorer.sepolia.mantle.xyz'
    }
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 4584012
    }
  },
  testnet: true
})

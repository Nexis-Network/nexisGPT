"use client"

import { RainbowKitProvider, darkTheme, getDefaultConfig, lightTheme } from "@rainbow-me/rainbowkit"
import "@rainbow-me/rainbowkit/styles.css"
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useTheme } from "next-themes"
import { http, WagmiProvider } from "wagmi"
import {
  arbitrumSepolia,
  baseSepolia,
  holesky,
  mantleSepoliaTestnet,
  polygonAmoy,
  rootstockTestnet,
  sepolia
} from "wagmi/chains"

import { APP_URL } from "@/lib/config"
import { FULL_RPC_URLS } from "@/lib/viem"

const mantleSepoliaWithLogo = {
  ...mantleSepoliaTestnet,
  iconUrl: "/mantle-logo.jpeg"
}

const amoyWithLogo = {
  ...polygonAmoy,
  iconUrl: "/polygon-logo.png"
}

const rootstockWithLogo = {
  ...rootstockTestnet,
  iconUrl: "/assets/rootstock.png"
}

const chains = [
  arbitrumSepolia,
  baseSepolia,
  mantleSepoliaWithLogo,
  holesky,
  amoyWithLogo,
  sepolia,
  rootstockWithLogo
] as const

const queryClient = new QueryClient()

const config = getDefaultConfig({
  appName: "NexisGPT",
  appDescription: "Write and deploy Solidity smart contracts with AI",
  appUrl: APP_URL,
  appIcon: "/assets/nexisgpt.png",
  projectId: `${process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID}`,
  chains: chains,
  transports: {
    [arbitrumSepolia.id]: http(FULL_RPC_URLS[arbitrumSepolia.id]),
    [sepolia.id]: http(FULL_RPC_URLS[sepolia.id]),
    [polygonAmoy.id]: http(FULL_RPC_URLS[amoyWithLogo.id]),
    [baseSepolia.id]: http(FULL_RPC_URLS[baseSepolia.id]),
    [mantleSepoliaTestnet.id]: http(),
    [holesky.id]: http(),
    [rootstockTestnet.id]: http()
  },
  wallets: [
    {
      groupName: "Supported",
      wallets: [safeWallet, metaMaskWallet, rainbowWallet, coinbaseWallet, walletConnectWallet, injectedWallet]
    }
  ],
  ssr: true
})

export function Web3Provider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          appInfo={{
            appName: "NexisGPT",
            disclaimer: ({ Text, Link }) => (
              <Text>
                NexisGPT is an experimental AI tool. Beware of the{" "}
                <Link href="https://docs.soliditylang.org/en/latest/security-considerations.html">risks</Link>{" "}
                associated with deploying smart contracts.
              </Text>
            ),
            learnMoreUrl: "https://x.com/nexisgpt_app"
          }}
          theme={
            resolvedTheme === "dark"
              ? darkTheme({
                  accentColor: "#ffffff",
                  accentColorForeground: "black"
                })
              : lightTheme({
                  accentColor: "#21C55E",
                  accentColorForeground: "white"
                })
          }
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

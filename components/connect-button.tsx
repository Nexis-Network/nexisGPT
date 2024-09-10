'use client'; // Mark this as a client-side component

import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function ConnectBtn() {
  return (
    <div className="flex items-center justify-end space-x-2">
      <ConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          mounted,
        }) => {
          const ready = mounted;
          const connected = ready && account && chain;

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {connected ? (
                <button
                  onClick={openAccountModal}
                  className="bg-[#fff]/20 text-xs text-[#fff]/80 rounded-full px-4 py-2 hover:bg-[#fff]/25 transition-all shadow-lg"
                >
                  {account.displayName}
                </button>
              ) : (
                <button
                  onClick={openConnectModal}
                  className="bg-[#fff]/20 text-xs text-[#fff]/80 rounded-full px-4 py-2 hover:bg-[#fff]/25 transition-all shadow-lg"
                >
                  Connect Wallet
                </button>
              )}
            </div>
          );
        }}
      </ConnectButton.Custom>
    </div>
  );
}

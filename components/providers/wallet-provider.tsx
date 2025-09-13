"use client";

import { createContext, useContext, ReactNode } from "react";
import { useContracts } from "@/hooks/use-contracts";

interface WalletContextType {
  account: string | null;
  data: any;
  loading: boolean;
  error: any;
  connectWallet: () => Promise<boolean>;
  buyTokens: (ethAmount: string) => Promise<boolean>;
  setPrice: (newPrice: string) => Promise<boolean>;
  withdrawUnsold: () => Promise<boolean>;
  refresh: () => void;
  isConnected: boolean;
  isOwner: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useContracts();

  return (
    <WalletContext.Provider value={wallet}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}

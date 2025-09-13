"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { CONFIG } from "@/lib/config";
import tokenAbi from "@/lib/token-abi.json";
import idoAbi from "@/lib/ido-abi.json";

export interface ContractData {
  tokenBalance: string;
  idoBalance: string;
  tokensSold: string;
  price: string;
  treasury: string;
  isOwner: boolean;
}

export interface ContractError {
  message: string;
  code?: string;
}

export function useContracts() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.JsonRpcSigner | null>(null);
  const [account, setAccount] = useState<string | null>(null);
  const [contracts, setContracts] = useState<{
    token: ethers.Contract | null;
    ido: ethers.Contract | null;
  }>({
    token: null,
    ido: null,
  });
  const [data, setData] = useState<ContractData>({
    tokenBalance: "0",
    idoBalance: "0",
    tokensSold: "0",
    price: "0",
    treasury: CONFIG.CONTRACTS.TREASURY,
    isOwner: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<ContractError | null>(null);

  // Initialize provider and contracts
  useEffect(() => {
    const initContracts = async () => {
      if (typeof window !== "undefined" && window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          setProvider(provider);

          const tokenContract = new ethers.Contract(
            CONFIG.CONTRACTS.TOKEN,
            tokenAbi,
            provider
          );

          const idoContract = new ethers.Contract(
            CONFIG.CONTRACTS.IDO,
            idoAbi,
            provider
          );

          setContracts({ token: tokenContract, ido: idoContract });
        } catch (err) {
          console.error("Failed to initialize contracts:", err);
          setError({ message: "Failed to connect to blockchain" });
        }
      }
    };

    initContracts();
  }, []);

  // Connect wallet
  const connectWallet = async () => {
    if (!window.ethereum) {
      setError({ message: "MetaMask not installed" });
      return false;
    }

    try {
      setLoading(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (accounts.length > 0) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        
        setProvider(provider);
        setSigner(signer);
        setAccount(accounts[0]);

        // Update contracts with signer
        const tokenContract = new ethers.Contract(
          CONFIG.CONTRACTS.TOKEN,
          tokenAbi,
          signer
        );

        const idoContract = new ethers.Contract(
          CONFIG.CONTRACTS.IDO,
          idoAbi,
          signer
        );

        setContracts({ token: tokenContract, ido: idoContract });

        await loadContractData(accounts[0]);
        return true;
      }
    } catch (err: any) {
      console.error("Failed to connect wallet:", err);
      setError({ message: err.message || "Failed to connect wallet" });
      return false;
    } finally {
      setLoading(false);
    }
    return false;
  };

  // Load contract data
  const loadContractData = async (userAddress?: string) => {
    if (!contracts.token || !contracts.ido) return;

    try {
      setLoading(true);
      const address = userAddress || account;
      if (!address) return;

      const [
        tokenBalance,
        idoBalance,
        tokensSold,
        price,
        treasury,
        owner,
      ] = await Promise.all([
        contracts.token.balanceOf(address),
        contracts.ido.token ? contracts.token.balanceOf(CONFIG.CONTRACTS.IDO) : "0",
        contracts.ido.tokensSold(),
        contracts.ido.price(),
        contracts.ido.treasury(),
        contracts.ido.owner(),
      ]);

      setData({
        tokenBalance: ethers.formatEther(tokenBalance),
        idoBalance: ethers.formatEther(idoBalance),
        tokensSold: ethers.formatEther(tokensSold),
        price: ethers.formatEther(price),
        treasury,
        isOwner: address.toLowerCase() === owner.toLowerCase(),
      });
    } catch (err: any) {
      console.error("Failed to load contract data:", err);
      setError({ message: err.message || "Failed to load contract data" });
    } finally {
      setLoading(false);
    }
  };

  // Buy tokens
  const buyTokens = async (ethAmount: string) => {
    if (!contracts.ido || !signer) {
      setError({ message: "Wallet not connected" });
      return { success: false, txHash: null };
    }

    try {
      setLoading(true);
      const tx = await contracts.ido.buy({
        value: ethers.parseEther(ethAmount),
      });

      await tx.wait();
      await loadContractData();
      return { success: true, txHash: tx.hash };
    } catch (err: any) {
      console.error("Failed to buy tokens:", err);
      setError({ message: err.message || "Transaction failed" });
      return { success: false, txHash: null };
    } finally {
      setLoading(false);
    }
  };

  // Set price (owner only)
  const setPrice = async (newPrice: string) => {
    if (!contracts.ido || !signer) {
      setError({ message: "Wallet not connected" });
      return false;
    }

    try {
      setLoading(true);
      const tx = await contracts.ido.setPrice(ethers.parseEther(newPrice));
      await tx.wait();
      await loadContractData();
      return true;
    } catch (err: any) {
      console.error("Failed to set price:", err);
      setError({ message: err.message || "Failed to set price" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Withdraw unsold tokens (owner only)
  const withdrawUnsold = async () => {
    if (!contracts.ido || !signer) {
      setError({ message: "Wallet not connected" });
      return false;
    }

    try {
      setLoading(true);
      const tx = await contracts.ido.withdrawUnsold();
      await tx.wait();
      await loadContractData();
      return true;
    } catch (err: any) {
      console.error("Failed to withdraw unsold tokens:", err);
      setError({ message: err.message || "Failed to withdraw tokens" });
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Refresh data
  const refresh = () => {
    if (account) {
      loadContractData();
    }
  };

  return {
    // State
    account,
    data,
    loading,
    error,
    contracts,
    
    // Actions
    connectWallet,
    buyTokens,
    setPrice,
    withdrawUnsold,
    refresh,
    loadContractData,
    
    // Utils
    isConnected: !!account,
    isOwner: data.isOwner,
  };
}

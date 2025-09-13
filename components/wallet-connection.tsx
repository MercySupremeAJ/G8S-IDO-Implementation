"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Wallet, Copy, ExternalLink, CheckCircle, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useWallet } from "@/components/providers/wallet-provider"

export function WalletConnection() {
  const { account, data, loading, error, connectWallet, isConnected } = useWallet()
  const [showModal, setShowModal] = useState(false)

  const copyAddress = () => {
    if (account) {
      navigator.clipboard.writeText(account)
    }
  }

  const handleConnect = async () => {
    const success = await connectWallet()
    if (success) {
      setShowModal(false)
    }
  }

  if (isConnected && account) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="glassmorphism bg-transparent">
            <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
            {account.slice(0, 6)}...{account.slice(-4)}
          </Button>
        </DialogTrigger>
        <DialogContent className="glassmorphism-strong">
          <DialogHeader>
            <DialogTitle className="font-serif">Wallet Connected</DialogTitle>
            <DialogDescription>Your wallet is successfully connected to G8S University IDO</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div>
                <p className="font-medium text-foreground">Wallet Address</p>
                <p className="text-sm text-muted-foreground font-mono">{account}</p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={copyAddress}>
                  <Copy className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open(`https://sepolia.etherscan.io/address/${account}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-foreground">{data.tokenBalance} G8S</p>
                <p className="text-sm text-muted-foreground">Token Balance</p>
              </div>
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <p className="text-lg font-bold text-foreground">Sepolia</p>
                <p className="text-sm text-muted-foreground">Network</p>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error.message}</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90" disabled={loading}>
          {loading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Wallet className="w-4 h-4 mr-2" />
          )}
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="glassmorphism-strong">
        <DialogHeader>
          <DialogTitle className="font-serif">Connect Your Wallet</DialogTitle>
          <DialogDescription>Connect your wallet to participate in the G8S University IDO</DialogDescription>
        </DialogHeader>
        <div className="space-y-3">
          <Card className="cursor-pointer hover:bg-muted/50 transition-colors" onClick={handleConnect}>
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <span className="text-orange-600 font-bold">M</span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">MetaMask</p>
                <p className="text-sm text-muted-foreground">Connect using browser wallet</p>
              </div>
              <Badge variant="secondary">Recommended</Badge>
            </CardContent>
          </Card>

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-800">{error.message}</p>
            </div>
          )}

          <div className="text-center text-sm text-muted-foreground">
            Make sure you're connected to the Sepolia testnet
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

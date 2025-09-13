"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ArrowRight, Calculator, Zap, CheckCircle, Loader2, ExternalLink } from "lucide-react"
import { useWallet } from "@/components/providers/wallet-provider"
import { CONFIG } from "@/lib/config"

export function PurchaseModal() {
  const { account, data, loading, error, buyTokens, isConnected } = useWallet()
  const [ethAmount, setEthAmount] = useState("")
  const [step, setStep] = useState(1)
  const [isProcessing, setIsProcessing] = useState(false)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)

  const tokenPrice = 0.000001 // ETH per token (updated price)
  const tokensPerEth = 1000000 // tokens per ETH (1/0.000001)

  const calculateTokens = (eth: string) => {
    const ethValue = Number.parseFloat(eth) || 0
    return Math.floor(ethValue * tokensPerEth)
  }

  const calculateGasFee = () => {
    return 0.005 // Estimated gas fee in ETH
  }

  const handlePurchase = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first")
      return
    }

    setIsProcessing(true)
    try {
      const result = await buyTokens(ethAmount)
      if (result.success) {
        setTransactionHash(result.txHash)
        setStep(4) // Success step
      } else {
        setStep(3) // Error step
      }
    } catch (err) {
      console.error("Purchase failed:", err)
      setStep(3) // Error step
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setStep(1)
    setEthAmount("")
    setIsProcessing(false)
    setTransactionHash(null)
  }

  return (
    <Dialog onOpenChange={resetModal}>
      <DialogTrigger asChild>
        <Card className="glassmorphism-strong border-primary/30 cursor-pointer hover:border-primary/50 transition-all">
          <CardContent className="p-6 text-center">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-foreground mb-2">Purchase G8S</h3>
            <p className="text-sm text-muted-foreground mb-4">Join the IDO and secure your tokens</p>
            <Button 
              className="w-full bg-primary hover:bg-primary/90"
              disabled={!isConnected}
            >
              {!isConnected ? "Connect Wallet First" : "Buy Tokens"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="glassmorphism-strong max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif">Purchase G8ST Tokens</DialogTitle>
          <DialogDescription>
            {step === 1 && "Enter the amount of ETH you want to contribute"}
            {step === 2 && "Review your purchase details"}
            {step === 3 && "Confirm your transaction"}
            {step === 4 && "Purchase completed successfully!"}
          </DialogDescription>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {[1, 2, 3, 4].map((stepNum) => (
            <div
              key={stepNum}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                stepNum <= step ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              }`}
            >
              {stepNum < step ? <CheckCircle className="w-4 h-4" /> : stepNum}
            </div>
          ))}
        </div>

        {/* Step 1: Enter Amount */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <Label htmlFor="eth-amount">ETH Amount</Label>
              <Input
                id="eth-amount"
                type="number"
                placeholder="0.0"
                value={ethAmount}
                onChange={(e) => setEthAmount(e.target.value)}
                className="text-lg"
              />
            </div>

            {ethAmount && (
              <div className="p-4 bg-muted/30 rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">G8S Tokens</span>
                  <span className="font-medium text-foreground">{calculateTokens(ethAmount).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Token Price</span>
                  <span className="font-medium text-foreground">{tokenPrice} ETH</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Est. Gas Fee</span>
                  <span className="font-medium text-foreground">{calculateGasFee()} ETH</span>
                </div>
              </div>
            )}

            <Button
              onClick={() => setStep(2)}
              disabled={!ethAmount || Number.parseFloat(ethAmount) <= 0}
              className="w-full"
            >
              Continue
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Step 2: Review */}
        {step === 2 && (
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h4 className="font-medium text-foreground mb-3">Purchase Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETH Amount:</span>
                  <span className="font-medium text-foreground">{ethAmount} ETH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">G8S Tokens:</span>
                  <span className="font-medium text-foreground">{calculateTokens(ethAmount).toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Fee:</span>
                  <span className="font-medium text-foreground">{calculateGasFee()} ETH</span>
                </div>
                <hr className="border-border/20" />
                <div className="flex justify-between font-medium">
                  <span className="text-foreground">Total Cost:</span>
                  <span className="text-foreground">
                    {(Number.parseFloat(ethAmount) + calculateGasFee()).toFixed(3)} ETH
                  </span>
                </div>
              </div>
            </div>

            <div className="flex space-x-3">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                Back
              </Button>
              <Button onClick={() => setStep(3)} className="flex-1">
                Confirm
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Processing */}
        {step === 3 && (
          <div className="space-y-4 text-center">
            {!isProcessing ? (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Calculator className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Ready to Purchase</h4>
                  <p className="text-sm text-muted-foreground">Click confirm to proceed with your transaction</p>
                </div>
                <Button onClick={handlePurchase} className="w-full">
                  Confirm Purchase
                </Button>
              </>
            ) : (
              <>
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-2">Processing Transaction</h4>
                  <p className="text-sm text-muted-foreground">
                    Please wait while your transaction is being processed...
                  </p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Step 4: Success */}
        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h4 className="font-medium text-foreground mb-2">Purchase Successful!</h4>
              <p className="text-sm text-muted-foreground">Your G8S tokens have been allocated to your wallet</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm font-medium text-green-800">
                {calculateTokens(ethAmount).toLocaleString()} G8S tokens purchased
              </p>
            </div>
            {transactionHash && (
              <div className="pt-2">
                <a
                  href={`https://sepolia.etherscan.io/tx/${transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  View Transaction on Etherscan
                </a>
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

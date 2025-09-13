"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink, Filter, RefreshCw } from "lucide-react"

interface Transaction {
  id: string
  wallet: string
  amount: string
  tokens: string
  timestamp: string
  status: "confirmed" | "pending" | "failed"
  type: "contribution" | "bonus" | "refund"
}

interface LiveTransactionsFeedProps {
  detailed?: boolean
}

export function LiveTransactionsFeed({ detailed = false }: LiveTransactionsFeedProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "0x1a2b3c4d",
      wallet: "0x742d35Cc...C4e0",
      amount: "2.5 ETH",
      tokens: "16,667 G8ST",
      timestamp: "2 minutes ago",
      status: "confirmed",
      type: "contribution",
    },
    {
      id: "0x2b3c4d5e",
      wallet: "0x8f3e2a1b...D7f2",
      amount: "1.0 ETH",
      tokens: "6,667 G8ST",
      timestamp: "5 minutes ago",
      status: "confirmed",
      type: "contribution",
    },
    {
      id: "0x3c4d5e6f",
      wallet: "0x9a4b5c6d...E8g3",
      amount: "0.5 ETH",
      tokens: "3,333 G8ST",
      timestamp: "8 minutes ago",
      status: "pending",
      type: "contribution",
    },
    {
      id: "0x4d5e6f7g",
      wallet: "0xa5c6d7e8...F9h4",
      amount: "3.2 ETH",
      tokens: "21,333 G8ST",
      timestamp: "12 minutes ago",
      status: "confirmed",
      type: "contribution",
    },
    {
      id: "0x5e6f7g8h",
      wallet: "0xb6d7e8f9...G0i5",
      amount: "0.0 ETH",
      tokens: "+1,000 G8ST",
      timestamp: "15 minutes ago",
      status: "confirmed",
      type: "bonus",
    },
  ])

  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new transactions
      const newTransaction: Transaction = {
        id: `0x${Math.random().toString(16).substr(2, 8)}`,
        wallet: `0x${Math.random().toString(16).substr(2, 8)}...${Math.random().toString(16).substr(2, 4)}`,
        amount: `${(Math.random() * 3 + 0.1).toFixed(1)} ETH`,
        tokens: `${Math.floor(Math.random() * 20000 + 1000).toLocaleString()} G8ST`,
        timestamp: "Just now",
        status: Math.random() > 0.1 ? "confirmed" : "pending",
        type: Math.random() > 0.8 ? "bonus" : "contribution",
      }

      setTransactions((prev) => [newTransaction, ...prev.slice(0, detailed ? 19 : 4)])
    }, 10000)

    return () => clearInterval(interval)
  }, [detailed])

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => setIsRefreshing(false), 1000)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "failed":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contribution":
        return "text-primary"
      case "bonus":
        return "text-secondary"
      case "refund":
        return "text-destructive"
      default:
        return "text-muted-foreground"
    }
  }

  return (
    <Card className="glassmorphism border-border/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif flex items-center">
              Live Transactions
              <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live
              </Badge>
            </CardTitle>
            <CardDescription>Real-time transaction monitoring</CardDescription>
          </div>
          <div className="flex space-x-2">
            {detailed && (
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={handleRefresh} disabled={isRefreshing}>
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`} />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {transactions.slice(0, detailed ? 20 : 5).map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between p-3 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className={`w-4 h-4 ${getTypeColor(tx.type)}`} />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground text-sm">{tx.wallet}</p>
                    <Badge variant="outline" className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{tx.timestamp}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground text-sm">{tx.amount}</p>
                <p className="text-xs text-muted-foreground">{tx.tokens}</p>
                {detailed && (
                  <Button variant="ghost" size="sm" className="mt-1 h-6 w-6 p-0">
                    <ExternalLink className="w-3 h-3" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        {detailed && (
          <div className="mt-4 pt-4 border-t border-border/20">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Showing {transactions.length} recent transactions</span>
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

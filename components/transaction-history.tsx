import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, ExternalLink } from "lucide-react"

const transactions = [
  {
    id: "0x1a2b3c4d",
    type: "Contribution",
    amount: "1.5 ETH",
    tokens: "10,000 G8ST",
    status: "Confirmed",
    date: "Mar 5, 2024 14:32",
    hash: "0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f",
  },
  {
    id: "0x2b3c4d5e",
    type: "Contribution",
    amount: "1.0 ETH",
    tokens: "6,667 G8ST",
    status: "Confirmed",
    date: "Mar 1, 2024 09:15",
    hash: "0x2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g",
  },
  {
    id: "0x3c4d5e6f",
    type: "Bonus",
    amount: "0.0 ETH",
    tokens: "+333 G8ST",
    status: "Confirmed",
    date: "Mar 1, 2024 09:16",
    hash: "0x3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z7a8b9c0d1e2f3g4h",
  },
]

export function TransactionHistory() {
  return (
    <Card className="glassmorphism border-border/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-serif">Transaction History</CardTitle>
            <CardDescription>Your complete IDO participation history</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <ArrowUpRight className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-medium text-foreground">{tx.type}</p>
                    <Badge
                      variant={tx.status === "Confirmed" ? "default" : "secondary"}
                      className={tx.status === "Confirmed" ? "bg-green-100 text-green-800 border-green-200" : ""}
                    >
                      {tx.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{tx.date}</p>
                  <p className="text-xs text-muted-foreground font-mono">
                    {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-foreground">{tx.amount}</p>
                <p className="text-sm text-muted-foreground">{tx.tokens}</p>
                <Button variant="ghost" size="sm" className="mt-1">
                  <ExternalLink className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-muted/20 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Total Contribution</p>
              <p className="text-sm text-muted-foreground">Across all transactions</p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-foreground">2.5 ETH</p>
              <p className="text-sm text-muted-foreground">16,667 G8ST</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

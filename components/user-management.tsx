import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MoreHorizontal, Shield, AlertTriangle } from "lucide-react"

const topContributors = [
  {
    wallet: "0x742d35Cc6634C0532925a3b8D4C2C4e0C5C2C4e0",
    contribution: "25.7 ETH",
    tokens: "171,333 G8ST",
    rank: 1,
    status: "verified",
    joinDate: "Mar 1, 2024",
  },
  {
    wallet: "0x8f3e2a1b9c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r",
    contribution: "18.3 ETH",
    tokens: "122,000 G8ST",
    rank: 2,
    status: "verified",
    joinDate: "Mar 1, 2024",
  },
  {
    wallet: "0x9a4b5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t",
    contribution: "15.9 ETH",
    tokens: "106,000 G8ST",
    rank: 3,
    status: "pending",
    joinDate: "Mar 2, 2024",
  },
  {
    wallet: "0xa5c6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4",
    contribution: "12.4 ETH",
    tokens: "82,667 G8ST",
    rank: 4,
    status: "verified",
    joinDate: "Mar 2, 2024",
  },
  {
    wallet: "0xb6d7e8f9g0h1i2j3k4l5m6n7o8p9q0r1s2t3u4v5",
    contribution: "10.8 ETH",
    tokens: "72,000 G8ST",
    rank: 5,
    status: "flagged",
    joinDate: "Mar 3, 2024",
  },
]

export function UserManagement() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-green-100 text-green-800 border-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "flagged":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <Shield className="w-3 h-3" />
      case "flagged":
        return <AlertTriangle className="w-3 h-3" />
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <Card className="glassmorphism border-border/20">
        <CardHeader>
          <CardTitle className="font-serif">User Management</CardTitle>
          <CardDescription>Monitor and manage IDO participants</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search by wallet address..." className="pl-10" />
            </div>
            <Button variant="outline">Filter</Button>
            <Button variant="outline">Export</Button>
          </div>
        </CardContent>
      </Card>

      {/* Top Contributors */}
      <Card className="glassmorphism border-border/20">
        <CardHeader>
          <CardTitle className="font-serif">Top Contributors</CardTitle>
          <CardDescription>Highest contributing wallets in the IDO</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topContributors.map((contributor) => (
              <div
                key={contributor.wallet}
                className="flex items-center justify-between p-4 bg-muted/20 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <span className="font-bold text-primary">#{contributor.rank}</span>
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-foreground font-mono text-sm">
                        {contributor.wallet.slice(0, 10)}...{contributor.wallet.slice(-8)}
                      </p>
                      <Badge variant="outline" className={getStatusColor(contributor.status)}>
                        {getStatusIcon(contributor.status)}
                        <span className="ml-1">{contributor.status}</span>
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">Joined {contributor.joinDate}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="font-bold text-foreground">{contributor.contribution}</p>
                    <p className="text-sm text-muted-foreground">{contributor.tokens}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* User Statistics */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="glassmorphism border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Verified Users</p>
                <p className="text-2xl font-bold text-foreground">2,654</p>
              </div>
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold text-foreground">156</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Search className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glassmorphism border-border/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Flagged Users</p>
                <p className="text-2xl font-bold text-foreground">37</p>
              </div>
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

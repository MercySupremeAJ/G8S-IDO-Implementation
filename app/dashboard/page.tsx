import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Wallet, TrendingUp, Clock, Target, Settings } from "lucide-react"
import { WalletConnection } from "@/components/wallet-connection"
import { LiveMetrics } from "@/components/live-metrics"
import { TransactionHistory } from "@/components/transaction-history"
import { PurchaseModal } from "@/components/purchase-modal"
import { MobileNav } from "@/components/mobile-nav"

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/20 glassmorphism">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-foreground">G8S Dashboard</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
                <a href="/dashboard" className="text-foreground font-medium">
                  Dashboard
                </a>
                <a href="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
                  Admin
                </a>
              </nav>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <WalletConnection />
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
            <MobileNav currentPage="dashboard" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">IDO Dashboard</h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Monitor your participation in the G8S University token sale
          </p>
        </div>

        {/* Main Progress Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card className="glassmorphism-strong border-border/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="font-serif text-xl sm:text-2xl">IDO Progress</CardTitle>
                    <CardDescription className="text-sm">Real-time fundraising status</CardDescription>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">Live</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Radial Progress */}
                <div className="flex items-center justify-center">
                  <div className="relative w-32 h-32 sm:w-48 sm:h-48">
                    <svg className="w-32 h-32 sm:w-48 sm:h-48 transform -rotate-90" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" stroke="hsl(var(--muted))" strokeWidth="8" fill="none" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        stroke="hsl(var(--primary))"
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={`${67.3 * 2.51} 251.2`}
                        strokeLinecap="round"
                        className="transition-all duration-1000 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl sm:text-3xl font-bold text-foreground">67.3%</span>
                      <span className="text-xs sm:text-sm text-muted-foreground">Complete</span>
                    </div>
                  </div>
                </div>

                {/* Progress Details */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-foreground">2,019 ETH</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Raised</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xl sm:text-2xl font-bold text-foreground">981 ETH</p>
                    <p className="text-xs sm:text-sm text-muted-foreground">Remaining</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Soft Cap: 1,500 ETH</span>
                    <span className="text-green-600 font-medium">✓ Reached</span>
                  </div>
                  <div className="flex items-center justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Hard Cap: 3,000 ETH</span>
                    <span className="text-muted-foreground">Target</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <LiveMetrics />
            <PurchaseModal />
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 glassmorphism text-xs sm:text-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Contribution</p>
                      <p className="text-2xl font-bold text-foreground">2.5 ETH</p>
                    </div>
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Wallet className="w-5 h-5 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">G8S Allocated</p>
                      <p className="text-2xl font-bold text-foreground">16,667</p>
                    </div>
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Vesting Starts</p>
                      <p className="text-2xl font-bold text-foreground">Mar 20</p>
                    </div>
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-accent" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-border/20">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Your Rank</p>
                      <p className="text-2xl font-bold text-foreground">#127</p>
                    </div>
                    <div className="w-10 h-10 bg-chart-1/10 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-chart-1" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Allocation Breakdown */}
            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-serif">Your Token Allocation</CardTitle>
                <CardDescription>Breakdown of your G8S token allocation and vesting schedule</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Initial Allocation</p>
                      <p className="text-sm text-muted-foreground">Available at TGE (Token Generation Event)</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">3,333 G8S</p>
                      <p className="text-sm text-muted-foreground">20%</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">Vested Allocation</p>
                      <p className="text-sm text-muted-foreground">Linear vesting over 6 months</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-foreground">13,334 G8S</p>
                      <p className="text-sm text-muted-foreground">80%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="glassmorphism border-border/20">
                <CardHeader>
                  <CardTitle className="font-serif">Contribution Timeline</CardTitle>
                  <CardDescription>Your participation history in the IDO</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">First Contribution</p>
                        <p className="text-xs text-muted-foreground">March 1, 2024 - 1.0 ETH</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">Additional Contribution</p>
                        <p className="text-xs text-muted-foreground">March 5, 2024 - 1.5 ETH</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glassmorphism border-border/20">
                <CardHeader>
                  <CardTitle className="font-serif">Performance Metrics</CardTitle>
                  <CardDescription>Your position relative to other contributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Contribution Percentile</span>
                        <span className="font-medium text-foreground">Top 15%</span>
                      </div>
                      <Progress value={85} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Early Bird Bonus</span>
                        <span className="font-medium text-secondary">+5%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

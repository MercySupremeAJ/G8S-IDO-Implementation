import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Shield, Settings, BarChart3 } from "lucide-react"
import { AdminStats } from "@/components/admin-stats"
import { LiveTransactionsFeed } from "@/components/live-transactions-feed"
import { ContributionAnalytics } from "@/components/contribution-analytics"
import { UserManagement } from "@/components/user-management"
import { MobileNav } from "@/components/mobile-nav"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border/20 glassmorphism">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Shield className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-serif text-lg sm:text-xl font-bold text-foreground">Admin Monitor</span>
              </div>
              <nav className="hidden md:flex space-x-6">
                <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </a>
                <a href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Dashboard
                </a>
                <a href="/admin" className="text-foreground font-medium">
                  Admin
                </a>
              </nav>
            </div>
            <div className="hidden sm:flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                Live Monitoring
              </Badge>
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            </div>
            <MobileNav currentPage="admin" />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 space-y-4 sm:space-y-0">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">IDO Administration</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Monitor and manage the G8S University token sale
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <Download className="w-4 h-4 mr-2" />
              Export Data
            </Button>
            <Button variant="outline" size="sm" className="w-full sm:w-auto bg-transparent">
              <BarChart3 className="w-4 h-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Admin Stats Overview */}
        <AdminStats />

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 glassmorphism text-xs sm:text-sm">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <LiveTransactionsFeed />
              <ContributionAnalytics />
            </div>

            {/* Quick Actions */}
            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-serif">Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                    <Download className="w-6 h-6 text-primary" />
                    <span className="text-sm">Export Contributors</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                    <BarChart3 className="w-6 h-6 text-secondary" />
                    <span className="text-sm">Generate Report</span>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 flex flex-col items-center space-y-2 bg-transparent">
                    <Settings className="w-6 h-6 text-accent" />
                    <span className="text-sm">IDO Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transactions">
            <LiveTransactionsFeed detailed={true} />
          </TabsContent>

          <TabsContent value="analytics">
            <ContributionAnalytics detailed={true} />
          </TabsContent>

          <TabsContent value="users">
            <UserManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

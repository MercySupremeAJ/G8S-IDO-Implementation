import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, BookOpen } from "lucide-react"
import { TokenomicsChart } from "@/components/tokenomics-chart"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glassmorphism border-b">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg sm:text-xl text-foreground">G8S University</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Overview
              </Link>
              <Link href="/tokenomics" className="text-foreground font-medium">
                Tokenomics
              </Link>
              <Link href="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">
                Roadmap
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Participate IDO
              </Link>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </div>
            <MobileNav currentPage="tokenomics" />
          </div>
        </div>
      </nav>

      {/* Header Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="glassmorphism-strong rounded-2xl p-6 sm:p-8 md:p-16">
            <div className="flex items-center space-x-4 mb-8">
              <Link href="/">
                <Button variant="outline" size="sm" className="bg-transparent">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Overview
                </Button>
              </Link>
            </div>

            <div className="text-center mb-16">
              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl text-foreground mb-6 text-balance">
                G8ST Token
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                  {" "}
                  Economics
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Transparent and sustainable token distribution designed for long-term growth and educational innovation.
                Our tokenomics model ensures fair distribution while incentivizing academic excellence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Chart */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <TokenomicsChart />
        </div>
      </section>

      {/* Token Utility Section */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              Token Utility & Benefits
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              G8ST tokens power the entire educational ecosystem with multiple use cases
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-primary">Course Access</CardTitle>
                <CardDescription>Use G8ST tokens to enroll in premium courses and specialized programs</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-secondary">Governance Rights</CardTitle>
                <CardDescription>
                  Vote on curriculum updates, new course offerings, and platform improvements
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-accent">Staking Rewards</CardTitle>
                <CardDescription>Stake tokens to earn rewards and unlock exclusive educational content</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-primary">Achievement Rewards</CardTitle>
                <CardDescription>
                  Earn additional tokens by completing courses and achieving academic milestones
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-secondary">Marketplace Access</CardTitle>
                <CardDescription>Purchase educational materials, certificates, and exclusive content</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <CardTitle className="font-bold text-accent">Fee Discounts</CardTitle>
                <CardDescription>
                  Enjoy reduced fees for transactions and premium services on the platform
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="glassmorphism-strong rounded-2xl p-6 sm:p-8 md:p-16 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">Ready to Join the IDO?</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Secure your G8ST tokens now and be part of the educational revolution.
            </p>

            <Link href="/dashboard">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3">
                Participate in IDO
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, TrendingUp, Shield, BookOpen, Zap } from "lucide-react"
import { StatsGrid } from "@/components/stats-grid"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"

export default function LandingPage() {
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
              <Link href="/" className="text-foreground font-medium">
                Overview
              </Link>
              <Link href="/tokenomics" className="text-muted-foreground hover:text-foreground transition-colors">
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
            <MobileNav currentPage="home" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="glassmorphism-strong rounded-2xl p-6 sm:p-8 md:p-16 text-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-32 h-32 border border-accent rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-24 h-24 border border-secondary rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-primary rounded-full"></div>
            </div>

            <div className="relative z-10">
              <Badge className="mb-6 bg-secondary/20 text-secondary-foreground border-secondary/30">
                🚀 IDO Now Live
              </Badge>

              <h1 className="font-bold text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-foreground mb-6 text-balance">
                The Future of
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text">
                  {" "}
                  Education
                </span>
                <br />
                Meets Blockchain
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto text-pretty">
                G8S University pioneers frontier-tech education through tokenized learning. Join our IDO to be part of
                the next generation of decentralized education, where knowledge meets innovation and academic excellence
                drives blockchain adoption.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 w-full sm:w-auto"
                  >
                    Join IDO Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent w-full sm:w-auto">
                  View Whitepaper
                </Button>
              </div>

              {/* Live Progress Indicator */}
              <div className="glassmorphism rounded-xl p-4 sm:p-6 max-w-md mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">IDO Progress</span>
                  <span className="text-sm font-bold text-foreground">67.3%</span>
                </div>
                <Progress value={67.3} className="mb-3" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>2,019 ETH Raised</span>
                  <span>3,000 ETH Goal</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section id="overview" className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <StatsGrid />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">Why G8S University IDO?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Combining Ivy League academic rigor with cutting-edge blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="font-bold">Academic Excellence</CardTitle>
                <CardDescription>
                  World-class curriculum designed by leading academics and industry experts
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle className="font-bold">Tokenized Learning</CardTitle>
                <CardDescription>Earn G8ST tokens through course completion and academic achievements</CardDescription>
              </CardHeader>
            </Card>

            <Card className="glassmorphism border-border/20">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="font-bold">Future-Ready Skills</CardTitle>
                <CardDescription>
                  Blockchain, AI, and frontier technologies integrated into every program
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
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">
              Ready to Shape the Future?
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of forward-thinking individuals in revolutionizing education through blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 w-full sm:w-auto"
                >
                  Participate in IDO
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/tokenomics">
                <Button variant="outline" size="lg" className="px-8 py-3 bg-transparent w-full sm:w-auto">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 border-t border-border/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <BookOpen className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-xl text-foreground">G8S University</span>
            </div>
            <div className="flex flex-wrap justify-center space-x-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
            © 2024 G8S University. All rights reserved. Built with academic excellence and blockchain innovation.
          </div>
        </div>
      </footer>
    </div>
  )
}

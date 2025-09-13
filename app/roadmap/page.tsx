import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, CheckCircle, Clock, Target } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import Link from "next/link"

const roadmapPhases = [
  {
    phase: "Phase 1",
    title: "Foundation & IDO Launch",
    period: "Q1 2024",
    status: "completed",
    items: [
      "Platform architecture development",
      "Smart contract deployment",
      "IDO token sale launch",
      "Community building initiation",
      "Initial course content creation",
    ],
  },
  {
    phase: "Phase 2",
    title: "Platform Beta & Core Features",
    period: "Q2 2024",
    status: "in-progress",
    items: [
      "Beta platform launch",
      "First 10 courses go live",
      "Token staking mechanism",
      "Student achievement system",
      "Mobile app development",
    ],
  },
  {
    phase: "Phase 3",
    title: "Ecosystem Expansion",
    period: "Q3 2024",
    status: "upcoming",
    items: [
      "50+ courses across multiple disciplines",
      "Governance token implementation",
      "Partnership with traditional universities",
      "NFT certificate system",
      "Advanced analytics dashboard",
    ],
  },
  {
    phase: "Phase 4",
    title: "Global Scale & Innovation",
    period: "Q4 2024",
    status: "upcoming",
    items: [
      "International expansion",
      "AI-powered personalized learning",
      "Cross-chain compatibility",
      "Enterprise partnerships",
      "Research publication platform",
    ],
  },
]

export default function RoadmapPage() {
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
              <Link href="/tokenomics" className="text-muted-foreground hover:text-foreground transition-colors">
                Tokenomics
              </Link>
              <Link href="/roadmap" className="text-foreground font-medium">
                Roadmap
              </Link>
              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground transition-colors">
                Participate IDO
              </Link>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </div>
            <MobileNav currentPage="roadmap" />
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
                Development
                <span className="text-transparent bg-gradient-to-r from-primary to-accent bg-clip-text"> Roadmap</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-pretty">
                Our strategic roadmap outlines the journey from IDO launch to becoming the world's leading
                blockchain-powered educational platform. Each phase builds upon the previous to create a comprehensive
                learning ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Roadmap Timeline */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="space-y-8">
            {roadmapPhases.map((phase, index) => (
              <Card key={index} className="glassmorphism border-border/20">
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          phase.status === "completed"
                            ? "bg-green-100 text-green-600"
                            : phase.status === "in-progress"
                              ? "bg-secondary/10 text-secondary"
                              : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {phase.status === "completed" ? (
                          <CheckCircle className="w-6 h-6" />
                        ) : phase.status === "in-progress" ? (
                          <Clock className="w-6 h-6" />
                        ) : (
                          <Target className="w-6 h-6" />
                        )}
                      </div>
                      <div>
                        <CardTitle className="font-bold text-xl text-foreground">{phase.title}</CardTitle>
                        <CardDescription className="text-muted-foreground">
                          {phase.phase} • {phase.period}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={
                        phase.status === "completed"
                          ? "bg-green-100 text-green-800 border-green-200"
                          : phase.status === "in-progress"
                            ? "bg-secondary/20 text-secondary-foreground border-secondary/30"
                            : "bg-muted text-muted-foreground border-border"
                      }
                    >
                      {phase.status === "completed"
                        ? "Completed"
                        : phase.status === "in-progress"
                          ? "In Progress"
                          : "Upcoming"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-center space-x-3">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            phase.status === "completed"
                              ? "bg-green-500"
                              : phase.status === "in-progress"
                                ? "bg-secondary"
                                : "bg-muted-foreground"
                          }`}
                        ></div>
                        <span className="text-sm text-foreground">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="glassmorphism-strong rounded-2xl p-6 sm:p-8 md:p-16 text-center">
            <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl text-foreground mb-4">Be Part of the Journey</h2>
            <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our IDO today and help shape the future of blockchain-powered education.
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

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock, Zap } from "lucide-react"
import { useEffect, useState } from "react"

export function LiveMetrics() {
  const [metrics, setMetrics] = useState({
    contributors: 2847,
    avgContribution: 0.71,
    timeRemaining: "12d 8h 23m",
    recentActivity: 156,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        contributors: prev.contributors + Math.floor(Math.random() * 3),
        recentActivity: Math.floor(Math.random() * 200) + 100,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="glassmorphism border-border/20">
      <CardHeader>
        <CardTitle className="font-serif flex items-center">
          Live Metrics
          <Badge className="ml-2 bg-green-100 text-green-800 border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
            Live
          </Badge>
        </CardTitle>
        <CardDescription>Real-time IDO statistics</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-primary" />
            <span className="text-sm text-muted-foreground">Contributors</span>
          </div>
          <span className="font-bold text-foreground">{metrics.contributors.toLocaleString()}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="w-4 h-4 text-secondary" />
            <span className="text-sm text-muted-foreground">Avg. Contribution</span>
          </div>
          <span className="font-bold text-foreground">{metrics.avgContribution} ETH</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-accent" />
            <span className="text-sm text-muted-foreground">Time Left</span>
          </div>
          <span className="font-bold text-foreground">{metrics.timeRemaining}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="w-4 h-4 text-chart-1" />
            <span className="text-sm text-muted-foreground">Recent Activity</span>
          </div>
          <span className="font-bold text-foreground">+{metrics.recentActivity}</span>
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts"

interface ContributionAnalyticsProps {
  detailed?: boolean
}

const dailyData = [
  { date: "Mar 1", contributions: 45, amount: 32.1 },
  { date: "Mar 2", contributions: 67, amount: 48.3 },
  { date: "Mar 3", contributions: 89, amount: 63.7 },
  { date: "Mar 4", contributions: 123, amount: 87.9 },
  { date: "Mar 5", contributions: 156, amount: 112.4 },
  { date: "Mar 6", contributions: 134, amount: 95.8 },
  { date: "Mar 7", contributions: 178, amount: 127.6 },
]

const contributionRanges = [
  { range: "0.1-0.5 ETH", count: 1247, percentage: 43.8 },
  { range: "0.5-1.0 ETH", count: 856, percentage: 30.1 },
  { range: "1.0-2.0 ETH", count: 512, percentage: 18.0 },
  { range: "2.0-5.0 ETH", count: 187, percentage: 6.6 },
  { range: "5.0+ ETH", count: 45, percentage: 1.5 },
]

export function ContributionAnalytics({ detailed = false }: ContributionAnalyticsProps) {
  return (
    <div className="space-y-6">
      <Card className="glassmorphism border-border/20">
        <CardHeader>
          <CardTitle className="font-serif">Contribution Trends</CardTitle>
          <CardDescription>Daily contribution patterns and volume</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="contributions"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--primary))" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {detailed && (
        <>
          <Card className="glassmorphism border-border/20">
            <CardHeader>
              <CardTitle className="font-serif">Contribution Distribution</CardTitle>
              <CardDescription>Breakdown by contribution size ranges</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {contributionRanges.map((range, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-primary rounded-full" style={{ opacity: 1 - index * 0.15 }}></div>
                      <span className="text-sm font-medium text-foreground">{range.range}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground">{range.count} contributors</span>
                      <Badge variant="secondary">{range.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glassmorphism border-border/20">
            <CardHeader>
              <CardTitle className="font-serif">Volume Analysis</CardTitle>
              <CardDescription>ETH volume by day</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar dataKey="amount" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

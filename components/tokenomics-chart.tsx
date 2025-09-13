"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const tokenomicsData = [
  { name: "Public Sale (IDO)", value: 35, color: "hsl(var(--primary))" },
  { name: "Education Rewards", value: 25, color: "hsl(var(--secondary))" },
  { name: "Team & Advisors", value: 15, color: "hsl(var(--accent))" },
  { name: "Development Fund", value: 15, color: "hsl(var(--chart-4))" },
  { name: "Marketing & Partnerships", value: 10, color: "hsl(var(--chart-5))" },
]

export function TokenomicsChart() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
      <Card className="glassmorphism border-border/20">
        <CardHeader>
          <CardTitle className="font-serif">Token Distribution</CardTitle>
          <CardDescription>G8S token allocation across key stakeholders and use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={tokenomicsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={window.innerWidth < 640 ? 80 : 120}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {tokenomicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Allocation"]}
                  labelStyle={{ color: "hsl(var(--foreground))" }}
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {tokenomicsData.map((item, index) => (
          <Card key={index} className="glassmorphism border-border/20">
            <CardContent className="p-3 sm:p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="font-medium text-foreground text-sm sm:text-base">{item.name}</span>
                </div>
                <span className="font-bold text-foreground text-sm sm:text-base">{item.value}%</span>
              </div>
            </CardContent>
          </Card>
        ))}

        <Card className="glassmorphism-strong border-border/30 mt-6">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-serif text-base sm:text-lg font-semibold text-foreground mb-3">Key Metrics</h3>
            <div className="space-y-2 text-xs sm:text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Supply:</span>
                <span className="font-medium text-foreground">100,000,000 G8S</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">IDO Price:</span>
                <span className="font-medium text-foreground">$0.15 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Hard Cap:</span>
                <span className="font-medium text-foreground">$5,250,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vesting:</span>
                <span className="font-medium text-foreground">6 months linear</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

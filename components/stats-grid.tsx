import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, Clock, Target } from "lucide-react"

export function StatsGrid() {
  const stats = [
    {
      icon: Target,
      label: "Total Supply",
      value: "1M G8S",
      change: "Fixed Supply",
      changeType: "neutral" as const,
    },
    {
      icon: TrendingUp,
      label: "Token Price",
      value: "0.000001 ETH",
      change: "Current Price",
      changeType: "neutral" as const,
    },
    {
      icon: Users,
      label: "Tokens Sold",
      value: "45,230",
      change: "G8S Sold",
      changeType: "positive" as const,
    },
    {
      icon: Clock,
      label: "Available",
      value: "954,770",
      change: "G8S Remaining",
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="glassmorphism border-border/20 hover:border-border/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
              <Badge
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className={
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : "bg-muted text-muted-foreground"
                }
              >
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

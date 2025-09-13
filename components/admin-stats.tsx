import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Users, DollarSign, Activity, Target, Clock } from "lucide-react"

export function AdminStats() {
  const stats = [
    {
      icon: DollarSign,
      label: "Total Raised",
      value: "2,019.45 ETH",
      subValue: "$6,058,350",
      change: "+2.3%",
      changeType: "positive" as const,
    },
    {
      icon: Users,
      label: "Total Contributors",
      value: "2,847",
      subValue: "Unique wallets",
      change: "+156 today",
      changeType: "positive" as const,
    },
    {
      icon: Target,
      label: "Progress",
      value: "67.3%",
      subValue: "of hard cap",
      change: "On track",
      changeType: "neutral" as const,
    },
    {
      icon: Activity,
      label: "Avg Contribution",
      value: "0.71 ETH",
      subValue: "$2,130",
      change: "+5.2%",
      changeType: "positive" as const,
    },
    {
      icon: TrendingUp,
      label: "24h Volume",
      value: "127.8 ETH",
      subValue: "183 transactions",
      change: "+12.8%",
      changeType: "positive" as const,
    },
    {
      icon: Clock,
      label: "Time Remaining",
      value: "12d 8h 23m",
      subValue: "Until end",
      change: "Active",
      changeType: "neutral" as const,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index} className="glassmorphism border-border/20 hover:border-border/40 transition-all duration-300">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                <stat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <Badge
                variant={stat.changeType === "positive" ? "default" : "secondary"}
                className={
                  stat.changeType === "positive"
                    ? "bg-green-100 text-green-800 border-green-200 text-xs"
                    : "bg-muted text-muted-foreground text-xs"
                }
              >
                {stat.change}
              </Badge>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-foreground mb-1">{stat.value}</p>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-xs text-muted-foreground">{stat.subValue}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

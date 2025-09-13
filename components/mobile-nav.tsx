"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, BookOpen, Target, Shield, Home, BarChart3, Users, Settings, TrendingUp, MapPin } from "lucide-react"
import Link from "next/link"

interface MobileNavProps {
  currentPage?: "home" | "dashboard" | "admin" | "tokenomics" | "roadmap"
}

export function MobileNav({ currentPage = "home" }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home, active: currentPage === "home" },
    { href: "/tokenomics", label: "Tokenomics", icon: TrendingUp, active: currentPage === "tokenomics" },
    { href: "/roadmap", label: "Roadmap", icon: MapPin, active: currentPage === "roadmap" },
    { href: "/dashboard", label: "Participate IDO", icon: Target, active: currentPage === "dashboard" },
    { href: "/admin", label: "Admin", icon: Shield, active: currentPage === "admin" },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="sm" className="md:hidden">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="glassmorphism-strong w-80">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-foreground">G8S University</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Quick Actions */}
          <div className="space-y-3 pt-6 border-t border-border/20">
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <Users className="w-4 h-4 mr-2" />
              Community
            </Button>
            <Button variant="outline" className="w-full justify-start bg-transparent" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

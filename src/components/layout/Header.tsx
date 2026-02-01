"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, ChevronDown, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo, ModelMixLogo } from "./Logo"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface HeaderProps {
  variant?: "main" | "modelmix"
}

const mainNavItems = [
  { label: "Home", href: "/" },
  { label: "ModelMix", href: "/modelmix" },
  { label: "Blog", href: "/blog" },
  { label: "Resources", href: "/resources" },
  { label: "About", href: "/about" },
]

export function Header({ variant = "main" }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Development Banner */}
      <div className="bg-cyan-50 border-b border-cyan-200 px-4 py-2 text-sm text-cyan-700 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-cyan-500">⚡</span>
          <span className="font-medium">Active Development</span>
          <span className="hidden sm:inline">— Features change frequently. Refresh for latest updates.</span>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <button className="hover:text-cyan-900 flex items-center gap-1">
            🔄 Refresh
          </button>
          <span className="hidden sm:inline">📦 GitHub coming soon</span>
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
            {variant === "modelmix" ? <ModelMixLogo /> : <Logo />}
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {mainNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2">
              <Search className="h-4 w-4" />
              Models
            </Button>

            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
              <span className="text-muted-foreground">💰</span>
              <span className="font-medium">Balance 50000</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline text-sm">charles</span>
                  <span className="hidden sm:inline text-xs bg-cyan-100 text-cyan-700 px-2 py-0.5 rounded">
                    Tester
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>API Keys</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Sign out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" className="gap-2">
              <span>📄</span>
              New
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="lg:hidden py-4 border-t">
            <div className="flex flex-col gap-2">
              {mainNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

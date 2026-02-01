"use client"

import Link from "next/link"
import Image from "next/image"

interface LogoProps {
  variant?: "default" | "icon"
  className?: string
}

export function Logo({ variant = "default", className }: LogoProps) {
  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      {variant === "icon" ? (
        <div className="relative w-10 h-10">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Network nodes logo */}
            <circle cx="50" cy="20" r="12" className="fill-[#3B82F6]" />
            <circle cx="20" cy="50" r="12" className="fill-[#F97316]" />
            <circle cx="80" cy="50" r="12" className="fill-[#22C55E]" />
            <circle cx="50" cy="80" r="12" className="fill-[#8B5CF6]" />
            <circle cx="65" cy="65" r="12" className="fill-[#22C55E]" />
            {/* Connecting lines */}
            <line x1="50" y1="20" x2="20" y2="50" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="50" y1="20" x2="80" y2="50" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="20" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="80" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="50" y1="20" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="80" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="50" y1="80" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
            <line x1="20" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
          </svg>
        </div>
      ) : (
        <>
          <div className="relative w-10 h-10 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              {/* Network nodes logo */}
              <circle cx="50" cy="20" r="12" className="fill-[#3B82F6]" />
              <circle cx="20" cy="50" r="12" className="fill-[#F97316]" />
              <circle cx="80" cy="50" r="12" className="fill-[#22C55E]" />
              <circle cx="50" cy="80" r="12" className="fill-[#8B5CF6]" />
              <circle cx="65" cy="65" r="12" className="fill-[#22C55E]" />
              {/* Connecting lines */}
              <line x1="50" y1="20" x2="20" y2="50" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="50" y1="20" x2="80" y2="50" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="20" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="80" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="50" y1="20" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="80" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="50" y1="80" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
              <line x1="20" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="2" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-foreground leading-none">
              related<span className="text-primary">models</span>
            </span>
            <span className="text-xs text-muted-foreground">.com</span>
          </div>
        </>
      )}
    </Link>
  )
}

export function ModelMixLogo({ className }: { className?: string }) {
  return (
    <Link href="/modelmix" className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
        M²
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-foreground leading-none">
          ModelMix
        </span>
        <span className="text-xs text-muted-foreground">Compare AI minds</span>
      </div>
    </Link>
  )
}

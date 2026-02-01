"use client"

import Link from "next/link"
import { Logo } from "./Logo"
import { Separator } from "@/components/ui/separator"
import { Twitter, Github, Linkedin, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  product: [
    { label: "ModelMix", href: "/modelmix" },
    { label: "API Access", href: "/api" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
  ],
  resources: [
    { label: "Blog", href: "/blog" },
    { label: "Documentation", href: "/docs" },
    { label: "Tutorials", href: "/tutorials" },
    { label: "Model Directory", href: "/models" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Press", href: "/press" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
}

const socialLinks = [
  { icon: Twitter, href: "https://twitter.com/relatedmodels", label: "Twitter" },
  { icon: Github, href: "https://github.com/relatedmodels", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com/company/relatedmodels", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8 flex-shrink-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <circle cx="50" cy="20" r="12" fill="#3B82F6" />
                  <circle cx="20" cy="50" r="12" fill="#F97316" />
                  <circle cx="80" cy="50" r="12" fill="#22C55E" />
                  <circle cx="50" cy="80" r="12" fill="#8B5CF6" />
                  <circle cx="65" cy="65" r="12" fill="#22C55E" />
                  <line x1="50" y1="20" x2="20" y2="50" stroke="#6B7280" strokeWidth="2" />
                  <line x1="50" y1="20" x2="80" y2="50" stroke="#6B7280" strokeWidth="2" />
                  <line x1="20" y1="50" x2="50" y2="80" stroke="#6B7280" strokeWidth="2" />
                  <line x1="80" y1="50" x2="50" y2="80" stroke="#6B7280" strokeWidth="2" />
                  <line x1="50" y1="20" x2="65" y2="65" stroke="#6B7280" strokeWidth="2" />
                  <line x1="80" y1="50" x2="65" y2="65" stroke="#6B7280" strokeWidth="2" />
                  <line x1="50" y1="80" x2="65" y2="65" stroke="#6B7280" strokeWidth="2" />
                  <line x1="20" y1="50" x2="65" y2="65" stroke="#6B7280" strokeWidth="2" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">
                related<span className="text-primary">models</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 mb-4">
              Compare AI models side-by-side. Your hub for LLM insights, comparisons, and AI resources.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="font-semibold text-white mb-4">Connect with Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-slate-500" />
                <a href="mailto:hello@relatedmodels.com" className="hover:text-white transition-colors">
                  hello@relatedmodels.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-slate-500" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-500">
            © {new Date().getFullYear()} Related Models. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

"use client"

import Link from "next/link"
import { ArrowRight, Users, Target, Zap, Globe, Github, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const teamMembers = [
  {
    name: "Sarah Chen",
    role: "Founder & CEO",
    bio: "Former ML engineer at Google. Passionate about making AI accessible to everyone.",
    image: null,
  },
  {
    name: "Alex Rivera",
    role: "CTO",
    bio: "10+ years in distributed systems. Previously at AWS and Stripe.",
    image: null,
  },
  {
    name: "Maya Johnson",
    role: "Head of Product",
    bio: "Product leader focused on developer experience. Ex-Notion, Ex-Figma.",
    image: null,
  },
  {
    name: "James Park",
    role: "Lead Engineer",
    bio: "Full-stack engineer with a focus on AI/ML infrastructure.",
    image: null,
  },
]

const values = [
  {
    icon: Target,
    title: "Accuracy First",
    description: "We believe in providing accurate, unbiased comparisons to help you make informed decisions.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Our platform is shaped by feedback from developers, researchers, and AI enthusiasts.",
  },
  {
    icon: Zap,
    title: "Always Innovating",
    description: "We're constantly updating our tools to support the latest AI models and features.",
  },
  {
    icon: Globe,
    title: "Open & Transparent",
    description: "We share our methodologies and welcome scrutiny of our comparison processes.",
  },
]

const milestones = [
  { year: "2024", event: "Founded Related Models with a mission to simplify AI model comparison" },
  { year: "2024", event: "Launched ModelMix beta with support for 20+ models" },
  { year: "2025", event: "Reached 10,000 active users and expanded to 50+ models" },
  { year: "2025", event: "Launched blog and resource center" },
  { year: "2026", event: "100+ models supported, serving developers worldwide" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Making AI Accessible & Understandable
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're building the tools that help developers, researchers, and businesses
              navigate the rapidly evolving world of AI models.
            </p>
            <div className="flex gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/modelmix">
                  Try ModelMix
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Join Our Team
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-4">
                The AI landscape is evolving at an unprecedented pace. New models are released
                weekly, each with unique strengths and capabilities. We believe that choosing
                the right AI model shouldn't require hours of research and experimentation.
              </p>
              <p className="text-lg text-muted-foreground mb-4">
                That's why we built Related Models and ModelMix — to give everyone the tools
                they need to compare, understand, and choose the best AI models for their
                specific use cases.
              </p>
              <p className="text-lg text-muted-foreground">
                Whether you're a developer building the next breakthrough application, a
                researcher exploring AI capabilities, or a business leader making strategic
                decisions, we're here to help you navigate the AI ecosystem with confidence.
              </p>
            </div>
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle cx="50" cy="20" r="15" className="fill-[#3B82F6]" />
                    <circle cx="20" cy="50" r="15" className="fill-[#F97316]" />
                    <circle cx="80" cy="50" r="15" className="fill-[#22C55E]" />
                    <circle cx="50" cy="80" r="15" className="fill-[#8B5CF6]" />
                    <circle cx="65" cy="65" r="15" className="fill-[#22C55E]" />
                    <line x1="50" y1="20" x2="20" y2="50" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="20" x2="80" y2="50" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="20" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="80" y1="50" x2="50" y2="80" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="20" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="80" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="50" y1="80" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="3" />
                    <line x1="20" y1="50" x2="65" y2="65" stroke="#9CA3AF" strokeWidth="3" />
                  </svg>
                </div>
                <p className="text-2xl font-bold">Related Models</p>
                <p className="text-muted-foreground">Connecting AI minds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <Card key={value.title} className="text-center">
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <value.icon className="h-7 w-7 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{value.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A passionate group of engineers, researchers, and product builders
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <Card key={member.name} className="text-center">
                <CardHeader>
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 mx-auto mb-4" />
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <p className="text-sm text-primary font-medium">{member.role}</p>
                </CardHeader>
                <CardContent>
                  <CardDescription>{member.bio}</CardDescription>
                  <div className="flex justify-center gap-2 mt-4">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Github className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
          </div>
          <div className="max-w-2xl mx-auto">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex gap-4 mb-8 last:mb-0">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {milestone.year.slice(-2)}
                  </div>
                  {index < milestones.length - 1 && (
                    <div className="w-0.5 flex-1 bg-border mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <p className="text-sm font-medium text-primary mb-1">{milestone.year}</p>
                  <p className="text-muted-foreground">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join Us on This Journey
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            We're always looking for talented individuals who share our passion for AI and developer tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" variant="secondary">
              View Open Positions
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

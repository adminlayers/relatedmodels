"use client"

import Link from "next/link"
import { ArrowRight, Zap, Brain, Code, BookOpen, Sparkles, TrendingUp, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    icon: Brain,
    title: "Compare AI Models",
    description: "Send one prompt to multiple AI models and see the differences side by side. Understand each model's strengths.",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Code,
    title: "Developer Resources",
    description: "Access tutorials, API guides, and code examples for integrating AI into your applications.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: BookOpen,
    title: "AI Blog & Insights",
    description: "Stay updated with the latest AI news, model releases, and in-depth technical analysis.",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Zap,
    title: "Real-time Testing",
    description: "Test prompts in real-time with instant responses. No signup required to start exploring.",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
  },
]

const popularModels = [
  { name: "Claude Sonnet 4.5", provider: "Anthropic", tags: ["creative", "reasoning", "vision"] },
  { name: "GPT-4o", provider: "OpenAI", tags: ["vision", "creative", "coding"] },
  { name: "Gemini 2.5 Flash", provider: "Google", tags: ["fast", "vision", "coding"] },
  { name: "Grok 4.1 Fast", provider: "xAI", tags: ["agentic", "fast", "chat"] },
]

const blogPosts = [
  {
    title: "Understanding Claude's Extended Thinking",
    excerpt: "Deep dive into how Claude uses chain-of-thought reasoning for complex problems.",
    date: "Jan 28, 2026",
    category: "Analysis",
    readTime: "8 min read",
  },
  {
    title: "Comparing Vision Capabilities: GPT-4o vs Gemini",
    excerpt: "A comprehensive comparison of multimodal capabilities across leading AI models.",
    date: "Jan 25, 2026",
    category: "Comparison",
    readTime: "12 min read",
  },
  {
    title: "Best Practices for Prompt Engineering",
    excerpt: "Learn how to write effective prompts that get the results you want from any AI model.",
    date: "Jan 22, 2026",
    category: "Tutorial",
    readTime: "6 min read",
  },
]

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="gradient-hero py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="h-4 w-4 mr-2" />
              Now featuring 100+ AI models
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
              Ask once, compare{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">
                many minds
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Send one prompt to multiple AI models and see the differences side by side.
              Your hub for LLM insights, comparisons, and AI resources.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="xl" variant="gradient" asChild>
                <Link href="/modelmix">
                  Try ModelMix
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link href="/blog">
                  Read the Blog
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick prompt preview */}
          <div className="mt-16 max-w-3xl mx-auto">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-1">
                    <div className="bg-muted rounded-lg p-4 text-muted-foreground">
                      What would you like to explore?
                    </div>
                  </div>
                  <Button variant="gradient" size="lg">
                    <Play className="h-4 w-4 mr-2" />
                    Run Models
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    🍓 Count the R&apos;s in &apos;strawberry&apos;
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    ✍️ Write 3 haikus about silence
                  </Badge>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
                    💻 Write a function to reverse a linked list
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Everything you need for AI exploration</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From model comparison to learning resources, we&apos;ve got you covered.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg ${feature.bgColor} flex items-center justify-center mb-4`}>
                    <feature.icon className={`h-6 w-6 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Models Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Popular Models</h2>
              <p className="text-muted-foreground">
                The most compared AI models this week
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/models">
                View all models
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {popularModels.map((model) => (
              <Card key={model.name} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-base">{model.name}</CardTitle>
                      <CardDescription className="text-xs">{model.provider}</CardDescription>
                    </div>
                    <TrendingUp className="h-4 w-4 text-green-500" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1">
                    {model.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant={tag as "creative" | "reasoning" | "vision" | "coding" | "fast" | "chat" | "agentic"}
                        className="text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Latest from the Blog</h2>
              <p className="text-muted-foreground">
                Insights, tutorials, and AI news
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/blog">
                Read all posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.title} className="hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg" />
                <CardHeader>
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{post.excerpt}</CardDescription>
                  <p className="text-xs text-muted-foreground mt-4">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to explore the AI landscape?
          </h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Start comparing models today. No signup required for basic comparisons.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/modelmix">
                Launch ModelMix
              </Link>
            </Button>
            <Button size="xl" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/resources">
                Explore Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">AI Models</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Comparisons Made</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">10K+</div>
              <div className="text-muted-foreground">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-muted-foreground">Blog Articles</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

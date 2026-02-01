"use client"

import Link from "next/link"
import { Search, Filter, Clock, User, ArrowRight, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const categories = [
  "All",
  "News",
  "Tutorials",
  "Comparisons",
  "Analysis",
  "Guides",
  "Industry",
]

const featuredPost = {
  title: "The State of AI in 2026: A Comprehensive Review",
  excerpt: "From GPT-5 to Claude Opus 4.5, we analyze the major developments in AI over the past year and what they mean for developers and businesses.",
  date: "Jan 30, 2026",
  author: "Sarah Chen",
  readTime: "15 min read",
  category: "Analysis",
  image: "/images/template-reference.png",
}

const blogPosts = [
  {
    id: 1,
    title: "Understanding Claude's Extended Thinking Mode",
    excerpt: "Deep dive into how Claude uses chain-of-thought reasoning for complex problems and when to enable it.",
    date: "Jan 28, 2026",
    author: "Alex Rivera",
    readTime: "8 min read",
    category: "Tutorials",
    trending: true,
  },
  {
    id: 2,
    title: "GPT-4o vs Gemini 2.5: Vision Capabilities Compared",
    excerpt: "A comprehensive comparison of multimodal capabilities across leading AI models with real-world examples.",
    date: "Jan 25, 2026",
    author: "Maya Johnson",
    readTime: "12 min read",
    category: "Comparisons",
    trending: true,
  },
  {
    id: 3,
    title: "Best Practices for Prompt Engineering in 2026",
    excerpt: "Learn how to write effective prompts that get the results you want from any AI model.",
    date: "Jan 22, 2026",
    author: "James Park",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    id: 4,
    title: "DeepSeek V3: The Cost-Effective Alternative",
    excerpt: "How DeepSeek is changing the game with competitive performance at a fraction of the cost.",
    date: "Jan 20, 2026",
    author: "Lisa Wang",
    readTime: "10 min read",
    category: "Analysis",
  },
  {
    id: 5,
    title: "Building AI Agents with Claude and LangChain",
    excerpt: "A step-by-step tutorial on creating autonomous AI agents that can browse the web and execute tasks.",
    date: "Jan 18, 2026",
    author: "Michael Chen",
    readTime: "20 min read",
    category: "Tutorials",
  },
  {
    id: 6,
    title: "The Ethics of AI Model Benchmarking",
    excerpt: "Why current benchmarks may be misleading and what the industry should do about it.",
    date: "Jan 15, 2026",
    author: "Dr. Emily Foster",
    readTime: "8 min read",
    category: "Industry",
  },
  {
    id: 7,
    title: "Mistral's New Open Source Models: A First Look",
    excerpt: "European AI leader releases new models that rival closed-source alternatives.",
    date: "Jan 12, 2026",
    author: "Thomas Anderson",
    readTime: "7 min read",
    category: "News",
  },
  {
    id: 8,
    title: "Fine-tuning LLMs for Specific Domains",
    excerpt: "A practical guide to customizing large language models for healthcare, legal, and finance use cases.",
    date: "Jan 10, 2026",
    author: "Dr. Rachel Kim",
    readTime: "14 min read",
    category: "Guides",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">AI Insights & Resources</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Stay updated with the latest in AI development, model comparisons, tutorials, and industry analysis.
            </p>
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles..."
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="All" className="w-full">
            <TabsList className="w-full justify-start h-auto p-0 bg-transparent border-0 gap-2 overflow-x-auto">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="px-4 py-3 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 aspect-video md:aspect-auto bg-gradient-to-br from-primary/30 to-accent/30" />
              <div className="md:w-1/2 p-8">
                <Badge variant="outline" className="mb-4">{featuredPost.category}</Badge>
                <h2 className="text-2xl font-bold mb-4 hover:text-primary transition-colors cursor-pointer">
                  {featuredPost.title}
                </h2>
                <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {featuredPost.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    {featuredPost.readTime}
                  </span>
                  <span>{featuredPost.date}</span>
                </div>
                <Button className="gap-2">
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Latest Articles</h2>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            </div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg relative">
                  {post.trending && (
                    <Badge className="absolute top-2 right-2 bg-orange-500">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                </div>
                <CardHeader className="pb-2">
                  <div className="flex gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="line-clamp-2 mb-4">{post.excerpt}</CardDescription>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Stay in the Loop</h2>
          <p className="text-white/80 mb-8 max-w-2xl mx-auto">
            Get weekly updates on the latest AI developments, tutorials, and exclusive content delivered to your inbox.
          </p>
          <div className="flex gap-4 justify-center max-w-md mx-auto">
            <Input
              placeholder="Enter your email"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

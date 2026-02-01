"use client"

import Link from "next/link"
import {
  BookOpen,
  Code,
  FileText,
  Video,
  Download,
  ExternalLink,
  Search,
  Filter,
  Star,
  Clock,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const resourceCategories = [
  { icon: BookOpen, label: "Documentation", count: 45 },
  { icon: Video, label: "Video Tutorials", count: 28 },
  { icon: Code, label: "Code Examples", count: 120 },
  { icon: FileText, label: "Whitepapers", count: 15 },
  { icon: Download, label: "Downloads", count: 32 },
]

const featuredResources = [
  {
    title: "Getting Started with ModelMix",
    description: "Learn how to compare AI models effectively with our comprehensive guide.",
    type: "Guide",
    icon: BookOpen,
    difficulty: "Beginner",
    duration: "15 min",
    rating: 4.9,
  },
  {
    title: "API Integration Tutorial",
    description: "Step-by-step tutorial on integrating ModelMix API into your applications.",
    type: "Tutorial",
    icon: Code,
    difficulty: "Intermediate",
    duration: "30 min",
    rating: 4.8,
  },
  {
    title: "Prompt Engineering Masterclass",
    description: "Advanced techniques for crafting effective prompts across different AI models.",
    type: "Video",
    icon: Video,
    difficulty: "Advanced",
    duration: "2 hours",
    rating: 4.9,
  },
]

const tutorials = [
  {
    title: "Building a Chatbot with Claude",
    description: "Create a fully functional chatbot using Claude API",
    duration: "45 min",
    difficulty: "Intermediate",
    views: "12.5K",
  },
  {
    title: "Image Analysis with GPT-4o",
    description: "Learn to analyze images using OpenAI's multimodal model",
    duration: "30 min",
    difficulty: "Beginner",
    views: "8.2K",
  },
  {
    title: "RAG Pipeline with Gemini",
    description: "Build a retrieval-augmented generation system",
    duration: "1 hour",
    difficulty: "Advanced",
    views: "6.8K",
  },
  {
    title: "Fine-tuning Open Source Models",
    description: "Customize Llama and Mistral for your use case",
    duration: "2 hours",
    difficulty: "Advanced",
    views: "5.1K",
  },
]

const documentation = [
  {
    title: "ModelMix API Reference",
    description: "Complete API documentation with examples",
    lastUpdated: "2 days ago",
  },
  {
    title: "Model Comparison Guide",
    description: "How to effectively compare AI model outputs",
    lastUpdated: "1 week ago",
  },
  {
    title: "Authentication & Security",
    description: "Secure your API keys and implement best practices",
    lastUpdated: "3 days ago",
  },
  {
    title: "Rate Limits & Quotas",
    description: "Understanding usage limits and optimization",
    lastUpdated: "5 days ago",
  },
]

const codeExamples = [
  { title: "Python SDK Quickstart", language: "Python", stars: 234 },
  { title: "TypeScript Integration", language: "TypeScript", stars: 189 },
  { title: "React Components", language: "React", stars: 156 },
  { title: "Node.js Server Example", language: "Node.js", stars: 142 },
]

export default function ResourcesPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Developer Resources</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Everything you need to build with AI. Documentation, tutorials, code examples, and more.
            </p>
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search resources..." className="pl-10" />
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
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 overflow-x-auto pb-2">
            {resourceCategories.map((category) => (
              <Card
                key={category.label}
                className="shrink-0 cursor-pointer hover:border-primary/50 transition-colors"
              >
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <category.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{category.label}</div>
                    <div className="text-sm text-muted-foreground">{category.count} items</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Resources</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredResources.map((resource) => (
              <Card key={resource.title} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <resource.icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{resource.type}</Badge>
                  </div>
                  <CardTitle className="text-lg">{resource.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="mb-4">{resource.description}</CardDescription>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          resource.difficulty === "Beginner"
                            ? "secondary"
                            : resource.difficulty === "Intermediate"
                            ? "outline"
                            : "default"
                        }
                        className="text-xs"
                      >
                        {resource.difficulty}
                      </Badge>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {resource.duration}
                      </span>
                    </div>
                    <span className="text-muted-foreground flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      {resource.rating}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="tutorials" className="w-full">
            <TabsList className="mb-8">
              <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
              <TabsTrigger value="documentation">Documentation</TabsTrigger>
              <TabsTrigger value="code">Code Examples</TabsTrigger>
            </TabsList>

            <TabsContent value="tutorials">
              <div className="grid md:grid-cols-2 gap-4">
                {tutorials.map((tutorial) => (
                  <Card key={tutorial.title} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0">
                        <Video className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold mb-1 truncate">{tutorial.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                          {tutorial.description}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {tutorial.duration}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {tutorial.difficulty}
                          </Badge>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {tutorial.views}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="documentation">
              <div className="grid md:grid-cols-2 gap-4">
                {documentation.map((doc) => (
                  <Card key={doc.title} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <FileText className="h-6 w-6 text-blue-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mb-1">{doc.description}</p>
                        <span className="text-xs text-muted-foreground">Updated {doc.lastUpdated}</span>
                      </div>
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="code">
              <div className="grid md:grid-cols-2 gap-4">
                {codeExamples.map((example) => (
                  <Card key={example.title} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center shrink-0">
                        <Code className="h-6 w-6 text-green-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{example.title}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {example.language}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Star className="h-4 w-4" />
                        {example.stars}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Getting Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team is here to help. Check out our community forums or reach out directly.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg">Join Community</Button>
            <Button size="lg" variant="outline">
              Contact Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

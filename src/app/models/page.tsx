"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, ArrowUpDown, ExternalLink, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const models = [
  {
    id: "claude-opus-4.5",
    name: "Claude Opus 4.5",
    provider: "Anthropic",
    description: "Most capable Claude model for complex tasks",
    capabilities: ["reasoning", "creative", "coding", "vision"],
    contextWindow: "200K",
    pricing: "$15/$75",
    released: "Jan 2026",
  },
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "Anthropic",
    description: "Balanced performance and speed",
    capabilities: ["creative", "reasoning", "vision"],
    contextWindow: "200K",
    pricing: "$3/$15",
    released: "Jan 2026",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    description: "Versatile multimodal model",
    capabilities: ["vision", "creative", "coding"],
    contextWindow: "128K",
    pricing: "$5/$15",
    released: "May 2024",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "OpenAI",
    description: "Fast and capable for most tasks",
    capabilities: ["coding", "reasoning", "vision"],
    contextWindow: "128K",
    pricing: "$10/$30",
    released: "Nov 2023",
  },
  {
    id: "gemini-2.5-pro",
    name: "Gemini 2.5 Pro",
    provider: "Google",
    description: "Google's most advanced model",
    capabilities: ["reasoning", "coding", "vision", "creative"],
    contextWindow: "2M",
    pricing: "$3.50/$10.50",
    released: "Dec 2025",
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "Google",
    description: "Fast and efficient",
    capabilities: ["fast", "vision", "coding"],
    contextWindow: "1M",
    pricing: "$0.075/$0.30",
    released: "Dec 2025",
  },
  {
    id: "grok-4.1",
    name: "Grok 4.1",
    provider: "xAI",
    description: "Real-time knowledge model",
    capabilities: ["chat", "reasoning", "agentic"],
    contextWindow: "128K",
    pricing: "$5/$25",
    released: "Jan 2026",
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "Meta",
    description: "Open source powerhouse",
    capabilities: ["coding", "reasoning", "fast"],
    contextWindow: "128K",
    pricing: "Open Source",
    released: "Dec 2024",
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "Mistral",
    description: "European AI leader",
    capabilities: ["reasoning", "coding", "chat"],
    contextWindow: "128K",
    pricing: "$4/$12",
    released: "Feb 2024",
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "DeepSeek",
    description: "Cost-effective reasoning",
    capabilities: ["reasoning", "coding", "fast"],
    contextWindow: "64K",
    pricing: "$0.14/$0.28",
    released: "Dec 2024",
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "Cohere",
    description: "Enterprise RAG specialist",
    capabilities: ["chat", "reasoning", "agentic"],
    contextWindow: "128K",
    pricing: "$3/$15",
    released: "Apr 2024",
  },
  {
    id: "qwen-2.5-72b",
    name: "Qwen 2.5 72B",
    provider: "Alibaba",
    description: "Multilingual powerhouse",
    capabilities: ["coding", "reasoning", "creative"],
    contextWindow: "128K",
    pricing: "Open Source",
    released: "Sep 2024",
  },
]

const providers = ["All", "Anthropic", "OpenAI", "Google", "xAI", "Meta", "Mistral", "DeepSeek", "Cohere", "Alibaba"]

export default function ModelsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProvider, setSelectedProvider] = useState("All")
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid")

  const filteredModels = models.filter((model) => {
    const matchesSearch =
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesProvider = selectedProvider === "All" || model.provider === selectedProvider
    return matchesSearch && matchesProvider
  })

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">AI Model Directory</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Explore and compare 100+ AI models. Find the perfect model for your use case.
            </p>
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Provider" />
                </SelectTrigger>
                <SelectContent>
                  {providers.map((provider) => (
                    <SelectItem key={provider} value={provider}>
                      {provider}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div>
                <span className="text-2xl font-bold text-primary">{models.length}</span>
                <span className="text-muted-foreground ml-2">models</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-primary">{providers.length - 1}</span>
                <span className="text-muted-foreground ml-2">providers</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                Grid
              </Button>
              <Button
                variant={viewMode === "table" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("table")}
              >
                Table
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Models */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredModels.map((model) => (
                <Card key={model.id} className="hover:shadow-lg transition-shadow group">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {model.name}
                        </CardTitle>
                        <CardDescription className="text-xs">{model.provider}</CardDescription>
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {model.capabilities.slice(0, 3).map((cap) => (
                        <Badge
                          key={cap}
                          variant={cap as "creative" | "reasoning" | "vision" | "coding" | "fast" | "chat" | "agentic"}
                          className="text-xs"
                        >
                          {cap}
                        </Badge>
                      ))}
                      {model.capabilities.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{model.capabilities.length - 3}
                        </Badge>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                      <div>
                        <span className="block text-foreground font-medium">{model.contextWindow}</span>
                        Context
                      </div>
                      <div>
                        <span className="block text-foreground font-medium">{model.pricing}</span>
                        Input/Output
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Model</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Capabilities</TableHead>
                    <TableHead>Context</TableHead>
                    <TableHead>Pricing</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredModels.map((model) => (
                    <TableRow key={model.id} className="cursor-pointer hover:bg-muted/50">
                      <TableCell className="font-medium">{model.name}</TableCell>
                      <TableCell>{model.provider}</TableCell>
                      <TableCell className="text-muted-foreground max-w-[200px] truncate">
                        {model.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {model.capabilities.slice(0, 2).map((cap) => (
                            <Badge key={cap} variant="outline" className="text-xs">
                              {cap}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>{model.contextWindow}</TableCell>
                      <TableCell>{model.pricing}</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Compare?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Select models and start comparing their responses side by side with ModelMix.
          </p>
          <Button size="lg" asChild>
            <Link href="/modelmix">
              Launch ModelMix
            </Link>
          </Button>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Send,
  Minus,
  Plus,
  Paperclip,
  Bookmark,
  Settings2,
  Download,
  History,
  LayoutGrid,
  Globe,
  MessageSquare,
  Code,
  BarChart3,
  Sparkles,
  ChevronDown,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ModelCard, ModelResponse } from "@/components/modelmix/ModelCard"
import { ModelSelector, AIModel } from "@/components/modelmix/ModelSelector"
import { ExportDialog } from "@/components/modelmix/ExportDialog"

const challengeCategories = [
  { icon: "🎨", label: "Creative" },
  { icon: "🧠", label: "Logic" },
  { icon: "💻", label: "Code" },
  { icon: "💡", label: "Knowledge" },
  { icon: "⚖️", label: "Debate" },
  { icon: "🌀", label: "Weird" },
]

const showdownPrompts = [
  { label: "Count the R's in 'strawberry'", tag: "Viral Test", icon: "🍓" },
  { label: "Write 3 haikus about silence, each with...", tag: "Creative", icon: "" },
  { label: "Explain why manhole covers are round", tag: "Logic", icon: "" },
  { label: "Write a function to reverse a linked list", tag: "Code", icon: "🍓" },
]

const sampleResponses: ModelResponse[] = [
  {
    id: "1",
    modelName: "Gemini 2.5 Flash",
    provider: "Google",
    responseTime: 4801,
    status: "complete",
    progress: 72,
    persona: "The techbro",
    summary: "Alright, let's get down to brass tacks. You want to count the 'r's in \"strawberry\". It's a simple request, right? You'd think these fancy AI models could handle something as basic as that.",
    content: `Alright, let's get down to brass tacks. You want to count the 'r's in "strawberry". It's a simple request, right? You'd think these fancy AI models could handle something as basic as that.

The word "strawberry" contains **three R's**.

Let me break it down by position:
- **Position 3**: st**r**awberry
- **Position 8**: strawber**r**y
- **Position 9**: strawber**r**y

Wait, I need to recount that. Looking at s-t-r-a-w-b-e-r-r-y:
- Position 3: r
- Position 8: r
- Position 9: r

Yes, there are exactly **3 R's** in "strawberry".`,
  },
  {
    id: "2",
    modelName: "Claude Sonnet 4.5",
    provider: "Anthropic",
    responseTime: 8093,
    status: "complete",
    progress: 21,
    persona: "Coder",
    summary: "The word \"strawberry\" contains three R's. Let me break it down by position: - Position 3: strawberry - Position 8: strawberry - Position 9: strawberry This is actually a well-known test case that has tripped up various AI models, as documented in [inc.com][https://www.inc.com].",
    content: `The word "strawberry" contains **three R's**.

Let me break it down by position:
- **Position 3**: st**r**awberry
- **Position 8**: strawbe**r**ry
- **Position 9**: strawber**r**y

This is actually a well-known test case that has tripped up various AI models, as documented in [inc.com](https://inc.com) and [community.openai.com](https://community.openai.com). The confusion typically stems from how AI models process language as patterns rather than explicitly counting individual characters. Multiple sources confirm the correct answer is three R's, appearing in positions 3, 8, and 9 of the ten-letter word.`,
  },
]

export default function ModelMixPage() {
  const [prompt, setPrompt] = useState("")
  const [numModels, setNumModels] = useState(2)
  const [showModelSelector, setShowModelSelector] = useState(false)
  const [showExportDialog, setShowExportDialog] = useState(false)
  const [selectedModels, setSelectedModels] = useState<AIModel[]>([
    {
      id: "gemini-2.5-flash",
      name: "Gemini 2.5 Flash",
      provider: "google",
      description: "Fast & efficient",
      capabilities: ["fast", "vision", "coding"],
    },
    {
      id: "claude-sonnet-4.5",
      name: "Claude Sonnet 4.5",
      provider: "anthropic",
      description: "Excellent reasoning",
      capabilities: ["creative", "reasoning", "vision"],
    },
  ])
  const [responses, setResponses] = useState<ModelResponse[]>(sampleResponses)
  const [activeRound, setActiveRound] = useState(5)

  const rounds = [
    { id: 1, title: "Design a standalo...", date: "Invalid Date" },
    { id: 2, title: "Design a standalo...", date: "Invalid Date" },
    { id: 3, title: "Can you add some ...", date: "Invalid Date" },
    { id: 4, title: "Make your page in...", date: "Invalid Date" },
    { id: 5, title: "Count the R's in...", date: "09:33 PM" },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Timeline navigation */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <MessageSquare className="h-4 w-4 text-primary" />
              </div>
              <span className="text-sm font-medium text-primary">Latest</span>
            </div>
            {rounds.map((round) => (
              <button
                key={round.id}
                onClick={() => setActiveRound(round.id)}
                className={`flex flex-col items-center gap-1 shrink-0 px-3 py-1 rounded-lg transition-colors ${
                  activeRound === round.id
                    ? "bg-primary/10"
                    : "hover:bg-muted"
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                  activeRound === round.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted-foreground/20"
                }`}>
                  {round.id}
                </div>
                <span className="text-xs text-muted-foreground truncate max-w-[80px]">
                  {round.title}
                </span>
                <span className="text-xs text-muted-foreground">{round.date}</span>
              </button>
            ))}
            <div className="flex items-center gap-2 shrink-0 ml-auto">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Timeline</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 container mx-auto px-4 py-6">
        {/* Session header */}
        <div className="mb-6">
          <h1 className="text-xl font-semibold mb-1">
            Design a standalone HTML file that will show op...
          </h1>
          <p className="text-sm text-muted-foreground">
            Started 1/10/2026, 9:00:53 PM
          </p>
          <div className="flex items-center gap-4 mt-3">
            <span className="text-sm">
              Responses <span className="font-medium">2 of 2 received</span>
            </span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Globe className="h-4 w-4" />
                Deep Research
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <LayoutGrid className="h-4 w-4" />
                Windows
              </Button>
              <span className="text-sm text-muted-foreground">Panels:</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="font-medium">2</span>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Response grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {responses.map((response) => (
            <ModelCard
              key={response.id}
              response={response}
              onCopy={() => navigator.clipboard.writeText(response.content)}
              onExpand={() => {}}
            />
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 mb-6">
          <Badge variant="secondary" className="cursor-pointer">
            <Globe className="h-3 w-3 mr-1" />
            Deep Research
            <span className="ml-1 bg-primary/20 text-primary px-1.5 py-0.5 rounded text-xs">10</span>
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            <MessageSquare className="h-3 w-3 mr-1" />
            Explain
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            <Sparkles className="h-3 w-3 mr-1" />
            Examples
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            <Code className="h-3 w-3 mr-1" />
            Code
          </Badge>
          <Badge variant="secondary" className="cursor-pointer">
            <BarChart3 className="h-3 w-3 mr-1" />
            Compare
          </Badge>
          <Button variant="ghost" size="sm">
            ...
          </Button>
        </div>

        {/* Prompt input (hidden when showing results, but we show it) */}
        <Card className="border-2">
          <CardContent className="p-4">
            <Textarea
              placeholder="Follow-up... (Ctrl+Enter to send, @ to mention)"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[60px] border-0 shadow-none resize-none focus-visible:ring-0 p-0"
            />
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="gap-2">
                  <Paperclip className="h-4 w-4" />
                  Attach
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">Send to:</span>
                <Badge variant="secondary" className="gap-1">
                  <LayoutGrid className="h-3 w-3" />
                  All models
                </Badge>
                <Button variant="gradient" size="sm">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom toolbar - fixed */}
      <div className="sticky bottom-0 border-t bg-background/95 backdrop-blur">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-muted rounded-lg p-1">
                <span className="px-3 py-1 text-sm font-medium">Compare</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-medium">{numModels}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Plus className="h-4 w-4" />
                </Button>
                <span className="px-2 text-sm">models</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowModelSelector(true)}
              >
                Select Models
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <History className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowExportDialog(true)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selector Dialog */}
      <ModelSelector
        open={showModelSelector}
        onOpenChange={setShowModelSelector}
        selectedModels={selectedModels}
        onModelsChange={setSelectedModels}
        maxSlots={4}
      />

      {/* Export Dialog */}
      <ExportDialog
        open={showExportDialog}
        onOpenChange={setShowExportDialog}
        sessionInfo={{
          title: "Design a standalone HTML file that will show op...",
          rounds: 5,
          responses: 2,
          models: 2,
        }}
      />
    </div>
  )
}

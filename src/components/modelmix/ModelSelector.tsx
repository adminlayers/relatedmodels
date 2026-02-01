"use client"

import { useState } from "react"
import { X, Search, RefreshCw, Minus, Plus, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export interface AIModel {
  id: string
  name: string
  provider: string
  description: string
  capabilities: string[]
  metrics?: {
    speed?: string
    quality?: string
    cost?: string
  }
}

const recommendedModels: AIModel[] = [
  {
    id: "claude-sonnet-4.5",
    name: "Claude Sonnet 4.5",
    provider: "anthropic",
    description: "Excellent reasoning & creative writing",
    capabilities: ["creative", "reasoning", "vision"],
  },
  {
    id: "grok-4.1-fast",
    name: "Grok 4.1 Fast",
    provider: "x-ai",
    description: "Fast Grok for quick agentic work",
    capabilities: ["agentic", "fast", "chat"],
  },
  {
    id: "grok-code-fast-1",
    name: "Grok Code Fast 1",
    provider: "x-ai",
    description: "Optimized for code generation",
    capabilities: ["coding", "agentic", "fast"],
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    description: "Versatile multimodal model",
    capabilities: ["vision", "creative", "coding"],
  },
  {
    id: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    provider: "google",
    description: "Fast & efficient, great all-rounder",
    capabilities: ["fast", "vision", "coding"],
  },
  {
    id: "claude-opus-4.5",
    name: "Claude Opus 4.5",
    provider: "anthropic",
    description: "Most capable Claude model",
    capabilities: ["reasoning", "creative", "coding"],
  },
  {
    id: "llama-3.3-70b",
    name: "Llama 3.3 70B",
    provider: "meta",
    description: "Open source powerhouse",
    capabilities: ["coding", "reasoning", "fast"],
  },
  {
    id: "mistral-large",
    name: "Mistral Large",
    provider: "mistral",
    description: "European AI leader",
    capabilities: ["reasoning", "coding", "chat"],
  },
  {
    id: "deepseek-v3",
    name: "DeepSeek V3",
    provider: "deepseek",
    description: "Cost-effective reasoning",
    capabilities: ["reasoning", "coding", "fast"],
  },
  {
    id: "command-r-plus",
    name: "Command R+",
    provider: "cohere",
    description: "Enterprise-focused RAG model",
    capabilities: ["chat", "reasoning", "agentic"],
  },
]

interface ModelSelectorProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  selectedModels: AIModel[]
  onModelsChange: (models: AIModel[]) => void
  maxSlots?: number
}

export function ModelSelector({
  open,
  onOpenChange,
  selectedModels,
  onModelsChange,
  maxSlots = 4,
}: ModelSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [numSlots, setNumSlots] = useState(selectedModels.length || 2)

  const filteredModels = recommendedModels.filter(
    (model) =>
      model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      model.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const isModelSelected = (modelId: string) =>
    selectedModels.some((m) => m.id === modelId)

  const getModelSlot = (modelId: string) => {
    const index = selectedModels.findIndex((m) => m.id === modelId)
    return index >= 0 ? index + 1 : null
  }

  const toggleModel = (model: AIModel) => {
    if (isModelSelected(model.id)) {
      onModelsChange(selectedModels.filter((m) => m.id !== model.id))
    } else if (selectedModels.length < numSlots) {
      onModelsChange([...selectedModels, model])
    }
  }

  const handleNumSlotsChange = (delta: number) => {
    const newNum = Math.max(2, Math.min(maxSlots, numSlots + delta))
    setNumSlots(newNum)
    if (selectedModels.length > newNum) {
      onModelsChange(selectedModels.slice(0, newNum))
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold">
              M²
            </div>
            <div>
              <DialogTitle>Welcome to ModelMix</DialogTitle>
              <DialogDescription>
                Compare AI models side-by-side. Start with our top picks or browse all models.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        {/* Catalog status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <span className="text-sm text-muted-foreground">Fallback catalog</span>
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh models
          </Button>
        </div>

        {/* Model slots */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Your Model Slots ({numSlots})</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNumSlotsChange(-1)}
                disabled={numSlots <= 2}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{numSlots}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => handleNumSlotsChange(1)}
                disabled={numSlots >= maxSlots}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: numSlots }).map((_, idx) => (
              <div
                key={idx}
                className="px-4 py-2 rounded-lg bg-muted border-2 border-dashed border-muted-foreground/30"
              >
                <span className="text-sm font-medium">
                  Slot {idx + 1}:{" "}
                  {selectedModels[idx] ? (
                    <span className="text-foreground">{selectedModels[idx].name}</span>
                  ) : (
                    <span className="text-muted-foreground">Empty</span>
                  )}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <span>👆</span> Click a slot to change its model
          </p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Model table */}
        <ScrollArea className="flex-1 max-h-[300px]">
          <h3 className="font-medium mb-3 flex items-center gap-2">
            <span className="text-yellow-500">⭐</span>
            Top 10 Recommended Models
          </h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Model</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Capabilities</TableHead>
                <TableHead>Metrics</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModels.map((model) => {
                const slot = getModelSlot(model.id)
                return (
                  <TableRow
                    key={model.id}
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => toggleModel(model)}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{model.name}</div>
                        <div className="text-xs text-muted-foreground">{model.provider}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {model.description}
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {model.capabilities.map((cap) => (
                          <Badge
                            key={cap}
                            variant={cap as "creative" | "reasoning" | "vision" | "coding" | "fast" | "chat" | "agentic"}
                            className="text-xs"
                          >
                            {cap}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">—</TableCell>
                    <TableCell>
                      {slot ? (
                        <Badge className="bg-primary/20 text-primary border border-primary">
                          <Check className="h-3 w-3 mr-1" />
                          Slot {slot}
                        </Badge>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </ScrollArea>

        <DialogFooter className="flex items-center justify-between">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" />
            Browse Top 100 Models
          </Button>
          <Button onClick={() => onOpenChange(false)}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from "react"
import { Copy, Maximize2, MoreHorizontal, FileText, ExternalLink } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export interface ModelResponse {
  id: string
  modelName: string
  provider: string
  responseTime: number
  status: "loading" | "complete" | "error"
  progress?: number
  summary?: string
  content: string
  persona?: string
}

interface ModelCardProps {
  response: ModelResponse
  onExpand?: () => void
  onCopy?: () => void
}

export function ModelCard({ response, onExpand, onCopy }: ModelCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getStatusColor = () => {
    switch (response.status) {
      case "loading":
        return "bg-yellow-500"
      case "complete":
        return "bg-green-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  const getProviderColor = () => {
    const provider = response.provider.toLowerCase()
    if (provider.includes("anthropic")) return "bg-orange-500"
    if (provider.includes("openai")) return "bg-green-600"
    if (provider.includes("google")) return "bg-blue-500"
    if (provider.includes("xai") || provider.includes("x-ai")) return "bg-gray-800"
    return "bg-primary"
  }

  return (
    <Card className="flex flex-col h-full border-2">
      <CardHeader className="pb-2 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge className={`${getProviderColor()} text-white`}>
              {response.modelName}
            </Badge>
            {response.progress !== undefined && response.progress < 100 && (
              <span className="text-xs text-yellow-600 font-medium">
                {response.progress}%
              </span>
            )}
            {response.status === "complete" && (
              <span className="text-xs text-green-600 font-medium">
                {response.progress || 100}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onCopy}>
              <Copy className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onExpand}>
              <Maximize2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <FileText className="h-4 w-4 mr-2" />
                  View raw
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in new tab
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-destructive">
                  Remove
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          {response.persona && (
            <div className="flex items-center gap-1">
              <FileText className="h-3 w-3" />
              <span>Persona: {response.persona}</span>
            </div>
          )}
          <span>{response.responseTime}ms</span>
          {response.status === "complete" && <span>✓</span>}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {/* Summary Section */}
        {response.summary && (
          <div className="mb-4 p-3 rounded-lg bg-muted/50 border-l-4 border-primary">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase text-primary">Summary</span>
            </div>
            <p className="text-sm text-muted-foreground">{response.summary}</p>
          </div>
        )}

        {/* Response Content */}
        <ScrollArea className="flex-1 max-h-[400px]">
          <div className="prose prose-sm max-w-none dark:prose-invert">
            {response.status === "loading" ? (
              <div className="flex items-center gap-2 text-muted-foreground">
                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                <span>Generating response...</span>
              </div>
            ) : (
              <div className="whitespace-pre-wrap">{response.content}</div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

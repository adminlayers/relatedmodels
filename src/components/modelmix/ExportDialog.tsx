"use client"

import { useState } from "react"
import { Zap, AlignLeft, FileText, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface ExportDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  sessionInfo: {
    title: string
    rounds: number
    responses: number
    models: number
  }
}

export function ExportDialog({ open, onOpenChange, sessionInfo }: ExportDialogProps) {
  const [exportDepth, setExportDepth] = useState<"basic" | "in-depth" | "detailed">("detailed")
  const [format, setFormat] = useState<"markdown" | "pdf" | "json">("markdown")
  const [options, setOptions] = useState({
    summaries: true,
    metadata: true,
    actionsInsights: true,
    timestamps: true,
  })
  const [superSummaryFocus, setSuperSummaryFocus] = useState("")

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Export Session</DialogTitle>
          <DialogDescription>
            Export the entire conversation with all {sessionInfo.responses} responses across {sessionInfo.rounds} rounds
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Depth */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Export Depth</Label>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "basic", label: "Basic", sublabel: "Summaries", icon: Zap },
                { value: "in-depth", label: "In-Depth", sublabel: "+ Key Points", icon: AlignLeft },
                { value: "detailed", label: "Detailed", sublabel: "Everything", icon: FileText },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExportDepth(option.value as typeof exportDepth)}
                  className={`p-4 rounded-lg border-2 text-center transition-colors ${
                    exportDepth === option.value
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <option.icon className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                  <div className="font-medium text-sm">{option.label}</div>
                  <div className="text-xs text-muted-foreground">{option.sublabel}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Format</Label>
            <RadioGroup value={format} onValueChange={(v) => setFormat(v as typeof format)}>
              <div className="space-y-2">
                {[
                  { value: "markdown", label: "Markdown (.md)", description: "Readable, easy to share" },
                  { value: "pdf", label: "PDF", description: "Print-ready document" },
                  { value: "json", label: "JSON", description: "Structured data, re-importable" },
                ].map((option) => (
                  <div
                    key={option.value}
                    className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-colors ${
                      format === option.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setFormat(option.value as typeof format)}
                  >
                    <RadioGroupItem value={option.value} id={option.value} />
                    <div className="flex-1">
                      <Label htmlFor={option.value} className="font-medium cursor-pointer">
                        {option.label}
                      </Label>
                      <p className="text-xs text-muted-foreground">{option.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Include options */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include</Label>
            <div className="grid grid-cols-2 gap-3">
              {[
                { key: "summaries", label: "Summaries" },
                { key: "actionsInsights", label: "Actions & Insights" },
                { key: "metadata", label: "Metadata" },
                { key: "timestamps", label: "Timestamps" },
              ].map((option) => (
                <div key={option.key} className="flex items-center gap-2">
                  <Checkbox
                    id={option.key}
                    checked={options[option.key as keyof typeof options]}
                    onCheckedChange={(checked) =>
                      setOptions({ ...options, [option.key]: checked })
                    }
                  />
                  <Label htmlFor={option.key} className="text-sm cursor-pointer">
                    {option.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Super Summary */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <Label className="text-sm font-medium">Super Summary</Label>
              </div>
              <Button variant="outline" size="sm">
                Generate
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Generate an AI synthesis of all model responses to include in your export.
            </p>
            <Textarea
              placeholder="Optional: Add specific focus areas (e.g., 'Focus on technical details', 'Emphasize practical examples')..."
              value={superSummaryFocus}
              onChange={(e) => setSuperSummaryFocus(e.target.value)}
              className="min-h-[60px]"
            />
          </div>

          {/* Session Summary */}
          <div className="p-4 bg-muted rounded-lg space-y-2">
            <h4 className="font-medium">Session Summary</h4>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-muted-foreground">Title:</span>{" "}
                <span className="font-medium">{sessionInfo.title}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Rounds:</span>{" "}
                <span className="font-medium">{sessionInfo.rounds}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Responses:</span>{" "}
                <span className="font-medium">{sessionInfo.responses}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Models:</span>{" "}
                <span className="font-medium">{sessionInfo.models}</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button>Export Full</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

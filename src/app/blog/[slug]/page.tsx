"use client"

import { use, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import {
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
  ChevronUp,
  List,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { BlogCard } from "@/components/blog/BlogCard"
import { getBlogPost, getBlogPosts, BlogPost } from "@/lib/blog-data"

// Custom Markdown-like renderer for blog content
function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let i = 0
  let key = 0

  const processInlineMarkdown = (text: string): React.ReactNode => {
    // Process bold, links, code
    const parts: React.ReactNode[] = []
    let remaining = text
    let partKey = 0

    while (remaining.length > 0) {
      // Check for bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
      // Check for links
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/)
      // Check for inline code
      const codeMatch = remaining.match(/`([^`]+)`/)

      const matches = [
        boldMatch ? { type: 'bold', match: boldMatch, index: boldMatch.index! } : null,
        linkMatch ? { type: 'link', match: linkMatch, index: linkMatch.index! } : null,
        codeMatch ? { type: 'code', match: codeMatch, index: codeMatch.index! } : null,
      ].filter(Boolean).sort((a, b) => a!.index - b!.index)

      if (matches.length === 0) {
        parts.push(remaining)
        break
      }

      const first = matches[0]!
      const before = remaining.slice(0, first.index)
      if (before) parts.push(before)

      if (first.type === 'bold') {
        parts.push(<strong key={partKey++}>{first.match![1]}</strong>)
        remaining = remaining.slice(first.index + first.match![0].length)
      } else if (first.type === 'link') {
        parts.push(
          <a
            key={partKey++}
            href={first.match![2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            {first.match![1]}
          </a>
        )
        remaining = remaining.slice(first.index + first.match![0].length)
      } else if (first.type === 'code') {
        parts.push(
          <code key={partKey++} className="px-1.5 py-0.5 bg-muted rounded text-sm font-mono">
            {first.match![1]}
          </code>
        )
        remaining = remaining.slice(first.index + first.match![0].length)
      }
    }

    return parts.length === 1 ? parts[0] : parts
  }

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (line.trim() === '') {
      i++
      continue
    }

    // Video embed
    if (line.trim() === '<video>') {
      i++
      const videoUrl = lines[i]?.trim()
      i++
      if (lines[i]?.trim() === '</video>') {
        i++
      }
      elements.push(
        <div key={key++} className="my-8 aspect-video rounded-lg overflow-hidden shadow-lg">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
      continue
    }

    // Image with caption
    if (line.startsWith('![')) {
      const imgMatch = line.match(/!\[([^\]]*)\]\(([^)]+)\)/)
      if (imgMatch) {
        const alt = imgMatch[1]
        const src = imgMatch[2]
        let caption = null

        // Check for caption on next line
        if (lines[i + 1]?.startsWith('*') && lines[i + 1]?.endsWith('*')) {
          caption = lines[i + 1].slice(1, -1)
          i++
        }

        elements.push(
          <figure key={key++} className="my-8">
            <div className="relative aspect-video rounded-lg overflow-hidden shadow-lg">
              <Image
                src={src}
                alt={alt}
                fill
                className="object-cover"
              />
            </div>
            {caption && (
              <figcaption className="mt-3 text-center text-sm text-muted-foreground italic">
                {caption}
              </figcaption>
            )}
          </figure>
        )
        i++
        continue
      }
    }

    // Code block
    if (line.startsWith('```')) {
      const language = line.slice(3).trim()
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <div key={key++} className="my-6">
          {language && (
            <div className="bg-zinc-800 text-zinc-400 text-xs px-4 py-2 rounded-t-lg border-b border-zinc-700">
              {language}
            </div>
          )}
          <pre className={`bg-zinc-900 text-zinc-100 p-4 overflow-x-auto text-sm ${language ? 'rounded-b-lg' : 'rounded-lg'}`}>
            <code>{codeLines.join('\n')}</code>
          </pre>
        </div>
      )
      continue
    }

    // Headings
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-2xl font-bold mt-12 mb-4 scroll-mt-20" id={line.slice(3).toLowerCase().replace(/\s+/g, '-')}>
          {line.slice(3)}
        </h2>
      )
      i++
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={key++} className="text-xl font-semibold mt-8 mb-3">
          {line.slice(4)}
        </h3>
      )
      i++
      continue
    }

    // Blockquote
    if (line.startsWith('>')) {
      const quoteLines: string[] = []
      while (i < lines.length && lines[i].startsWith('>')) {
        quoteLines.push(lines[i].slice(1).trim())
        i++
      }
      elements.push(
        <blockquote key={key++} className="my-6 pl-4 border-l-4 border-primary/50 italic text-muted-foreground">
          {quoteLines.map((q, idx) => (
            <p key={idx} className="mb-2 last:mb-0">{processInlineMarkdown(q)}</p>
          ))}
        </blockquote>
      )
      continue
    }

    // Horizontal rule
    if (line.trim() === '---') {
      elements.push(<Separator key={key++} className="my-8" />)
      i++
      continue
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const tableLines: string[] = []
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i])
        i++
      }

      const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim())
      const rows = tableLines.slice(2).map(row =>
        row.split('|').filter(c => c.trim()).map(c => c.trim())
      )

      elements.push(
        <div key={key++} className="my-6 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b-2 border-border">
                {headers.map((header, idx) => (
                  <th key={idx} className="text-left py-3 px-4 font-semibold">
                    {processInlineMarkdown(header)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rowIdx) => (
                <tr key={rowIdx} className="border-b border-border hover:bg-muted/50">
                  {row.map((cell, cellIdx) => (
                    <td key={cellIdx} className="py-3 px-4">
                      {processInlineMarkdown(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      continue
    }

    // Unordered list
    if (line.startsWith('- ')) {
      const listItems: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        listItems.push(lines[i].slice(2))
        i++
      }
      elements.push(
        <ul key={key++} className="my-4 space-y-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span>{processInlineMarkdown(item)}</span>
            </li>
          ))}
        </ul>
      )
      continue
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      elements.push(
        <ol key={key++} className="my-4 space-y-2 list-decimal list-inside">
          {listItems.map((item, idx) => (
            <li key={idx} className="text-muted-foreground">
              <span className="text-foreground">{processInlineMarkdown(item)}</span>
            </li>
          ))}
        </ol>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={key++} className="my-4 leading-relaxed text-muted-foreground">
        {processInlineMarkdown(line)}
      </p>
    )
    i++
  }

  return elements
}

export default function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const post = getBlogPost(slug)

  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(post?.likes || 0)
  const [showCopied, setShowCopied] = useState(false)
  const [showTOC, setShowTOC] = useState(false)

  if (!post) {
    notFound()
  }

  const relatedPosts = getBlogPosts({ limit: 3 }).filter(p => p.id !== post.id)

  const handleShare = (platform: string) => {
    const url = typeof window !== 'undefined' ? window.location.href : ''
    const text = `${post.title} by ${post.author.name}`

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
        break
      case 'copy':
        navigator.clipboard.writeText(url)
        setShowCopied(true)
        setTimeout(() => setShowCopied(false), 2000)
        break
    }
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  // Extract headings for TOC
  const headings = post.content.match(/^## .+$/gm)?.map(h => ({
    text: h.slice(3),
    id: h.slice(3).toLowerCase().replace(/\s+/g, '-')
  })) || []

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

        {/* Back button */}
        <div className="absolute top-4 left-4">
          <Link href="/blog">
            <Button variant="secondary" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {post.trending && (
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">
                  Trending
                </Badge>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg text-white/80 mb-6 max-w-2xl">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-4 text-white/70">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10 border-2 border-white/20">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-white">{post.author.name}</p>
                  <p className="text-sm">{post.author.role}</p>
                </div>
              </div>
              <Separator orientation="vertical" className="h-8 bg-white/20" />
              <div className="flex items-center gap-4 text-sm">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
                {post.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {(post.views / 1000).toFixed(1)}k views
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky action bar */}
      <div className="sticky top-0 z-40 bg-background/95 backdrop-blur border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14 max-w-4xl mx-auto">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                onClick={() => setShowTOC(!showTOC)}
              >
                <List className="h-4 w-4" />
                Contents
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "ghost"}
                size="sm"
                className="gap-2"
                onClick={handleLike}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                {likeCount}
              </Button>

              <Button
                variant={isBookmarked ? "default" : "ghost"}
                size="sm"
                onClick={() => setIsBookmarked(!isBookmarked)}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="h-4 w-4" />
                ) : (
                  <Bookmark className="h-4 w-4" />
                )}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleShare('twitter')}>
                    <Twitter className="h-4 w-4 mr-2" />
                    Share on Twitter
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('linkedin')}>
                    <Linkedin className="h-4 w-4 mr-2" />
                    Share on LinkedIn
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleShare('copy')}>
                    {showCopied ? (
                      <>
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <LinkIcon className="h-4 w-4 mr-2" />
                        Copy link
                      </>
                    )}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Table of contents dropdown */}
          {showTOC && headings.length > 0 && (
            <div className="pb-4 border-t">
              <nav className="pt-4 max-w-4xl mx-auto">
                <p className="text-sm font-medium mb-2">On this page</p>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {headings.map((heading, idx) => (
                    <li key={idx}>
                      <a
                        href={`#${heading.id}`}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                        onClick={() => setShowTOC(false)}
                      >
                        {heading.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Article content */}
      <article className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map(tag => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              {renderContent(post.content)}
            </div>

            {/* Author bio */}
            <div className="mt-16 p-6 bg-muted/50 rounded-xl">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{post.author.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{post.author.role}</p>
                  <p className="text-sm text-muted-foreground mb-4">{post.author.bio}</p>
                  <div className="flex items-center gap-3">
                    {post.author.twitter && (
                      <a
                        href={`https://twitter.com/${post.author.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {post.author.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${post.author.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related posts */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">More from Charles Kim</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedPosts.map(relatedPost => (
              <BlogCard key={relatedPost.id} post={relatedPost} />
            ))}
          </div>
        </div>
      </section>

      {/* Scroll to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 p-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
      >
        <ChevronUp className="h-5 w-5" />
      </button>
    </div>
  )
}

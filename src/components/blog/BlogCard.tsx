"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Share2,
  Bookmark,
  BookmarkCheck,
  Minimize2,
  Maximize2,
  MoreHorizontal,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  TrendingUp,
  Check,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { BlogPost } from "@/lib/blog-data"

interface BlogCardProps {
  post: BlogPost
  variant?: "default" | "featured" | "minimal" | "horizontal"
}

export function BlogCard({ post, variant = "default" }: BlogCardProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showCopied, setShowCopied] = useState(false)
  const [likeCount, setLikeCount] = useState(post.likes || 0)

  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsBookmarked(!isBookmarked)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
  }

  const handleMinimize = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsMinimized(!isMinimized)
  }

  const handleShare = (platform: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/blog/${post.slug}`
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

  if (isMinimized) {
    return (
      <Card className="hover:shadow-md transition-all cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <Badge variant="outline" className="shrink-0">{post.category}</Badge>
              <span className="font-medium truncate">{post.title}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleMinimize}
                    >
                      <Maximize2 className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Expand</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden hover:shadow-lg transition-all">
        <div className="md:flex">
          <div className="md:w-1/2 relative aspect-video md:aspect-auto">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
            {post.trending && (
              <Badge className="absolute top-4 left-4 bg-orange-500">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="outline">{post.category}</Badge>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleBookmark}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-4 w-4 text-primary" />
                        ) : (
                          <Bookmark className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>{isBookmarked ? 'Saved' : 'Save for later'}</TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => handleShare('twitter', e)}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Share on Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleShare('linkedin', e)}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      Share on LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={(e) => handleShare('copy', e)}>
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

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={handleMinimize}
                      >
                        <Minimize2 className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Minimize</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h2 className="text-2xl font-bold mb-3 hover:text-primary transition-colors line-clamp-2">
                {post.title}
              </h2>
            </Link>

            <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mb-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={post.author.avatar} />
                <AvatarFallback>{post.author.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-muted-foreground border-t pt-4">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-3">
                {post.views && (
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {(post.views / 1000).toFixed(1)}k
                  </span>
                )}
                <button
                  className="flex items-center gap-1 hover:text-primary transition-colors"
                  onClick={handleLike}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  {likeCount > 0 && likeCount}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  if (variant === "horizontal") {
    return (
      <Card className="overflow-hidden hover:shadow-md transition-all group">
        <div className="flex">
          <div className="w-48 shrink-0 relative">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">{post.category}</Badge>
                {post.trending && (
                  <Badge className="bg-orange-500 text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  onClick={handleBookmark}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Bookmark className="h-3.5 w-3.5" />
                  )}
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7">
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => handleShare('twitter', e)}>
                      <Twitter className="h-4 w-4 mr-2" />
                      Share on Twitter
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleShare('linkedin', e)}>
                      <Linkedin className="h-4 w-4 mr-2" />
                      Share on LinkedIn
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleShare('copy', e)}>
                      <LinkIcon className="h-4 w-4 mr-2" />
                      Copy link
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleMinimize}>
                      <Minimize2 className="h-4 w-4 mr-2" />
                      Minimize
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <Link href={`/blog/${post.slug}`}>
              <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-1">
                {post.title}
              </h3>
            </Link>

            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{post.excerpt}</p>

            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <Avatar className="h-5 w-5">
                  <AvatarImage src={post.author.avatar} />
                  <AvatarFallback className="text-[10px]">{post.author.name[0]}</AvatarFallback>
                </Avatar>
                <span>{post.author.name}</span>
                <span>·</span>
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <span>{post.readTime}</span>
                <button
                  className="flex items-center gap-1 hover:text-primary"
                  onClick={handleLike}
                >
                  <Heart className={`h-3.5 w-3.5 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    )
  }

  // Default card variant
  return (
    <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer group">
      <div className="relative aspect-video">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {post.trending && (
          <Badge className="absolute top-3 right-3 bg-orange-500">
            <TrendingUp className="h-3 w-3 mr-1" />
            Trending
          </Badge>
        )}

        {/* Overlay actions on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-start justify-end p-3 opacity-0 group-hover:opacity-100">
          <div className="flex items-center gap-1">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={handleBookmark}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-4 w-4 text-primary" />
                    ) : (
                      <Bookmark className="h-4 w-4" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isBookmarked ? 'Saved' : 'Save'}</TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 bg-white/90 hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={(e) => handleShare('twitter', e)}>
                  <Twitter className="h-4 w-4 mr-2" />
                  Twitter
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare('linkedin', e)}>
                  <Linkedin className="h-4 w-4 mr-2" />
                  LinkedIn
                </DropdownMenuItem>
                <DropdownMenuItem onClick={(e) => handleShare('copy', e)}>
                  {showCopied ? <Check className="h-4 w-4 mr-2" /> : <LinkIcon className="h-4 w-4 mr-2" />}
                  {showCopied ? 'Copied!' : 'Copy link'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="h-8 w-8 bg-white/90 hover:bg-white"
                    onClick={handleMinimize}
                  >
                    <Minimize2 className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Minimize</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{post.category}</Badge>
          <span className="text-xs text-muted-foreground">{post.readTime}</span>
        </div>
        <Link href={`/blog/${post.slug}`}>
          <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
            {post.title}
          </CardTitle>
        </Link>
      </CardHeader>

      <CardContent>
        <CardDescription className="line-clamp-2 mb-4">{post.excerpt}</CardDescription>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="text-xs">{post.author.name[0]}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {post.views && (
              <span className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                {(post.views / 1000).toFixed(1)}k
              </span>
            )}
            <button
              className="flex items-center gap-1 hover:text-primary transition-colors"
              onClick={handleLike}
            >
              <Heart className={`h-3 w-3 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
              {likeCount > 0 && likeCount}
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

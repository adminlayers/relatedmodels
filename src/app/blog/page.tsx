"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Filter, Clock, User, ArrowRight, TrendingUp, LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { BlogCard } from "@/components/blog/BlogCard"
import { blogPosts, getBlogPosts } from "@/lib/blog-data"

const categories = [
  "All",
  "Analysis",
  "Tutorials",
  "Guides",
  "Industry",
  "Comparisons",
  "News",
]

export default function BlogPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent")

  const featuredPost = blogPosts.find(p => p.featured) || blogPosts[0]

  const filteredPosts = blogPosts
    .filter(post => {
      if (activeCategory !== "All" && post.category !== activeCategory) return false
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some(t => t.toLowerCase().includes(query))
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sortBy === "popular") return (b.views || 0) - (a.views || 0)
      if (sortBy === "trending") return (b.trending ? 1 : 0) - (a.trending ? 1 : 0)
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    })

  const nonFeaturedPosts = filteredPosts.filter(p => p.id !== featuredPost?.id)

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="gradient-hero py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">AI Insights & Resources</h1>
            <p className="text-xl text-muted-foreground mb-6">
              Thought leadership, tutorials, and analysis from industry experts. Stay ahead of the AI curve.
            </p>
            <div className="flex gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search articles, topics, tags..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <SlidersHorizontal className="h-4 w-4" />
                    Sort
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSortBy("recent")}>
                    Most Recent {sortBy === "recent" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("popular")}>
                    Most Popular {sortBy === "popular" && "✓"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("trending")}>
                    Trending {sortBy === "trending" && "✓"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b bg-background sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-x-auto py-2 scrollbar-hide">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveCategory(category)}
                  className="shrink-0"
                >
                  {category}
                </Button>
              ))}
            </div>
            <div className="flex items-center gap-1 border-l pl-4">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="icon"
                className="h-8 w-8"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      {activeCategory === "All" && !searchQuery && featuredPost && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="outline" className="text-xs">Featured</Badge>
              <span className="text-sm text-muted-foreground">Editor's Pick</span>
            </div>
            <BlogCard post={featuredPost} variant="featured" />
          </div>
        </section>
      )}

      {/* Blog Grid/List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold">
                {activeCategory === "All" ? "Latest Articles" : activeCategory}
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
                {searchQuery && ` matching "${searchQuery}"`}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="gap-1">
                <TrendingUp className="h-3 w-3" />
                {blogPosts.filter(p => p.trending).length} Trending
              </Badge>
            </div>
          </div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {nonFeaturedPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl">
              {nonFeaturedPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="horizontal" />
              ))}
            </div>
          )}

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button variant="outline" onClick={() => {
                setSearchQuery("")
                setActiveCategory("All")
              }}>
                Clear filters
              </Button>
            </div>
          )}

          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Author Spotlight */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8">Featured Author</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="md:flex items-start gap-8">
                <div className="shrink-0 mb-6 md:mb-0">
                  <Image
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face"
                    alt="Charles Kim"
                    width={160}
                    height={160}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-1">Charles Kim</h3>
                  <p className="text-primary mb-4">Chief AI Strategist</p>
                  <p className="text-muted-foreground mb-6">
                    Charles Kim is a thought leader in artificial intelligence with over 15 years of experience
                    in machine learning and enterprise AI adoption. Former Head of AI at Fortune 500 companies,
                    he now advises organizations on responsible AI implementation and writes about the intersection
                    of technology and business strategy.
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold">5</p>
                      <p className="text-xs text-muted-foreground">Articles</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-bold">67.9k</p>
                      <p className="text-xs text-muted-foreground">Total Views</p>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-bold">4.0k</p>
                      <p className="text-xs text-muted-foreground">Likes</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="default">View All Articles</Button>
                    <Button variant="outline">Follow</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
          <p className="text-white/60 text-sm mt-4">
            Join 12,000+ AI professionals. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  )
}

"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/src/lib/auth/auth-context"
import { NavSidebar } from "@/src/components/layout/nav-sidebar"
import { Card } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { Badge } from "@/src/components/ui/badge"
import Link from "next/link"
import { BookOpen, FileText, Video, Download, Upload, Search, Filter, Plus, Star, Eye, Share2, FolderOpen } from "lucide-react"

export default function ResourcesPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const router = useRouter()
  const { user, isLoading } = useAuth()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
    if (!isLoading && user && user?.role !== 'tutor' && user?.role !== 'both') {
      router.push("/dashboard")
    }
  }, [user, isLoading, router])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
      </div>
    )
  }

  const resources = [
    {
      id: 1,
      title: "Calculus Fundamentals",
      type: "document",
      category: "Mathematics",
      size: "2.4 MB",
      downloads: 156,
      rating: 4.8,
      uploadDate: "2024-06-15",
      description: "Comprehensive guide to calculus basics with examples"
    },
    {
      id: 2,
      title: "Physics Lab Experiments",
      type: "video",
      category: "Physics",
      size: "125 MB",
      downloads: 89,
      rating: 4.9,
      uploadDate: "2024-06-10",
      description: "Step-by-step video tutorials for physics experiments"
    },
    {
      id: 3,
      title: "Chemistry Formula Sheet",
      type: "document",
      category: "Chemistry",
      size: "1.2 MB",
      downloads: 234,
      rating: 4.7,
      uploadDate: "2024-06-08",
      description: "Quick reference sheet for all chemistry formulas"
    },
    {
      id: 4,
      title: "Biology Diagram Collection",
      type: "image",
      category: "Biology",
      size: "45 MB",
      downloads: 178,
      rating: 4.6,
      uploadDate: "2024-06-05",
      description: "High-quality diagrams for biology lessons"
    },
    {
      id: 5,
      title: "Algebra Practice Problems",
      type: "document",
      category: "Mathematics",
      size: "3.1 MB",
      downloads: 312,
      rating: 4.9,
      uploadDate: "2024-06-01",
      description: "100+ practice problems with detailed solutions"
    },
    {
      id: 6,
      title: "Periodic Table Explained",
      type: "video",
      category: "Chemistry",
      size: "89 MB",
      downloads: 145,
      rating: 4.8,
      uploadDate: "2024-05-28",
      description: "Interactive video explaining the periodic table"
    }
  ]

  const categories = ["all", "Mathematics", "Physics", "Chemistry", "Biology"]

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || resource.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "document": return FileText
      case "video": return Video
      case "image": return BookOpen
      default: return FileText
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case "document": return "from-blue-500 to-cyan-500"
      case "video": return "from-red-500 to-pink-500"
      case "image": return "from-green-500 to-emerald-500"
      default: return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      <NavSidebar />

      <main className="md:ml-64 p-3 sm:p-4 lg:p-6">
        {/* Header */}
        <div className={`mb-6 lg:mb-8 animate-fade-in pt-16 md:pt-0 transition-all duration-1000 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">
                Teaching Resources 📚
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                Manage and share your teaching materials with students
              </p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button variant="outline" className="btn-hover-lavender rounded-xl">
                <FolderOpen className="w-4 h-4 mr-2" />
                Create Folder
              </Button>
              <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base btn-hover-accent rounded-xl">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resource
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filter */}
        <Card className="p-4 sm:p-6 bg-card/50 border border-border/50 mb-6 lg:mb-8 rounded-xl">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search resources..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-border/50 rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent/50"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === "all" ? "All Categories" : category}
                  </option>
                ))}
              </select>
              <Button variant="outline" className="btn-hover-coral rounded-lg">
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 lg:mb-8">
          {[
            { label: "Total Resources", value: resources.length, color: "from-mint", icon: BookOpen },
            { label: "Total Downloads", value: "1,214", color: "from-soft-blue", icon: Download },
            { label: "Categories", value: categories.length - 1, color: "from-lavender", icon: FolderOpen },
            { label: "Avg. Rating", value: "4.8", color: "from-accent", icon: Star },
          ].map((stat, idx) => (
            <Card key={idx} className="p-4 sm:p-6 bg-card/50 border border-border/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <stat.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${stat.color} to-accent animate-pulse`} />
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className={`text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r ${stat.color} to-accent bg-clip-text text-transparent`}>
                {stat.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredResources.map((resource, idx) => {
            const TypeIcon = getTypeIcon(resource.type)
            return (
              <Card
                key={resource.id}
                className="p-4 sm:p-6 bg-card/50 border border-border/50 animate-slide-up hover:shadow-lg hover:-translate-y-1 transition-all duration-300 hover-lift rounded-xl group"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getTypeColor(resource.type)} p-3 group-hover:scale-110 transition-transform`}>
                    <TypeIcon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{resource.rating}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                      {resource.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {resource.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="text-xs">
                      {resource.category}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{resource.size}</span>
                    <span>{resource.downloads} downloads</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>Uploaded {resource.uploadDate}</span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-border/30">
                  <Button variant="outline" size="sm" className="flex-1 btn-hover-lavender rounded-lg">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 btn-hover-coral rounded-lg">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="ghost" size="sm" className="btn-hover-accent rounded-lg">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>

        {filteredResources.length === 0 && (
          <Card className="p-8 text-center bg-card/50 border border-border/50 rounded-xl">
            <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No resources found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button className="bg-gradient-to-r from-mint via-soft-blue to-lavender hover:opacity-90 text-foreground font-semibold btn-hover-accent rounded-xl">
              <Plus className="w-4 h-4 mr-2" />
              Upload Your First Resource
            </Button>
          </Card>
        )}
      </main>
    </div>
  )
}

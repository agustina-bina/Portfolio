"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, Search, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCartStore } from "@/lib/cart-store"
import { cn } from "@/lib/utils"

interface NavbarProps {
  onCartClick: () => void
  onSearch: (query: string) => void
  onCategorySelect: (category: string) => void
  activeCategory: string
}

const navCategories = [
  { id: "all", label: "Inicio" },
  { id: "skincare", label: "Skincare" },
  { id: "maquillaje", label: "Maquillaje" },
  { id: "cabello", label: "Cabello" },
  { id: "fragancias", label: "Fragancias" },
  { id: "cuidado-corporal", label: "Cuidado Corporal" },
]

export function Navbar({ onCartClick, onSearch, onCategorySelect, activeCategory }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)
  const cartItems = useCartStore((state) => state.getTotalItems())

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchQuery(value)
    onSearch(value)
  }

  const handleCategoryClick = (categoryId: string) => {
    onCategorySelect(categoryId)
    setIsMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-semibold text-primary tracking-wide">
              BELLE BEAUTY
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  activeCategory === category.id
                    ? "text-primary"
                    : "text-muted-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-9 w-48 lg:w-64 bg-muted/50 border-border focus:bg-card"
              />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingBag className="h-5 w-5" />
              {mounted && cartItems > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
                  {cartItems}
                </span>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-9 w-full bg-muted/50 border-border"
            />
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            {navCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={cn(
                  "text-left py-2 px-3 rounded-md text-sm font-medium transition-colors",
                  activeCategory === category.id
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {category.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { categories } from "@/lib/products"

interface CategoryFilterProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryFilter({ activeCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={activeCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={cn(
            "transition-all duration-200",
            activeCategory === category.id
              ? "bg-primary text-primary-foreground"
              : "bg-card hover:bg-secondary border-border"
          )}
        >
          {category.nombre}
        </Button>
      ))}
    </div>
  )
}

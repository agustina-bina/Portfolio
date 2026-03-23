"use client"

import Image from "next/image"
import { ShoppingBag, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  onViewProduct: (product: Product) => void
}

const categoryLabels: Record<string, string> = {
  skincare: "Skincare",
  maquillaje: "Maquillaje",
  cabello: "Cabello",
  fragancias: "Fragancias",
  "cuidado-corporal": "Cuidado Corporal",
}

export function ProductCard({ product, onViewProduct }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    addItem(product)
  }

  return (
    <Card className="group overflow-hidden border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg cursor-pointer bg-card">
      <div onClick={() => onViewProduct(product)}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <Image
            src={product.imagen}
            alt={product.nombre}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
          
          {/* Quick view button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              size="sm"
              variant="secondary"
              className="gap-2 shadow-md"
              onClick={(e) => {
                e.stopPropagation()
                onViewProduct(product)
              }}
            >
              <Eye className="h-4 w-4" />
              Ver producto
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <Badge variant="secondary" className="mb-2 text-xs font-normal">
            {categoryLabels[product.categoria]}
          </Badge>
          
          <h3 className="font-medium text-foreground line-clamp-2 mb-1 group-hover:text-primary transition-colors">
            {product.nombre}
          </h3>
          
          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {product.descripcion}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ${product.precio.toFixed(2)}
            </span>
            
            <Button
              size="sm"
              onClick={handleAddToCart}
              className="gap-2"
            >
              <ShoppingBag className="h-4 w-4" />
              <span className="hidden sm:inline">Agregar</span>
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

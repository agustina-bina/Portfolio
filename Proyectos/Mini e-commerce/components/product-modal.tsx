"use client"

import Image from "next/image"
import { X, ShoppingBag, Check, Sparkles, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCartStore } from "@/lib/cart-store"
import type { Product } from "@/lib/products"

interface ProductModalProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

const categoryLabels: Record<string, string> = {
  skincare: "Skincare",
  maquillaje: "Maquillaje",
  cabello: "Cabello",
  fragancias: "Fragancias",
  "cuidado-corporal": "Cuidado Corporal",
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const addItem = useCartStore((state) => state.addItem)

  if (!isOpen || !product) return null

  const handleAddToCart = () => {
    addItem(product)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-auto bg-card rounded-xl shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-10 bg-card/80 hover:bg-card"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Product Image */}
          <div className="relative aspect-square md:aspect-auto md:h-full bg-muted">
            <Image
              src={product.imagen}
              alt={product.nombre}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>

          {/* Product Details */}
          <div className="p-6 md:p-8 flex flex-col">
            <div className="flex-1">
              <Badge variant="secondary" className="mb-3">
                {categoryLabels[product.categoria]}
              </Badge>

              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">
                {product.nombre}
              </h2>

              <p className="text-3xl font-bold text-primary mb-6">
                ${product.precio.toFixed(2)}
              </p>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {product.descripcion}
              </p>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="flex items-center gap-2 font-medium text-foreground mb-3">
                  <Sparkles className="h-4 w-4 text-primary" />
                  Beneficios
                </h3>
                <ul className="space-y-2">
                  {product.beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <Check className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      {beneficio}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Ingredients */}
              <div className="mb-8">
                <h3 className="flex items-center gap-2 font-medium text-foreground mb-3">
                  <Leaf className="h-4 w-4 text-primary" />
                  Ingredientes principales
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.ingredientes.map((ingrediente, index) => (
                    <Badge key={index} variant="outline" className="font-normal">
                      {ingrediente}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="w-full gap-2"
            >
              <ShoppingBag className="h-5 w-5" />
              Agregar al carrito
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

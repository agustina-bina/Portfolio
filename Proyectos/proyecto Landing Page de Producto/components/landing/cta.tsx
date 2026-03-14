"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Truck, Shield, Headphones } from "lucide-react"

export function CTA() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#7d39eb]/20 via-background to-[#c6ff33]/10" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c6ff33]/50 to-transparent" />
      
      {/* Animated circles */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#7d39eb]/20 animate-pulse" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border border-[#c6ff33]/20 animate-pulse delay-500" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <span className="text-[#c6ff33] text-sm font-semibold tracking-wider uppercase">
            Oferta limitada
          </span>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-4 text-balance"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-foreground">MEJORÁ TU </span>
            <span className="text-[#7d39eb]">EXPERIENCIA </span>
            <span className="text-foreground">DE JUEGO </span>
            <span className="text-[#c6ff33]">HOY</span>
          </h2>
          
          <p className="text-xl text-muted-foreground mt-6 max-w-2xl mx-auto leading-relaxed">
            No te conformes con menos. El audio perfecto puede ser la diferencia entre ganar y perder.
          </p>

          {/* Price */}
          <div className="mt-10 flex items-center justify-center gap-4">
            <span className="text-2xl text-muted-foreground line-through">$199</span>
            <span 
              className="text-5xl md:text-6xl font-bold text-[#c6ff33]"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              $149
            </span>
            <span className="px-3 py-1 bg-[#7d39eb] text-white text-sm font-semibold rounded-full">
              -25%
            </span>
          </div>

          <p className="text-muted-foreground mt-2">PULSE PRO • El más vendido</p>

          {/* CTA Button */}
          <div className="mt-10">
            <Button 
              size="lg" 
              className="bg-[#c6ff33] text-black hover:bg-[#c6ff33]/90 text-xl px-12 py-8 font-semibold transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(198,255,51,0.4)] group"
            >
              <ShoppingCart className="w-6 h-6 mr-2 transition-transform group-hover:-translate-y-1" />
              Comprar ahora
            </Button>
          </div>

          {/* Trust badges */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Truck, text: "Envío gratis en 24-48h" },
              { icon: Shield, text: "2 años de garantía" },
              { icon: Headphones, text: "Soporte 24/7" },
            ].map((badge, index) => {
              const Icon = badge.icon
              return (
                <div 
                  key={index}
                  className="flex items-center justify-center gap-3 p-4 rounded-xl bg-card/50 border border-border"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.3 + index * 0.1}s`,
                  }}
                >
                  <Icon className="w-5 h-5 text-[#7d39eb]" />
                  <span className="text-foreground font-medium">{badge.text}</span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

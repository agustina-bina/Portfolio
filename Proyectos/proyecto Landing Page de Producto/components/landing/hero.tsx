"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export function Hero() {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const heading = headingRef.current
    const image = imageRef.current
    
    if (heading) {
      heading.style.opacity = "0"
      heading.style.transform = "translateY(30px)"
      setTimeout(() => {
        heading.style.transition = "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)"
        heading.style.opacity = "1"
        heading.style.transform = "translateY(0)"
      }, 100)
    }
    
    if (image) {
      image.style.opacity = "0"
      image.style.transform = "scale(0.9)"
      setTimeout(() => {
        image.style.transition = "all 1s cubic-bezier(0.16, 1, 0.3, 1)"
        image.style.opacity = "1"
        image.style.transform = "scale(1)"
      }, 300)
    }
  }, [])

  const scrollToProducts = () => {
    document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#7d39eb]/20 via-transparent to-transparent" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#7d39eb]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-[#c6ff33]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#7d39eb]/50 bg-[#7d39eb]/10 text-sm text-[#c6ff33]">
              <span className="w-2 h-2 rounded-full bg-[#c6ff33] animate-pulse" />
              Nuevo lanzamiento 2024
            </div>
            
            <h1 
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance"
              style={{ fontFamily: "var(--font-orbitron)" }}
            >
              <span className="text-foreground">ESCUCHÁ CADA</span>
              <br />
              <span className="text-[#c6ff33]">DETALLE</span>
              <br />
              <span className="text-foreground">DEL JUEGO</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Auriculares gaming de alto rendimiento con sonido envolvente 7.1, 
              diseñados para darte la ventaja competitiva que necesitás.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button 
                size="lg" 
                className="bg-[#c6ff33] text-black hover:bg-[#c6ff33]/90 text-lg px-8 py-6 font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(198,255,51,0.4)]"
                onClick={scrollToProducts}
              >
                Comprar ahora
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-[#7d39eb] text-[#7d39eb] hover:bg-[#7d39eb]/10 text-lg px-8 py-6"
                onClick={() => document.getElementById("beneficios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Ver características
              </Button>
            </div>
            
            <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-[#c6ff33]" style={{ fontFamily: "var(--font-orbitron)" }}>7.1</p>
                <p className="text-sm text-muted-foreground">Sonido Surround</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[#c6ff33]" style={{ fontFamily: "var(--font-orbitron)" }}>50mm</p>
                <p className="text-sm text-muted-foreground">Drivers</p>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <p className="text-2xl font-bold text-[#c6ff33]" style={{ fontFamily: "var(--font-orbitron)" }}>15h+</p>
                <p className="text-sm text-muted-foreground">Batería</p>
              </div>
            </div>
          </div>
          
          {/* Image */}
          <div ref={imageRef} className="relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#7d39eb]/30 to-[#c6ff33]/10 rounded-full blur-3xl scale-75" />
            <div className="relative w-full max-w-lg aspect-square flex items-center justify-center">
              {/* Headset SVG Illustration */}
              <svg viewBox="0 0 400 400" className="w-full h-full drop-shadow-[0_0_50px_rgba(125,57,235,0.5)]">
                {/* Headband */}
                <path 
                  d="M80 200 Q80 80 200 60 Q320 80 320 200" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="28"
                  className="drop-shadow-lg"
                />
                <path 
                  d="M80 200 Q80 80 200 60 Q320 80 320 200" 
                  fill="none" 
                  stroke="url(#headbandGradient)" 
                  strokeWidth="24"
                />
                
                {/* Inner headband padding */}
                <path 
                  d="M120 195 Q120 110 200 95 Q280 110 280 195" 
                  fill="none" 
                  stroke="#2a2a2a" 
                  strokeWidth="12"
                />
                
                {/* Left Ear Cup */}
                <ellipse cx="80" cy="220" rx="55" ry="70" fill="#1a1a1a" className="drop-shadow-2xl"/>
                <ellipse cx="80" cy="220" rx="50" ry="65" fill="#0a0a0a"/>
                <ellipse cx="80" cy="220" rx="40" ry="52" fill="#1a1a1a"/>
                <ellipse cx="80" cy="220" rx="32" ry="42" fill="#0a0a0a"/>
                {/* Purple accent */}
                <ellipse cx="80" cy="220" rx="25" ry="32" fill="none" stroke="#7d39eb" strokeWidth="2" opacity="0.8"/>
                <circle cx="80" cy="220" r="8" fill="#7d39eb" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
                </circle>
                
                {/* Right Ear Cup */}
                <ellipse cx="320" cy="220" rx="55" ry="70" fill="#1a1a1a" className="drop-shadow-2xl"/>
                <ellipse cx="320" cy="220" rx="50" ry="65" fill="#0a0a0a"/>
                <ellipse cx="320" cy="220" rx="40" ry="52" fill="#1a1a1a"/>
                <ellipse cx="320" cy="220" rx="32" ry="42" fill="#0a0a0a"/>
                {/* Green accent */}
                <ellipse cx="320" cy="220" rx="25" ry="32" fill="none" stroke="#c6ff33" strokeWidth="2" opacity="0.8"/>
                <circle cx="320" cy="220" r="8" fill="#c6ff33" opacity="0.6">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="0.5s"/>
                </circle>
                
                {/* Microphone */}
                <path d="M35 240 Q10 250 15 290" fill="none" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round"/>
                <ellipse cx="15" cy="295" rx="8" ry="12" fill="#1a1a1a"/>
                <ellipse cx="15" cy="295" rx="5" ry="8" fill="#c6ff33" opacity="0.3"/>
                
                {/* RGB Strips */}
                <path d="M45 170 L55 155" stroke="#7d39eb" strokeWidth="3" strokeLinecap="round" opacity="0.8">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite"/>
                </path>
                <path d="M345 170 L355 155" stroke="#c6ff33" strokeWidth="3" strokeLinecap="round" opacity="0.8">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin="0.75s"/>
                </path>
                
                <defs>
                  <linearGradient id="headbandGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7d39eb"/>
                    <stop offset="50%" stopColor="#1a1a1a"/>
                    <stop offset="100%" stopColor="#c6ff33"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <button 
        onClick={scrollToProducts}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-[#c6ff33] transition-colors cursor-pointer"
        aria-label="Desplazarse hacia abajo"
      >
        <span className="text-sm">Descubrí más</span>
        <ChevronDown className="w-6 h-6 animate-bounce" />
      </button>
    </section>
  )
}

"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, RotateCcw } from "lucide-react"

const views = [
  { name: "Frontal", angle: 0 },
  { name: "Lateral", angle: 45 },
  { name: "Superior", angle: 90 },
  { name: "Detalle", angle: 135 },
]

const features = [
  { label: "Drivers de 50mm", position: { top: "35%", left: "15%" } },
  { label: "RGB Personalizable", position: { top: "20%", left: "50%" } },
  { label: "Micrófono Retráctil", position: { top: "55%", left: "10%" } },
  { label: "Almohadillas Premium", position: { top: "45%", right: "15%" } },
]

export function ProductShowcase() {
  const [currentView, setCurrentView] = useState(0)
  const [isAutoRotating, setIsAutoRotating] = useState(true)
  const [rotation, setRotation] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3 }
    )
    
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isAutoRotating) return
    
    const interval = setInterval(() => {
      setRotation((prev) => (prev + 0.5) % 360)
    }, 50)
    
    return () => clearInterval(interval)
  }, [isAutoRotating])

  const nextView = () => {
    setCurrentView((prev) => (prev + 1) % views.length)
    setIsAutoRotating(false)
  }

  const prevView = () => {
    setCurrentView((prev) => (prev - 1 + views.length) % views.length)
    setIsAutoRotating(false)
  }

  return (
    <section id="productos" ref={containerRef} className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-[#7d39eb]/10 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#c6ff33] text-sm font-semibold tracking-wider uppercase">Diseño Premium</span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-balance"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-foreground">EXPLORÁ EL </span>
            <span className="text-[#7d39eb]">PRODUCTO</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* 3D Product View */}
          <div 
            className="relative aspect-square max-w-lg mx-auto w-full"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0.9)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#7d39eb]/20 to-[#c6ff33]/10 rounded-full blur-3xl" />
            
            <div 
              className="relative w-full h-full flex items-center justify-center"
              style={{ 
                transform: `perspective(1000px) rotateY(${isAutoRotating ? rotation : views[currentView].angle}deg)`,
                transition: isAutoRotating ? "none" : "transform 0.5s ease-out",
              }}
            >
              {/* Product SVG */}
              <svg viewBox="0 0 400 400" className="w-4/5 h-4/5">
                {/* Headband */}
                <path 
                  d="M80 200 Q80 80 200 60 Q320 80 320 200" 
                  fill="none" 
                  stroke="#1a1a1a" 
                  strokeWidth="28"
                />
                <path 
                  d="M80 200 Q80 80 200 60 Q320 80 320 200" 
                  fill="none" 
                  stroke="url(#showcaseGradient)" 
                  strokeWidth="24"
                />
                
                {/* Inner headband */}
                <path 
                  d="M120 195 Q120 110 200 95 Q280 110 280 195" 
                  fill="none" 
                  stroke="#2a2a2a" 
                  strokeWidth="12"
                />
                
                {/* Left Ear Cup */}
                <ellipse cx="80" cy="220" rx="55" ry="70" fill="#1a1a1a"/>
                <ellipse cx="80" cy="220" rx="50" ry="65" fill="#0a0a0a"/>
                <ellipse cx="80" cy="220" rx="40" ry="52" fill="#1a1a1a"/>
                <ellipse cx="80" cy="220" rx="32" ry="42" fill="#0a0a0a"/>
                <ellipse cx="80" cy="220" rx="25" ry="32" fill="none" stroke="#7d39eb" strokeWidth="3">
                  <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite"/>
                </ellipse>
                
                {/* Right Ear Cup */}
                <ellipse cx="320" cy="220" rx="55" ry="70" fill="#1a1a1a"/>
                <ellipse cx="320" cy="220" rx="50" ry="65" fill="#0a0a0a"/>
                <ellipse cx="320" cy="220" rx="40" ry="52" fill="#1a1a1a"/>
                <ellipse cx="320" cy="220" rx="32" ry="42" fill="#0a0a0a"/>
                <ellipse cx="320" cy="220" rx="25" ry="32" fill="none" stroke="#c6ff33" strokeWidth="3">
                  <animate attributeName="stroke-opacity" values="0.5;1;0.5" dur="2s" repeatCount="indefinite" begin="1s"/>
                </ellipse>
                
                {/* Microphone */}
                <path d="M35 240 Q10 250 15 290" fill="none" stroke="#2a2a2a" strokeWidth="6" strokeLinecap="round"/>
                <ellipse cx="15" cy="295" rx="8" ry="12" fill="#1a1a1a"/>
                <circle cx="15" cy="295" r="4" fill="#c6ff33" opacity="0.5"/>
                
                <defs>
                  <linearGradient id="showcaseGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7d39eb"/>
                    <stop offset="50%" stopColor="#2a2a2a"/>
                    <stop offset="100%" stopColor="#c6ff33"/>
                  </linearGradient>
                </defs>
              </svg>
            </div>

            {/* Feature Labels */}
            {features.map((feature, index) => (
              <div
                key={index}
                className="absolute hidden lg:flex items-center gap-2 text-sm animate-pulse"
                style={{ ...feature.position }}
              >
                <div className="w-2 h-2 rounded-full bg-[#c6ff33]" />
                <span className="text-foreground whitespace-nowrap bg-background/80 px-2 py-1 rounded">
                  {feature.label}
                </span>
              </div>
            ))}

            {/* Controls */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4">
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-border hover:border-[#7d39eb] hover:bg-[#7d39eb]/10"
                onClick={prevView}
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-2">
                {views.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      currentView === index ? "bg-[#c6ff33]" : "bg-border"
                    }`}
                    onClick={() => {
                      setCurrentView(index)
                      setIsAutoRotating(false)
                    }}
                    aria-label={`Vista ${index + 1}`}
                  />
                ))}
              </div>
              
              <Button
                size="icon"
                variant="outline"
                className="rounded-full border-border hover:border-[#7d39eb] hover:bg-[#7d39eb]/10"
                onClick={nextView}
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
              
              <Button
                size="icon"
                variant="outline"
                className={`rounded-full border-border ${
                  isAutoRotating ? "bg-[#7d39eb]/20 border-[#7d39eb]" : ""
                }`}
                onClick={() => setIsAutoRotating(!isAutoRotating)}
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Specs */}
          <div 
            className="space-y-8"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "translateX(0)" : "translateX(50px)",
              transition: "all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
            }}
          >
            <div>
              <h3 
                className="text-2xl font-bold text-foreground mb-2"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                PULSE PRO X
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Nuestro modelo insignia diseñado para gamers profesionales y entusiastas 
                que no aceptan compromisos en calidad de audio.
              </p>
            </div>

            <div className="space-y-4">
              {[
                { label: "Respuesta de Frecuencia", value: "20Hz - 40kHz" },
                { label: "Impedancia", value: "32 Ohm" },
                { label: "Sensibilidad", value: "118dB SPL/mW" },
                { label: "Peso", value: "320g" },
                { label: "Conectividad", value: "2.4GHz / Bluetooth 5.3 / USB-C" },
              ].map((spec, index) => (
                <div 
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-border"
                >
                  <span className="text-muted-foreground">{spec.label}</span>
                  <span className="text-foreground font-semibold">{spec.value}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <div className="flex-1 p-4 rounded-xl bg-[#7d39eb]/10 border border-[#7d39eb]/30 text-center">
                <p className="text-[#7d39eb] font-bold text-xl" style={{ fontFamily: "var(--font-orbitron)" }}>2 AÑOS</p>
                <p className="text-sm text-muted-foreground">Garantía</p>
              </div>
              <div className="flex-1 p-4 rounded-xl bg-[#c6ff33]/10 border border-[#c6ff33]/30 text-center">
                <p className="text-[#c6ff33] font-bold text-xl" style={{ fontFamily: "var(--font-orbitron)" }}>GRATIS</p>
                <p className="text-sm text-muted-foreground">Envío</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

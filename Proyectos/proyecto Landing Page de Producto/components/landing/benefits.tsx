"use client"

import { useEffect, useRef, useState } from "react"
import { Headphones, Mic, Shield, Zap, Volume2, Wifi } from "lucide-react"

const benefits = [
  {
    icon: Volume2,
    title: "Sonido Envolvente 7.1",
    description: "Escuchá cada paso enemigo con precisión milimétrica. El audio posicional te da ventaja competitiva real.",
    color: "#7d39eb",
  },
  {
    icon: Mic,
    title: "Micrófono con Cancelación de Ruido",
    description: "Tu voz se escucha clara y nítida. Eliminá el ruido de fondo y comunicá estrategias sin interrupciones.",
    color: "#c6ff33",
  },
  {
    icon: Headphones,
    title: "Almohadillas Memory Foam",
    description: "Comodidad extrema para sesiones de más de 10 horas. Espuma viscoelástica que se adapta a vos.",
    color: "#7d39eb",
  },
  {
    icon: Zap,
    title: "Latencia Ultra Baja",
    description: "Conexión inalámbrica de 2.4GHz con menos de 20ms de latencia. Reaccioná más rápido que tu oponente.",
    color: "#c6ff33",
  },
  {
    icon: Shield,
    title: "Construcción Premium",
    description: "Aluminio y acero reforzado. Diseñado para resistir el uso intensivo del gaming competitivo.",
    color: "#7d39eb",
  },
  {
    icon: Wifi,
    title: "Multi-Plataforma",
    description: "Compatible con PC, PlayStation, Xbox, Switch y móviles. Un auricular para todos tus dispositivos.",
    color: "#c6ff33",
  },
]

export function Benefits() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            if (!isNaN(index)) {
              setVisibleItems((prev) => [...new Set([...prev, index])])
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -50px 0px" }
    )

    const items = sectionRef.current?.querySelectorAll("[data-index]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="beneficios" ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7d39eb]/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#c6ff33]/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#7d39eb] text-sm font-semibold tracking-wider uppercase">Por qué elegirnos</span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-balance"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-foreground">VENTAJA </span>
            <span className="text-[#c6ff33]">COMPETITIVA</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg leading-relaxed">
            Cada característica está diseñada para mejorar tu rendimiento en el juego. 
            No son solo especificaciones, son ventajas reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isVisible = visibleItems.includes(index)
            
            return (
              <div
                key={index}
                data-index={index}
                className="group relative p-6 rounded-2xl bg-card border border-border hover:border-[#7d39eb]/50 transition-all duration-500 hover:scale-[1.02]"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{ 
                    background: `radial-gradient(circle at center, ${benefit.color}15 0%, transparent 70%)`,
                    filter: "blur(20px)",
                  }}
                />
                
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${benefit.color}20` }}
                >
                  <Icon className="w-7 h-7" style={{ color: benefit.color }} />
                </div>
                
                <h3 
                  className="text-xl font-bold mb-3 text-foreground"
                  style={{ fontFamily: "var(--font-orbitron)" }}
                >
                  {benefit.title}
                </h3>
                
                <p className="text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Lightbulb, GraduationCap } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const highlights = [
    { icon: Code, text: "Desarrollo Frontend" },
    { icon: Palette, text: "Diseño de Interfaces" },
    { icon: Lightbulb, text: "Experiencias Interactivas" },
    { icon: GraduationCap, text: "Tecnología Informática" },
  ]

  return (
    <section
      ref={sectionRef}
      id="sobre-mi"
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left side - Visual element */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-3xl transform rotate-3" />
              <div className="relative bg-card rounded-3xl p-8 border border-border">
                <div className="grid grid-cols-2 gap-4">
                  {highlights.map((item, index) => (
                    <div
                      key={index}
                      className={`flex flex-col items-center justify-center p-6 rounded-2xl bg-background/50 border border-border/50 transition-all duration-500 hover:border-primary/50 hover:bg-primary/5 ${
                        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
                      }`}
                      style={{ transitionDelay: `${index * 150}ms` }}
                    >
                      <item.icon className="w-8 h-8 text-primary mb-3" />
                      <span className="text-sm text-center text-foreground font-medium">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
              Sobre mí
            </h2>
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
              Desarrolladora Web en Formación
            </h3>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Soy desarrolladora web en formación con enfoque en frontend, diseño de 
                interfaces y experiencias interactivas.
              </p>
              <p>
                Me interesa crear sitios modernos, funcionales y visualmente atractivos 
                utilizando <span className="text-primary font-medium">HTML</span>, 
                <span className="text-primary font-medium"> CSS</span> y 
                <span className="text-primary font-medium"> JavaScript</span>.
              </p>
              <p>
                Además, tengo experiencia en marketing digital y gestión de redes, lo que 
                me permite entender cómo deben diseñarse las interfaces para conectar con 
                usuarios reales.
              </p>
              <p>
                Actualmente estudio <span className="text-foreground font-medium">Gestión en Tecnología Informática</span>, 
                combinando desarrollo, tecnología y estrategia digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

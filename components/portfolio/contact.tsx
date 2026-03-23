"use client"

import { useEffect, useRef, useState } from "react"
import { Mail, Phone } from "lucide-react"

export function Contact() {
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

  return (
    <section
      ref={sectionRef}
      id="contacto"
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <div
          className={`text-center transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Section header */}
          <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Contacto
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 text-balance">
            Trabajemos juntos
          </h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Si tenés un proyecto web o una idea digital, podemos convertirla en una experiencia interactiva.
          </p>

          {/* Contact info */}
          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Email */}
            <div className="flex items-center gap-3 bg-card border border-border px-6 py-4 rounded-full">
              <Mail className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">agustina.binaa@gmail.com</span>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-3 bg-card border border-border px-6 py-4 rounded-full">
              <Phone className="w-5 h-5 text-primary" />
              <span className="text-foreground font-medium">+54 9 1154095537</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

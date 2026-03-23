"use client"

import { useEffect, useRef, useState } from "react"
import { Lightbulb, PenTool, Code, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Lightbulb,
    title: "Idea",
    description: "Análisis de necesidades y definición del proyecto",
  },
  {
    number: "02",
    icon: PenTool,
    title: "Diseño de Interfaz",
    description: "Creación del diseño visual y experiencia de usuario",
  },
  {
    number: "03",
    icon: Code,
    title: "Desarrollo Frontend",
    description: "Implementación con HTML, CSS y JavaScript",
  },
  {
    number: "04",
    icon: CheckCircle,
    title: "Pruebas y Optimización",
    description: "Testing, mejoras de rendimiento y despliegue",
  },
]

export function Process() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>(new Array(steps.length).fill(false))
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const sectionRef = useRef<HTMLElement>(null)
  const [headerVisible, setHeaderVisible] = useState(false)

  useEffect(() => {
    const headerObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeaderVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      headerObserver.observe(sectionRef.current)
    }

    const stepObservers = stepsRef.current.map((step, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleSteps((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        },
        { threshold: 0.3 }
      )

      if (step) {
        observer.observe(step)
      }

      return observer
    })

    return () => {
      headerObserver.disconnect()
      stepObservers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section ref={sectionRef} id="proceso" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Mi Proceso
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Cómo trabajo
          </h3>
        </div>

        {/* Process steps */}
        <div className="relative">
          {/* Connection line (desktop) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2" />

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                ref={(el) => { stepsRef.current[index] = el }}
                className={`relative transition-all duration-700 ${
                  visibleSteps[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                {/* Card */}
                <div className="group bg-card rounded-2xl border border-border p-6 text-center transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5">
                  {/* Step number */}
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-background px-3">
                    <span className="text-xs font-bold text-primary">{step.number}</span>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                    <step.icon className="w-8 h-8 text-primary" />
                  </div>

                  {/* Title */}
                  <h4 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h4>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

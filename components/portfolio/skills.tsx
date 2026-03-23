"use client"

import { useEffect, useRef, useState } from "react"
import { Code, Palette, Wrench, Globe } from "lucide-react"

interface SkillCategory {
  title: string
  icon: React.ElementType
  skills: string[]
}

const skillCategories: SkillCategory[] = [
  {
    title: "Desarrollo Web",
    icon: Code,
    skills: ["HTML", "CSS", "JavaScript", "JSON"],
  },
  {
    title: "Diseño de Interfaces",
    icon: Palette,
    skills: ["UI Design", "UX Thinking", "Diseño Visual", "Responsive Design"],
  },
  {
    title: "Herramientas",
    icon: Wrench,
    skills: ["Canva", "Photoshop", "CapCut", "Notion", "Trello"],
  },
  {
    title: "Conocimiento Digital",
    icon: Globe,
    skills: ["Estrategia Digital", "Análisis de Métricas", "Gestión de Redes"],
  },
]

export function Skills() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(skillCategories.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observers = cardsRef.current.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => {
              const next = [...prev]
              next[index] = true
              return next
            })
          }
        },
        { threshold: 0.2 }
      )

      if (card) {
        observer.observe(card)
      }

      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section id="habilidades" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Habilidades
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Lo que sé hacer
          </h3>
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className={`group relative bg-card rounded-2xl border border-border p-6 transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-110">
                <category.icon className="w-7 h-7 text-primary" />
              </div>

              {/* Title */}
              <h4 className="text-lg font-semibold text-foreground mb-4">
                {category.title}
              </h4>

              {/* Skills list */}
              <ul className="space-y-2">
                {category.skills.map((skill) => (
                  <li
                    key={skill}
                    className="flex items-center gap-2 text-muted-foreground text-sm"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    {skill}
                  </li>
                ))}
              </ul>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

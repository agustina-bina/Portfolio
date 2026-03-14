"use client"

import { useEffect, useRef, useState } from "react"
import { ExternalLink, FolderOpen } from "lucide-react"

interface Project {
  title: string
  description: string
  folder: string
}

const projects: Project[] = [
  {
    title: "La Parte INvisible",
    description: "Proyecto creativo con enfoque en experiencia visual.",
    folder: "La Parte INvisible",
  },
  {
    title: "Landing Page de Producto",
    description: "Página de aterrizaje optimizada para conversión.",
    folder: "proyecto Landing Page de Producto",
  },
  {
    title: "Web para Negocio Local",
    description: "Sitio web completo para negocios locales.",
    folder: "Web para negocio local",
  },
  {
    title: "Blog Dinámico",
    description: "Un blog con contenido dinámico y diseño moderno.",
    folder: "Blog dinámico",
  },
  {
    title: "Aplicación de Lista de Tareas",
    description: "Gestiona tus tareas diarias con esta app interactiva y funcional.",
    folder: "Aplicación de lista de tareas",
  },
  {
    title: "Buscador de Productos",
    description: "Encuentra productos de manera rápida con filtros avanzados.",
    folder: "Buscador de productos",
  },
  {
    title: "Comparador de Productos",
    description: "Compara características y precios de diferentes productos.",
    folder: "Comparador de productos",
  },
  {
    title: "Dashboard de Métricas",
    description: "Visualiza datos y métricas en tiempo real.",
    folder: "Dashboard de métricas",
  },
  {
    title: "Generador de Presupuestos",
    description: "Crea presupuestos personalizados de forma automatizada.",
    folder: "Generador de presupuestos",
  },
  {
    title: "Mini E-commerce",
    description: "Tienda online con carrito de compras funcional.",
    folder: "Mini e-commerce",
  },
  {
    title: "Quiz Interactivo",
    description: "Cuestionario dinámico con resultados instantáneos.",
    folder: "Quiz interactivo",
  },
]

export function Projects() {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(new Array(projects.length).fill(false))
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])
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

    const cardObservers = cardsRef.current.map((card, index) => {
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
        { threshold: 0.1 }
      )

      if (card) {
        observer.observe(card)
      }

      return observer
    })

    return () => {
      headerObserver.disconnect()
      cardObservers.forEach((observer) => observer.disconnect())
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="proyectos"
      className="py-24 md:py-32 bg-secondary/30"
    >
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-sm uppercase tracking-widest text-primary font-semibold mb-3">
            Portfolio
          </h2>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Proyectos Web
          </h3>
        </div>

        {/* Projects grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.title}
              ref={(el) => { cardsRef.current[index] = el }}
              className={`group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-2 ${
                visibleCards[index] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${(index % 6) * 100}ms` }}
            >
              {/* Project preview area */}
              <div className="h-40 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center relative overflow-hidden">
                <FolderOpen className="w-16 h-16 text-primary/30 transition-transform duration-500 group-hover:scale-110" />
                
                {/* Decorative elements */}
                <div className="absolute top-3 left-3 flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                  <div className="w-3 h-3 rounded-full bg-muted-foreground/20" />
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* View project button */}
                <a
                  href={`./${project.folder}/index.html`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors group/link"
                >
                  Ver proyecto
                  <ExternalLink className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

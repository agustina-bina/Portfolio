"use client"

import { useEffect, useRef, useState } from "react"
import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Martín G.",
    role: "Jugador Competitivo",
    avatar: "MG",
    rating: 5,
    text: "Increíble calidad de sonido. Puedo escuchar cada paso enemigo antes de que aparezca. Mi K/D mejoró notablemente.",
    game: "Valorant",
  },
  {
    name: "Lucía R.",
    role: "Streamer",
    avatar: "LR",
    rating: 5,
    text: "El micrófono es perfecto para streaming. Mis viewers notan la diferencia de audio inmediatamente. Super cómodos para sesiones largas.",
    game: "Streaming",
  },
  {
    name: "Diego M.",
    role: "Gamer Casual",
    avatar: "DM",
    rating: 5,
    text: "La mejor inversión gaming que hice. El sonido 7.1 hace que los juegos se sientan completamente diferentes.",
    game: "Call of Duty",
  },
  {
    name: "Valentina S.",
    role: "Jugadora Pro",
    avatar: "VS",
    rating: 5,
    text: "Los uso para entrenamientos de 8 horas y siguen siendo cómodos. El audio posicional es exacto, ideal para torneos.",
    game: "CS2",
  },
  {
    name: "Nicolás P.",
    role: "Content Creator",
    avatar: "NP",
    rating: 4,
    text: "Excelente relación calidad-precio. La cancelación de ruido del mic es real, no marketing. Muy recomendados.",
    game: "Fortnite",
  },
  {
    name: "Camila T.",
    role: "Gamer Entusiasta",
    avatar: "CT",
    rating: 5,
    text: "Probé muchos auriculares gaming y estos son los mejores en este rango de precio. El build quality es premium.",
    game: "Apex Legends",
  },
]

export function Reviews() {
  const [visibleReviews, setVisibleReviews] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-review"))
            if (!isNaN(index)) {
              setVisibleReviews((prev) => [...new Set([...prev, index])])
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    const items = sectionRef.current?.querySelectorAll("[data-review]")
    items?.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-card relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#c6ff33]/5 via-transparent to-transparent" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="text-[#c6ff33] text-sm font-semibold tracking-wider uppercase">Testimonios</span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-balance"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-foreground">LO QUE DICEN </span>
            <span className="text-[#7d39eb]">NUESTROS GAMERS</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Miles de jugadores ya mejoraron su experiencia de juego con PULSE.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {[
            { value: "4.9", label: "Calificación promedio", suffix: "/5" },
            { value: "15K+", label: "Unidades vendidas", suffix: "" },
            { value: "98%", label: "Clientes satisfechos", suffix: "" },
            { value: "50+", label: "Premios gaming", suffix: "" },
          ].map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-xl bg-background/50 border border-border"
            >
              <p 
                className="text-3xl md:text-4xl font-bold text-[#c6ff33]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                {stat.value}<span className="text-lg">{stat.suffix}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review, index) => {
            const isVisible = visibleReviews.includes(index)
            
            return (
              <div
                key={index}
                data-review={index}
                className="p-6 rounded-2xl bg-background border border-border hover:border-[#7d39eb]/50 transition-all duration-500 group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(30px)",
                  transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
                }}
              >
                <Quote className="w-8 h-8 text-[#7d39eb]/30 mb-4" />
                
                <p className="text-foreground leading-relaxed mb-6">
                  {`"${review.text}"`}
                </p>

                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? "fill-[#c6ff33] text-[#c6ff33]" : "text-border"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3">
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ 
                      backgroundColor: index % 2 === 0 ? "#7d39eb" : "#c6ff33",
                      color: index % 2 === 0 ? "#fff" : "#000",
                    }}
                  >
                    {review.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.role} • {review.game}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

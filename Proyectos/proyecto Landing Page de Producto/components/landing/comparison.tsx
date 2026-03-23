"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Crown } from "lucide-react"

const models = [
  {
    id: "lite",
    name: "PULSE LITE",
    price: 79,
    originalPrice: 99,
    description: "Ideal para empezar",
    color: "#ffffff",
    popular: false,
    features: {
      sonido: "Stereo",
      drivers: "40mm",
      microfono: "Básico",
      almohadillas: "Foam",
      bateria: "8h",
      conexion: "USB / 3.5mm",
      rgb: false,
      cancelacion: false,
      surround: false,
    },
  },
  {
    id: "pro",
    name: "PULSE PRO",
    price: 149,
    originalPrice: 199,
    description: "El más vendido",
    color: "#7d39eb",
    popular: true,
    features: {
      sonido: "7.1 Surround",
      drivers: "50mm",
      microfono: "Cancelación de ruido",
      almohadillas: "Memory Foam",
      bateria: "15h",
      conexion: "2.4GHz / USB-C",
      rgb: true,
      cancelacion: true,
      surround: true,
    },
  },
  {
    id: "elite",
    name: "PULSE ELITE",
    price: 229,
    originalPrice: 299,
    description: "Para profesionales",
    color: "#c6ff33",
    popular: false,
    features: {
      sonido: "7.1 Hi-Res",
      drivers: "53mm Planar",
      microfono: "Studio Grade",
      almohadillas: "Cuero + Gel",
      bateria: "20h",
      conexion: "2.4GHz / BT 5.3 / USB-C",
      rgb: true,
      cancelacion: true,
      surround: true,
    },
  },
]

const featureLabels: Record<string, string> = {
  sonido: "Tipo de Sonido",
  drivers: "Drivers",
  microfono: "Micrófono",
  almohadillas: "Almohadillas",
  bateria: "Batería",
  conexion: "Conectividad",
  rgb: "RGB",
  cancelacion: "Cancelación Ruido",
  surround: "Surround Virtual",
}

export function Comparison() {
  const [selectedModel, setSelectedModel] = useState("pro")
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.2 }
    )
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }
    
    return () => observer.disconnect()
  }, [])

  const selected = models.find((m) => m.id === selectedModel)

  return (
    <section ref={sectionRef} className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7d39eb]/50 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-[#7d39eb] text-sm font-semibold tracking-wider uppercase">Modelos</span>
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-balance"
            style={{ fontFamily: "var(--font-orbitron)" }}
          >
            <span className="text-foreground">ELEGÍ TU </span>
            <span className="text-[#c6ff33]">MODELO</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            Tres opciones diseñadas para diferentes necesidades y presupuestos.
          </p>
        </div>

        {/* Model Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {models.map((model, index) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`relative p-6 rounded-2xl text-left transition-all duration-500 ${
                selectedModel === model.id
                  ? "bg-card border-2 scale-[1.02]"
                  : "bg-card/50 border border-border hover:border-[#7d39eb]/50"
              }`}
              style={{
                borderColor: selectedModel === model.id ? model.color : undefined,
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? selectedModel === model.id ? "scale(1.02)" : "scale(1)" 
                  : "translateY(30px)",
                transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.1}s`,
              }}
            >
              {model.popular && (
                <div 
                  className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ backgroundColor: model.color, color: "#000" }}
                >
                  <Crown className="w-3 h-3" />
                  Más vendido
                </div>
              )}
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-orbitron)", color: model.color }}
                  >
                    {model.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{model.description}</p>
                </div>
                <div 
                  className={`w-4 h-4 rounded-full border-2 ${
                    selectedModel === model.id ? "bg-current" : ""
                  }`}
                  style={{ borderColor: model.color, color: model.color }}
                />
              </div>
              
              <div className="flex items-baseline gap-2 mt-4">
                <span 
                  className="text-3xl font-bold"
                  style={{ fontFamily: "var(--font-orbitron)", color: model.color }}
                >
                  ${model.price}
                </span>
                <span className="text-muted-foreground line-through text-sm">
                  ${model.originalPrice}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Comparison Table */}
        <div 
          className="rounded-2xl border border-border overflow-hidden bg-card"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? "translateY(0)" : "translateY(30px)",
            transition: "all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
          }}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-4 text-muted-foreground font-medium">Característica</th>
                  {models.map((model) => (
                    <th 
                      key={model.id} 
                      className={`p-4 text-center font-bold transition-colors ${
                        selectedModel === model.id ? "bg-[#7d39eb]/10" : ""
                      }`}
                      style={{ 
                        fontFamily: "var(--font-orbitron)",
                        color: model.color,
                      }}
                    >
                      {model.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.keys(featureLabels).map((key, index) => (
                  <tr 
                    key={key} 
                    className={index < Object.keys(featureLabels).length - 1 ? "border-b border-border" : ""}
                  >
                    <td className="p-4 text-muted-foreground">{featureLabels[key]}</td>
                    {models.map((model) => {
                      const value = model.features[key as keyof typeof model.features]
                      const isBoolean = typeof value === "boolean"
                      
                      return (
                        <td 
                          key={model.id} 
                          className={`p-4 text-center transition-colors ${
                            selectedModel === model.id ? "bg-[#7d39eb]/10" : ""
                          }`}
                        >
                          {isBoolean ? (
                            value ? (
                              <Check className="w-5 h-5 mx-auto text-[#c6ff33]" />
                            ) : (
                              <X className="w-5 h-5 mx-auto text-muted-foreground/50" />
                            )
                          ) : (
                            <span className="text-foreground">{value}</span>
                          )}
                        </td>
                      )
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Model CTA */}
        {selected && (
          <div 
            className="mt-8 text-center"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: "opacity 0.6s ease 0.5s",
            }}
          >
            <Button 
              size="lg" 
              className="bg-[#c6ff33] text-black hover:bg-[#c6ff33]/90 text-lg px-12 py-6 font-semibold transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(198,255,51,0.4)]"
            >
              Comprar {selected.name} - ${selected.price}
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}

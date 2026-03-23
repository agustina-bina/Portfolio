"use client"

import { useEffect, useState, useRef } from "react"
import { ArrowDown } from "lucide-react"

export function Hero() {
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [showCursor, setShowCursor] = useState(true)
  const [isVisible, setIsVisible] = useState(false)
  const fullText = "Frontend Web Developer"

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Typing effect
  useEffect(() => {
    if (isTyping && displayText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(fullText.slice(0, displayText.length + 1))
      }, 100)
      return () => clearTimeout(timeout)
    } else if (displayText.length === fullText.length) {
      setIsTyping(false)
    }
  }, [displayText, isTyping])

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)
    return () => clearInterval(interval)
  }, [])

  const scrollToProjects = () => {
    const projectsSection = document.getElementById("proyectos")
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-pulse delay-500" />
        
        {/* Floating code elements */}
        <div className="absolute top-1/4 left-[15%] text-primary/20 text-6xl font-mono animate-float">{"<"}</div>
        <div className="absolute top-1/3 right-[20%] text-primary/20 text-4xl font-mono animate-float-delayed">{"/>"}</div>
        <div className="absolute bottom-1/4 left-[25%] text-primary/20 text-5xl font-mono animate-float">{"{ }"}</div>
        <div className="absolute bottom-1/3 right-[15%] text-primary/20 text-3xl font-mono animate-float-delayed">{"</>"}</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-foreground mb-4 tracking-tight">
            Agustina{" "}
            <span className="text-primary">Bina</span>
          </h1>

          {/* Role with typing effect */}
          <div className="h-12 md:h-14 mb-6 flex items-center justify-center">
            <span className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-medium">
              {displayText}
              <span
                className={`inline-block w-0.5 h-6 md:h-8 bg-primary ml-1 ${
                  showCursor ? "opacity-100" : "opacity-0"
                }`}
              />
            </span>
          </div>

          {/* Subtitle */}
          <p
            className={`text-base md:text-lg text-muted-foreground mb-4 transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Estudiante de Gestión en Tecnología Informática
          </p>

          {/* Description */}
          <p
            className={`text-lg md:text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Diseño y desarrollo experiencias web interactivas combinando creatividad, 
            tecnología y una visión estratégica del mundo digital.
          </p>

          {/* CTA Button */}
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-primary/90 hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Ver proyectos
              <ArrowDown className="w-5 h-5 transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-scroll" />
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-5deg); }
        }
        @keyframes scroll {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.5; transform: translateY(6px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-scroll {
          animation: scroll 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}

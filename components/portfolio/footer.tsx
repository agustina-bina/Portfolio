"use client"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h4 className="text-xl font-bold text-foreground mb-1">
              Agustina <span className="text-primary">Bina</span>
            </h4>
            <p className="text-sm text-muted-foreground">
              Frontend Web Developer
            </p>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Agustina Bina
            </p>
            <p className="text-xs text-muted-foreground/70">
              Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

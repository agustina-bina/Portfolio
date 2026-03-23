export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="text-lg font-semibold tracking-wide mb-4">BELLE BEAUTY</h2>
            <p className="text-sm text-primary-foreground/80">
              Tu destino para productos de belleza de alta calidad. Cuidado personal que te hace brillar.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-medium mb-4">Categorías</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><span className="hover:text-primary-foreground cursor-pointer">Skincare</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Maquillaje</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Cabello</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Fragancias</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Cuidado Corporal</span></li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h3 className="font-medium mb-4">Información</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li><span className="hover:text-primary-foreground cursor-pointer">Sobre Nosotros</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Contacto</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Envíos</span></li>
              <li><span className="hover:text-primary-foreground cursor-pointer">Devoluciones</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Contacto</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li>info@bellebeauty.com</li>
              <li>+1 (555) 123-4567</li>
              <li>Lun - Vie: 9:00 - 18:00</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Belle Beauty. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}

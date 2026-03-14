"use client"

import Link from "next/link"
import { Instagram, Twitter, Youtube, Twitch, Mail, MapPin, Phone } from "lucide-react"

const footerLinks = {
  productos: [
    { label: "PULSE Lite", href: "#" },
    { label: "PULSE Pro", href: "#" },
    { label: "PULSE Elite", href: "#" },
    { label: "Accesorios", href: "#" },
  ],
  soporte: [
    { label: "Centro de ayuda", href: "#" },
    { label: "Garantía", href: "#" },
    { label: "Devoluciones", href: "#" },
    { label: "Contacto", href: "#" },
  ],
  empresa: [
    { label: "Sobre nosotros", href: "#" },
    { label: "Carreras", href: "#" },
    { label: "Prensa", href: "#" },
    { label: "Blog", href: "#" },
  ],
  legal: [
    { label: "Términos de servicio", href: "#" },
    { label: "Política de privacidad", href: "#" },
    { label: "Cookies", href: "#" },
  ],
}

const socialLinks = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Youtube, href: "#", label: "YouTube" },
  { icon: Twitch, href: "#", label: "Twitch" },
]

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="inline-block">
              <span 
                className="text-2xl font-bold text-[#c6ff33]"
                style={{ fontFamily: "var(--font-orbitron)" }}
              >
                PULSE
              </span>
            </Link>
            <p className="text-muted-foreground mt-4 max-w-xs leading-relaxed">
              Auriculares gaming de alto rendimiento diseñados para darte la ventaja competitiva.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-[#7d39eb] hover:text-white transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Productos</h3>
            <ul className="space-y-3">
              {footerLinks.productos.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-[#c6ff33] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Soporte</h3>
            <ul className="space-y-3">
              {footerLinks.soporte.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-[#c6ff33] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Empresa</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="text-muted-foreground hover:text-[#c6ff33] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4 text-[#7d39eb]" />
                <span>info@pulse.gaming</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4 text-[#7d39eb]" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4 text-[#7d39eb] mt-0.5" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Métodos de pago:</span>
              <div className="flex gap-2">
                {["Visa", "MC", "AMEX", "MP"].map((method) => (
                  <div 
                    key={method}
                    className="px-3 py-1 bg-secondary rounded text-xs font-medium text-muted-foreground"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              {footerLinks.legal.map((link, index) => (
                <span key={link.label} className="flex items-center gap-4">
                  <Link 
                    href={link.href}
                    className="hover:text-[#c6ff33] transition-colors"
                  >
                    {link.label}
                  </Link>
                  {index < footerLinks.legal.length - 1 && <span>•</span>}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} PULSE Gaming. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}

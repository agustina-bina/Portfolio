import { Navbar } from "@/components/landing/navbar"
import { Hero } from "@/components/landing/hero"
import { Benefits } from "@/components/landing/benefits"
import { ProductShowcase } from "@/components/landing/product-showcase"
import { Comparison } from "@/components/landing/comparison"
import { Reviews } from "@/components/landing/reviews"
import { CTA } from "@/components/landing/cta"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Benefits />
      <ProductShowcase />
      <section id="modelos">
        <Comparison />
      </section>
      <section id="opiniones">
        <Reviews />
      </section>
      <CTA />
      <Footer />
    </main>
  )
}

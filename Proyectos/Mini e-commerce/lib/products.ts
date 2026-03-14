export interface Product {
  id: number
  nombre: string
  categoria: "skincare" | "maquillaje" | "cabello" | "fragancias" | "cuidado-corporal"
  precio: number
  imagen: string
  descripcion: string
  beneficios: string[]
  ingredientes: string[]
}

export const products: Product[] = [
  {
    id: 1,
    nombre: "Sérum Vitamina C",
    categoria: "skincare",
    precio: 45,
    imagen: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    descripcion: "Sérum antioxidante que ilumina y mejora la textura de la piel, reduciendo manchas y líneas finas.",
    beneficios: ["Ilumina la piel", "Reduce manchas", "Mejora la textura", "Protección antioxidante"],
    ingredientes: ["Vitamina C 15%", "Ácido Hialurónico", "Vitamina E", "Ácido Ferúlico"]
  },
  {
    id: 2,
    nombre: "Crema Hidratante Intensiva",
    categoria: "skincare",
    precio: 38,
    imagen: "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop",
    descripcion: "Crema rica en nutrientes que proporciona hidratación profunda durante 72 horas.",
    beneficios: ["Hidratación profunda", "Suaviza la piel", "Reduce arrugas", "Barrera protectora"],
    ingredientes: ["Ácido Hialurónico", "Ceramidas", "Manteca de Karité", "Escualano"]
  },
  {
    id: 3,
    nombre: "Limpiador Facial Suave",
    categoria: "skincare",
    precio: 28,
    imagen: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=400&fit=crop",
    descripcion: "Limpiador en gel suave que elimina impurezas sin resecar la piel.",
    beneficios: ["Limpieza profunda", "No reseca", "Para todo tipo de piel", "Equilibra el pH"],
    ingredientes: ["Aloe Vera", "Glicerina", "Extracto de Camomila", "Niacinamida"]
  },
  {
    id: 4,
    nombre: "Base Líquida Natural",
    categoria: "maquillaje",
    precio: 42,
    imagen: "https://images.unsplash.com/photo-1631214524020-7e18db9a8f92?w=400&h=400&fit=crop",
    descripcion: "Base de maquillaje ligera con acabado natural y cobertura media buildable.",
    beneficios: ["Acabado natural", "Larga duración", "Hidratante", "SPF 15"],
    ingredientes: ["Vitamina E", "Ácido Hialurónico", "Extracto de Rosa", "Filtros UV"]
  },
  {
    id: 5,
    nombre: "Paleta de Sombras Nude",
    categoria: "maquillaje",
    precio: 52,
    imagen: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop",
    descripcion: "Paleta versátil con 12 tonos nude perfectos para looks naturales y sofisticados.",
    beneficios: ["Alta pigmentación", "Fácil difuminado", "Larga duración", "Vegano"],
    ingredientes: ["Pigmentos minerales", "Vitamina E", "Cera de abeja", "Aceite de jojoba"]
  },
  {
    id: 6,
    nombre: "Labial Mate Aterciopelado",
    categoria: "maquillaje",
    precio: 24,
    imagen: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&h=400&fit=crop",
    descripcion: "Labial de larga duración con acabado mate aterciopelado y fórmula hidratante.",
    beneficios: ["Mate sin resecar", "12 horas de duración", "No transfiere", "Hidratante"],
    ingredientes: ["Aceite de rosa mosqueta", "Vitamina E", "Manteca de cacao", "Pigmentos naturales"]
  },
  {
    id: 7,
    nombre: "Shampoo Reparador",
    categoria: "cabello",
    precio: 26,
    imagen: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop",
    descripcion: "Shampoo nutritivo formulado para cabello seco, dañado o tratado químicamente.",
    beneficios: ["Repara daños", "Nutre profundamente", "Brillo intenso", "Suavidad extrema"],
    ingredientes: ["Keratina", "Aceite de Argán", "Proteínas de seda", "Pantenol"]
  },
  {
    id: 8,
    nombre: "Mascarilla Capilar Intensiva",
    categoria: "cabello",
    precio: 32,
    imagen: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&h=400&fit=crop",
    descripcion: "Tratamiento intensivo que restaura la fibra capilar en solo 3 minutos.",
    beneficios: ["Restauración profunda", "Reduce el frizz", "Facilita el peinado", "Protección térmica"],
    ingredientes: ["Aceite de coco", "Proteínas de quinoa", "Aceite de aguacate", "Biotina"]
  },
  {
    id: 9,
    nombre: "Aceite Capilar Nutritivo",
    categoria: "cabello",
    precio: 35,
    imagen: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    descripcion: "Aceite ligero multiusos que nutre, protege y aporta brillo sin engrasar.",
    beneficios: ["Nutre sin engrasar", "Brillo espejo", "Protección UV", "Controla el frizz"],
    ingredientes: ["Aceite de Argán", "Aceite de jojoba", "Vitamina E", "Filtros solares"]
  },
  {
    id: 10,
    nombre: "Perfume Floral Elegante",
    categoria: "fragancias",
    precio: 89,
    imagen: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=400&fit=crop",
    descripcion: "Fragancia sofisticada con notas florales de jazmín, rosa y un toque de sándalo.",
    beneficios: ["Larga duración", "Aroma sofisticado", "No irritante", "Envase elegante"],
    ingredientes: ["Jazmín", "Rosa de Bulgaria", "Sándalo", "Almizcle blanco"]
  },
  {
    id: 11,
    nombre: "Body Mist Fresco",
    categoria: "fragancias",
    precio: 28,
    imagen: "https://images.unsplash.com/photo-1594035910387-fea47794261f?w=400&h=400&fit=crop",
    descripcion: "Bruma corporal ligera y refrescante perfecta para el uso diario.",
    beneficios: ["Ligera y fresca", "Hidratante", "Ideal para verano", "Uso diario"],
    ingredientes: ["Agua de rosas", "Aloe vera", "Vitamina E", "Extracto de pepino"]
  },
  {
    id: 12,
    nombre: "Crema Corporal Hidratante",
    categoria: "cuidado-corporal",
    precio: 34,
    imagen: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&h=400&fit=crop",
    descripcion: "Crema corporal rica que hidrata profundamente y deja la piel suave como seda.",
    beneficios: ["Hidratación 48h", "Absorción rápida", "Piel sedosa", "Aroma suave"],
    ingredientes: ["Manteca de karité", "Aceite de almendras", "Vitamina E", "Aloe vera"]
  },
  {
    id: 13,
    nombre: "Exfoliante Corporal Natural",
    categoria: "cuidado-corporal",
    precio: 29,
    imagen: "https://images.unsplash.com/photo-1570194065650-d99fb4d8a609?w=400&h=400&fit=crop",
    descripcion: "Exfoliante suave con partículas naturales que elimina células muertas y suaviza.",
    beneficios: ["Exfoliación suave", "Piel renovada", "Estimula circulación", "100% natural"],
    ingredientes: ["Sal marina", "Aceite de coco", "Miel", "Extracto de café"]
  },
  {
    id: 14,
    nombre: "Aceite Corporal Nutritivo",
    categoria: "cuidado-corporal",
    precio: 38,
    imagen: "https://images.unsplash.com/photo-1600428853876-fb62fd36810f?w=400&h=400&fit=crop",
    descripcion: "Aceite seco de rápida absorción que nutre intensamente y deja un brillo sutil.",
    beneficios: ["Nutrición intensa", "Brillo sutil", "Absorción rápida", "Multiusos"],
    ingredientes: ["Aceite de argán", "Aceite de rosa mosqueta", "Vitamina E", "Escualano"]
  },
  {
    id: 15,
    nombre: "Contorno de Ojos Anti-edad",
    categoria: "skincare",
    precio: 55,
    imagen: "https://images.unsplash.com/photo-1617897903246-719242758050?w=400&h=400&fit=crop",
    descripcion: "Tratamiento especializado para reducir ojeras, bolsas y líneas de expresión.",
    beneficios: ["Reduce ojeras", "Disminuye bolsas", "Efecto lifting", "Hidrata la zona"],
    ingredientes: ["Retinol", "Cafeína", "Péptidos", "Vitamina K"]
  },
  {
    id: 16,
    nombre: "Máscara de Pestañas Volumen",
    categoria: "maquillaje",
    precio: 28,
    imagen: "https://images.unsplash.com/photo-1631214500115-598fc2cb8d0a?w=400&h=400&fit=crop",
    descripcion: "Máscara que aporta volumen extremo y definición sin grumos.",
    beneficios: ["Volumen extremo", "Sin grumos", "Larga duración", "Fácil de retirar"],
    ingredientes: ["Cera de abejas", "Pantenol", "Biotina", "Aceite de ricino"]
  }
]

export const categories = [
  { id: "all", nombre: "Todos" },
  { id: "skincare", nombre: "Skincare" },
  { id: "maquillaje", nombre: "Maquillaje" },
  { id: "cabello", nombre: "Cabello" },
  { id: "fragancias", nombre: "Fragancias" },
  { id: "cuidado-corporal", nombre: "Cuidado Corporal" }
] as const

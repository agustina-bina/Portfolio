// Results data and logic
const Results = {
    destinations: {
        playa: {
            title: "🏝️ Playa Tropical",
            description: "Disfrutás del sol, el mar y la tranquilidad. Un destino de playa es perfecto para vos. Te esperan atardeceres increíbles, aguas cristalinas y la mejor oportunidad para relajarte y desconectar del mundo.",
            image: "img/destinations/playa.jpg",
            color: "#00bcd4"
        },
        montaña: {
            title: "🏔️ Aventura en Montaña",
            description: "Tu espíritu aventurero te lleva a las alturas. Las montañas nevadas, el esquí, el trekking y los paisajes épicos son tu elemento. Te esperan cumbres desafiantes y vistas que quitan el aliento.",
            image: "img/destinations/montaña.jpg",
            color: "#607d8b"
        },
        ciudad: {
            title: "🏛️ Ciudad Europea",
            description: "Te encanta la arquitectura, la historia y el buen gusto. Una ciudad europea con calles empedradas, cafés con encanto y monumentos históricos es tu destino ideal. París, Roma o Barcelona te esperan.",
            image: "img/destinations/ciudad.jpg",
            color: "#9c27b0"
        },
        cultural: {
            title: "🎭 Destino Cultural",
            description: "Buscás experiencias que enriquezcan tu mente y alma. Museos, tradiciones locales, gastronomía auténtica y el contacto con otras culturas te fascinan. Cada viaje es un aprendizaje para vos.",
            image: "img/destinations/cultural.jpg",
            color: "#ff9800"
        },
        selva: {
            title: "🌴 Selva y Naturaleza",
            description: "La naturaleza en su estado más puro es tu llamado. La selva, los animales exóticos, los ríos y la biodiversidad te atraen. Ecoturismo y aventura responsable son tu estilo de viaje.",
            image: "img/destinations/selva.jpg",
            color: "#4caf50"
        }
    },

    // Get result data by type
    getDestination(type) {
        return this.destinations[type] || this.destinations.playa;
    }
};

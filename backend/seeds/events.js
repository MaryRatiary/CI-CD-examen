import mongoose from 'mongoose';
import Event from '../models/Event.js';

const events = [
  {
    title: "Cyber Nova Festival 2025",
    description: "Plongez dans un monde de musique électronique futuriste avec hologrammes et performances en réalité augmentée. Une expérience immersive unique avec les meilleurs artistes de la scène électro mondiale.",
    date: new Date("2025-12-31T20:00:00"),
    location: "Neo Paris Arena",
    price: 150,
    totalTickets: 5000,
    availableTickets: 5000,
    image: "https://source.unsplash.com/random/800x600/?cyberpunk,neon",
    category: "Music",
    imageAlt: "Festival de musique futuriste avec effets néon et hologrammes",
    features: ["Hologrammes 3D", "Réalité Augmentée", "Son Spatial"],
    theme: "cyber"
  },
  {
    title: "Tech Horizon Summit 2026",
    description: "Conférence sur les technologies émergentes : IA, quantum computing, et biotechnologie. Rencontrez les visionnaires qui façonnent notre futur.",
    date: new Date("2026-01-15T09:00:00"),
    location: "Quantum Convention Center",
    price: 300,
    totalTickets: 1000,
    availableTickets: 1000,
    image: "https://source.unsplash.com/random/800x600/?technology,future",
    category: "Technology",
    imageAlt: "Summit technologique avec présentations holographiques",
    features: ["Demos IA", "Networking AR", "Labs Virtuels"],
    theme: "tech"
  },
  {
    title: "Bio-Digital Art Exhibition",
    description: "Une fusion révolutionnaire entre l'art numérique et la biologie synthétique. Des installations interactives qui répondent à votre ADN.",
    date: new Date("2025-10-20T10:00:00"),
    location: "Galerie Néo-Synthétique",
    price: 75,
    totalTickets: 200,
    availableTickets: 200,
    image: "https://source.unsplash.com/random/800x600/?digitalart,biotech",
    category: "Art",
    imageAlt: "Exposition d'art bio-numérique interactive",
    features: ["Bio-Interaction", "NFT Exclusifs", "Sculptures ADN"],
    theme: "bio"
  },
  {
    title: "Space Odyssey VR Experience",
    description: "Vivez une simulation spatiale ultra-réaliste en VR. Explorez des planètes lointaines et interagissez avec des formes de vie extraterrestres.",
    date: new Date("2025-11-05T11:00:00"),
    location: "Centre Spatial Virtual",
    price: 200,
    totalTickets: 100,
    availableTickets: 100,
    image: "https://source.unsplash.com/random/800x600/?space,galaxy",
    category: "Entertainment",
    imageAlt: "Expérience de réalité virtuelle spatiale",
    features: ["VR 8K", "Haptic Suit", "IA Guide"],
    theme: "space"
  },
  {
    title: "Neuro Gaming Championship",
    description: "Premier tournoi de jeux vidéo contrôlés par la pensée. Compétition e-sport révolutionnaire avec interface neuronale directe.",
    date: new Date("2025-09-15T14:00:00"),
    location: "Cyber Arena X",
    price: 125,
    totalTickets: 3000,
    availableTickets: 3000,
    image: "https://source.unsplash.com/random/800x600/?gaming,cyberpunk",
    category: "Gaming",
    imageAlt: "Championship de gaming neuronal",
    features: ["Neural Link", "Prix Crypto", "Streaming 3D"],
    theme: "cyber"
  },
  {
    title: "Quantum Fashion Show 2026",
    description: "Défilé de mode avec vêtements intelligents et tissus programmables. La haute couture rencontre la technologie quantique.",
    date: new Date("2026-02-20T19:00:00"),
    location: "Neo Fashion Hub",
    price: 400,
    totalTickets: 500,
    availableTickets: 500,
    image: "https://source.unsplash.com/random/800x600/?fashion,futuristic",
    category: "Fashion",
    imageAlt: "Défilé de mode futuriste avec tissus intelligents",
    features: ["Smart Fabric", "Holo Runway", "AR Shopping"],
    theme: "fashion"
  },
  {
    title: "Drone Racing League Finals",
    description: "Course de drones autonomes avec IA. Les meilleurs pilotes du monde s'affrontent dans un parcours en 3D.",
    date: new Date("2025-08-30T16:00:00"),
    location: "Skyline Arena",
    price: 100,
    totalTickets: 2000,
    availableTickets: 2000,
    image: "https://source.unsplash.com/random/800x600/?drone,racing",
    category: "Sport",
    imageAlt: "Course de drones haute technologie",
    features: ["AI Pilots", "3D Track", "Live Stats AR"],
    theme: "tech"
  },
  {
    title: "Holographic Orchestra Night",
    description: "Concert classique révolutionnaire mélangeant musiciens réels et hologrammes. Une expérience musicale en 4D.",
    date: new Date("2025-12-15T20:00:00"),
    location: "Opéra Numérique",
    price: 180,
    totalTickets: 800,
    availableTickets: 800,
    image: "https://source.unsplash.com/random/800x600/?hologram,orchestra",
    category: "Music",
    imageAlt: "Concert d'orchestre avec hologrammes",
    features: ["4D Sound", "Holo Artists", "Synth Visual"],
    theme: "art"
  },
  {
    title: "Climate Tech Expo 2026",
    description: "Exposition des dernières innovations en matière de technologie climatique. Solutions futuristes pour un monde durable.",
    date: new Date("2026-03-10T10:00:00"),
    location: "Green Tech Center",
    price: 50,
    totalTickets: 1500,
    availableTickets: 1500,
    image: "https://source.unsplash.com/random/800x600/?climatetech,green",
    category: "Technology",
    imageAlt: "Exposition de technologies vertes futuristes",
    features: ["Green Demo", "Carbon Track", "Eco AR"],
    theme: "eco"
  },
  {
    title: "Metaverse Art Festival",
    description: "Festival d'art numérique dans le métaverse. Créez, explorez et collectionnez des œuvres d'art virtuelles uniques.",
    date: new Date("2025-10-01T12:00:00"),
    location: "Virtual Gallery Space",
    price: 85,
    totalTickets: 999999,
    availableTickets: 999999,
    image: "https://source.unsplash.com/random/800x600/?metaverse,digital",
    category: "Art",
    imageAlt: "Festival d'art dans le métaverse",
    features: ["NFT Market", "VR Gallery", "Create Lab"],
    theme: "meta"
  }
];

export const seedEvents = async () => {
  try {
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('✅ Événements ajoutés avec succès');
  } catch (error) {
    console.error('❌ Erreur lors de l\'ajout des événements:', error);
  }
};

export { events };

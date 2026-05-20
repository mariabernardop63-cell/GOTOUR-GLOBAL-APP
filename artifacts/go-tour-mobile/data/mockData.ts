export interface Destination {
  id: string;
  name: string;
  location: string;
  country: string;
  category: string;
  price: number;
  currency: string;
  rating: number;
  reviews: number;
  description: string;
  tags: string[];
  image: string;
  featured?: boolean;
}

export const CATEGORIES = [
  { id: "all", label: "Todos", icon: "globe" },
  { id: "hotels", label: "Hotéis", icon: "grid" },
  { id: "apartments", label: "Apartamentos", icon: "home" },
  { id: "resorts", label: "Resorts", icon: "sun" },
  { id: "guesthouses", label: "Pensões", icon: "users" },
  { id: "camping", label: "Camping", icon: "map-pin" },
  { id: "ecolodges", label: "Eco Lodges", icon: "feather" },
];

export const DESTINATIONS: Destination[] = [
  {
    id: "1",
    name: "Arquipélago de Bazaruto",
    location: "Vilankulo",
    country: "Moçambique",
    category: "resorts",
    price: 350,
    currency: "USD",
    rating: 4.9,
    reviews: 1240,
    description:
      "Um paraíso tropical com dunas de areia branca, lagoas turquesa e recifes de coral. Lar de dugongos e tartarugas marinhas, é um dos destinos mais exclusivos de África.",
    tags: ["Praia", "Snorkeling", "Vida Marinha", "Paraíso"],
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    featured: true,
  },
  {
    id: "2",
    name: "Praia de Tofo",
    location: "Inhambane",
    country: "Moçambique",
    category: "resorts",
    price: 120,
    currency: "USD",
    rating: 4.8,
    reviews: 890,
    description:
      "Famosa pelos seus tubarões-baleia e mantas raias, Tofo é o destino de mergulho de eleição em Moçambique. Ondas perfeitas para surf e pôr do sol deslumbrante.",
    tags: ["Mergulho", "Surf", "Tubarões-baleia"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    featured: true,
  },
  {
    id: "3",
    name: "Parque Nacional de Gorongosa",
    location: "Sofala",
    country: "Moçambique",
    category: "ecolodges",
    price: 180,
    currency: "USD",
    rating: 4.7,
    reviews: 562,
    description:
      "Um dos maiores parques nacionais de África em recuperação, com elefantes, leões, búfalos e uma biodiversidade incrível. Safari autêntico em plena natureza.",
    tags: ["Safari", "Vida Selvagem", "Natureza"],
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
  },
  {
    id: "4",
    name: "Pemba Beach Hotel",
    location: "Pemba",
    country: "Moçambique",
    category: "hotels",
    price: 95,
    currency: "USD",
    rating: 4.5,
    reviews: 432,
    description:
      "Hotel de luxo com vista para a baía de Pemba, uma das maiores do mundo. Piscina infinita, restaurante de frutos do mar e actividades aquáticas.",
    tags: ["Hotel", "Praia", "Luxo"],
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
  },
  {
    id: "5",
    name: "Maputo City Apartments",
    location: "Maputo",
    country: "Moçambique",
    category: "apartments",
    price: 65,
    currency: "USD",
    rating: 4.3,
    reviews: 287,
    description:
      "Apartamentos modernos no coração de Maputo, perto dos melhores restaurantes, museus e da vida nocturna vibrante da capital.",
    tags: ["Cidade", "Moderno", "Central"],
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },
  {
    id: "6",
    name: "Vilankulo Beach Lodge",
    location: "Vilankulo",
    country: "Moçambique",
    category: "guesthouses",
    price: 75,
    currency: "USD",
    rating: 4.6,
    reviews: 198,
    description:
      "Pousada aconchegante com acesso directo à praia, vista para o arquipélago de Bazaruto. Perfeita para mergulho e passeios de dhow.",
    tags: ["Praia", "Snorkeling", "Pôr do Sol"],
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    id: "7",
    name: "Ilha de Moçambique",
    location: "Nampula",
    country: "Moçambique",
    category: "hotels",
    price: 110,
    currency: "USD",
    rating: 4.8,
    reviews: 374,
    description:
      "Património Mundial da UNESCO, a Ilha de Moçambique é um testemunho vivo da história swahili e portuguesa. Arquitectura única, fortes coloniais e praias desertas.",
    tags: ["Património", "História", "Cultura"],
    image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800",
  },
  {
    id: "8",
    name: "Nampula Eco Camp",
    location: "Nampula",
    country: "Moçambique",
    category: "camping",
    price: 35,
    currency: "USD",
    rating: 4.4,
    reviews: 156,
    description:
      "Acampamento ecológico entre formações rochosas gigantes, perto dos famosos inselbergs de granito. Hiking, escalada e noites estreladas.",
    tags: ["Natureza", "Hiking", "Aventura"],
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
  },
];

export const FEATURED_DESTINATIONS = DESTINATIONS.filter((d) => d.featured);
export const RECOMMENDED_DESTINATIONS = DESTINATIONS.slice(0, 5);
export const TRENDING_DESTINATIONS = DESTINATIONS.slice(2, 7);

export interface FeedPost {
  id: string;
  user: { name: string; avatar: string; location: string };
  destination: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
  timeAgo: string;
  liked?: boolean;
}

export const FEED_POSTS: FeedPost[] = [
  {
    id: "p1",
    user: {
      name: "Ana Silva",
      avatar: "https://i.pravatar.cc/100?img=1",
      location: "Maputo",
    },
    destination: "Arquipélago de Bazaruto",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800",
    likes: 234,
    comments: 18,
    caption: "Literalmente o paraíso na terra 🌊 Não há palavras para descrever.",
    timeAgo: "2h atrás",
    liked: false,
  },
  {
    id: "p2",
    user: {
      name: "Carlos Machava",
      avatar: "https://i.pravatar.cc/100?img=3",
      location: "Beira",
    },
    destination: "Parque de Gorongosa",
    image: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800",
    likes: 187,
    comments: 24,
    caption: "Encontro com os leões ao pôr do sol em Gorongosa. Adrenalina pura!",
    timeAgo: "5h atrás",
    liked: true,
  },
  {
    id: "p3",
    user: {
      name: "Fátima Mussa",
      avatar: "https://i.pravatar.cc/100?img=5",
      location: "Inhambane",
    },
    destination: "Praia de Tofo",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800",
    likes: 412,
    comments: 31,
    caption: "Nadei com tubarões-baleia hoje! Experiência de vida. #Tofo #Moçambique",
    timeAgo: "1d atrás",
    liked: false,
  },
];

export interface Message {
  id: string;
  user: { name: string; avatar: string };
  lastMessage: string;
  timeAgo: string;
  unread: number;
}

export const MESSAGES: Message[] = [
  {
    id: "m1",
    user: { name: "Ana Silva", avatar: "https://i.pravatar.cc/100?img=1" },
    lastMessage: "Quando vais ao Bazaruto?",
    timeAgo: "agora",
    unread: 2,
  },
  {
    id: "m2",
    user: { name: "Carlos Machava", avatar: "https://i.pravatar.cc/100?img=3" },
    lastMessage: "Adorei as fotos do safari!",
    timeAgo: "1h",
    unread: 0,
  },
  {
    id: "m3",
    user: { name: "Fátima Mussa", avatar: "https://i.pravatar.cc/100?img=5" },
    lastMessage: "Vamos marcar a viagem a Tofo 🌊",
    timeAgo: "3h",
    unread: 1,
  },
  {
    id: "m4",
    user: { name: "João Ndlovu", avatar: "https://i.pravatar.cc/100?img=7" },
    lastMessage: "Que hotel recomendas em Pemba?",
    timeAgo: "ontem",
    unread: 0,
  },
];

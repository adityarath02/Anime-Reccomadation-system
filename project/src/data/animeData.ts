import { Anime } from '../types/anime';

export const animeData: Anime[] = [
  {
    id: 1,
    title: "Fullmetal Alchemist: Brotherhood",
    genres: ["action", "drama", "fantasy"],
    mood: ["thoughtful", "excited"],
    description: "Two brothers search for the Philosopher's Stone to restore their bodies after a failed alchemical ritual.",
    imageUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop",
    rating: 9.5
  },
  {
    id: 2,
    title: "Gintama",
    genres: ["comedy", "action", "sci-fi"],
    mood: ["happy", "excited"],
    description: "In an era where aliens have invaded and taken over feudal Tokyo, a young samurai finds work however he can.",
    imageUrl: "https://images.unsplash.com/photo-1560972550-aba3456b5564?w=800&auto=format&fit=crop",
    rating: 9.0
  },
  {
    id: 3,
    title: "Your Lie in April",
    genres: ["drama", "romance", "slice-of-life"],
    mood: ["sad", "thoughtful"],
    description: "A young pianist who lost his ability to play meets a beautiful violinist who helps him return to music.",
    imageUrl: "https://images.unsplash.com/photo-1513883049090-d0b7439799bf?w=800&auto=format&fit=crop",
    rating: 8.9
  }
];
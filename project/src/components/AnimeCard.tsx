import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { AnimeDetail } from '../types/anime';

interface AnimeCardProps {
  anime: AnimeDetail;
  onClick: (anime: AnimeDetail) => void;
}

export const AnimeCard: React.FC<AnimeCardProps> = ({ anime, onClick }) => {
  return (
    <motion.div
      layout
      onClick={() => onClick(anime)}
      className="bg-white rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <img
          src={anime.imageUrl}
          alt={anime.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded-full flex items-center">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-semibold">{anime.score}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
          {anime.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2 mb-3">
          {anime.synopsis}
        </p>
        <div className="flex flex-wrap gap-1">
          {anime.genres.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="px-2 py-1 bg-purple-100 text-purple-700 rounded-full text-xs"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
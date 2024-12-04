import React from 'react';
import { motion } from 'framer-motion';
import { Star, Play, Clock, Calendar, Trophy, X } from 'lucide-react';
import { AnimeDetail } from '../types/anime';

interface AnimeModalProps {
  anime: AnimeDetail;
  onClose: () => void;
}

export const AnimeModal: React.FC<AnimeModalProps> = ({ anime, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={anime.imageUrl}
              alt={anime.title}
              className="w-full h-[400px] object-cover rounded-t-xl md:rounded-l-xl md:rounded-tr-none"
            />
          </div>
          
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-3xl font-bold text-gray-900">{anime.title}</h2>
              <div className="flex items-center bg-yellow-100 px-3 py-1 rounded-full">
                <Star className="w-5 h-5 text-yellow-500 fill-current" />
                <span className="ml-1 font-semibold">{anime.score}</span>
              </div>
            </div>

            <p className="text-gray-600 mb-6 leading-relaxed">{anime.synopsis}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Play className="w-5 h-5 text-purple-600 mr-2" />
                <span>{anime.episodes} episodes</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-purple-600 mr-2" />
                <span>{anime.duration}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 text-purple-600 mr-2" />
                <span>{anime.year}</span>
              </div>
              <div className="flex items-center">
                <Trophy className="w-5 h-5 text-purple-600 mr-2" />
                <span>{anime.rating}</span>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Genres</h3>
              <div className="flex flex-wrap gap-2">
                {anime.genres.map((genre) => (
                  <span
                    key={genre}
                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Studios</h3>
              <div className="flex flex-wrap gap-2">
                {anime.studios.map((studio) => (
                  <span
                    key={studio}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {studio}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
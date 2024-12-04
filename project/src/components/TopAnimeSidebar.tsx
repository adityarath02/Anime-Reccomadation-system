import React from 'react';
import { Trophy, Star } from 'lucide-react';
import { AnimeDetail } from '../types/anime';

interface TopAnimeSidebarProps {
  topAnime: AnimeDetail[];
  loading: boolean;
}

export const TopAnimeSidebar: React.FC<TopAnimeSidebarProps> = ({ topAnime, loading }) => {
  if (loading) {
    return (
      <div className="w-72 bg-white p-4 rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="mb-4">
              <div className="h-16 bg-gray-200 rounded mb-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-72 bg-white p-4 rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-900">Top 10 Anime</h2>
      </div>
      <div className="space-y-3">
        {topAnime.map((anime, index) => (
          <div
            key={anime.mal_id}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50"
          >
            <span className="text-lg font-bold text-yellow-500">#{index + 1}</span>
            <img
              src={anime.imageUrl}
              alt={anime.title}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {anime.title}
              </h3>
              <div className="flex items-center text-sm text-gray-600">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="ml-1">{anime.score}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
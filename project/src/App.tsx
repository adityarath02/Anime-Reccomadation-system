import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MoodSelector } from './components/MoodSelector';
import { SearchBar } from './components/SearchBar';
import { AnimeCard } from './components/AnimeCard';
import { AnimeModal } from './components/AnimeModal';
import { RegenerateButton } from './components/RegenerateButton';
import { TopAnimeSidebar } from './components/TopAnimeSidebar';
import { Footer } from './components/Footer';
import { searchAnime, getMoodBasedRecommendations, getTopAnime, getInitialAnime } from './services/animeService';
import { Mood, AnimeDetail } from './types/anime';

function App() {
  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [animes, setAnimes] = useState<AnimeDetail[]>([]);
  const [selectedAnime, setSelectedAnime] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [topAnime, setTopAnime] = useState<AnimeDetail[]>([]);
  const [topAnimeLoading, setTopAnimeLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const resetToHome = () => {
    setSelectedMood(null);
    setSelectedAnime(null);
    fetchInitialData();
  };

  const fetchInitialData = async () => {
    setLoading(true);
    try {
      const [initialResponse, topResponse] = await Promise.all([
        getInitialAnime(),
        getTopAnime()
      ]);

      if (initialResponse.data && Array.isArray(initialResponse.data)) {
        const formattedAnimes = initialResponse.data.map(formatAnimeData);
        setAnimes(formattedAnimes);
      }

      if (topResponse.data && Array.isArray(topResponse.data)) {
        const formattedTopAnimes = topResponse.data.map(formatAnimeData);
        setTopAnime(formattedTopAnimes);
      }
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError('Error loading initial data. Please refresh the page.');
    } finally {
      setLoading(false);
      setTopAnimeLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, []);

  const formatAnimeData = (anime: any): AnimeDetail => ({
    mal_id: anime.mal_id,
    title: anime.title,
    imageUrl: anime.images.jpg.large_image_url,
    synopsis: anime.synopsis,
    score: anime.score,
    genres: anime.genres.map((g: any) => g.name),
    status: anime.status,
    episodes: anime.episodes,
    duration: anime.duration,
    rating: anime.rating,
    year: anime.year,
    studios: anime.studios.map((s: any) => s.name)
  });

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await searchAnime(query);
      if (response.data && Array.isArray(response.data)) {
        const formattedAnimes = response.data.map(formatAnimeData);
        setAnimes(formattedAnimes);
        setSelectedAnime(null);
      } else {
        setError('No results found');
      }
    } catch (error) {
      setError('Error searching anime. Please try again.');
      console.error('Error searching anime:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMoodSelect = async (mood: Mood) => {
    setSelectedMood(mood);
    setCurrentPage(1);
    await fetchMoodRecommendations(mood, 1);
  };

  const fetchMoodRecommendations = async (mood: Mood, page: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getMoodBasedRecommendations(mood, page);
      if (response.data && Array.isArray(response.data)) {
        const formattedAnimes = response.data.map(formatAnimeData);
        setAnimes(formattedAnimes);
        setSelectedAnime(null);
      } else {
        setError('No recommendations found for this mood');
      }
    } catch (error) {
      setError('Error getting recommendations. Please try again.');
      console.error('Error getting recommendations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRegenerate = async () => {
    if (selectedMood) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchMoodRecommendations(selectedMood, nextPage);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <button
            onClick={resetToHome}
            className="inline-flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-purple-900">AnimeAsPerMyMood</h1>
          </button>
          <p className="text-gray-600 mt-2">Discover your next favorite anime based on your mood</p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <SearchBar onSearch={handleSearch} />

            <section className="mb-12">
              <h2 className="text-2xl font-semibold text-center mb-6">How are you feeling today?</h2>
              <MoodSelector selectedMood={selectedMood} onMoodSelect={handleMoodSelect} />
            </section>

            <AnimatePresence>
              {loading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-center items-center py-12"
                >
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
                </motion.div>
              ) : error ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-center text-red-600 py-8"
                >
                  {error}
                </motion.div>
              ) : (
                animes.length > 0 && (
                  <section>
                    <h2 className="text-2xl font-semibold text-center mb-6">
                      {selectedMood
                        ? `Here are some anime recommendations for your ${selectedMood} mood`
                        : 'Popular Anime'}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {animes.map((anime) => (
                        <AnimeCard
                          key={anime.mal_id}
                          anime={anime}
                          onClick={setSelectedAnime}
                        />
                      ))}
                    </div>
                    {selectedMood && <RegenerateButton onClick={handleRegenerate} />}
                  </section>
                )
              )}
            </AnimatePresence>
          </div>
          
          <aside className="lg:sticky lg:top-8 lg:h-fit">
            <TopAnimeSidebar topAnime={topAnime} loading={topAnimeLoading} />
          </aside>
        </div>
      </div>

      <AnimatePresence>
        {selectedAnime && (
          <AnimeModal
            anime={selectedAnime}
            onClose={() => setSelectedAnime(null)}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default App;
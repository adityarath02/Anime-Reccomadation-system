const BASE_URL = 'https://api.jikan.moe/v4';
const TOP_URL = 'https://api.jikan.moe/v4/top/anime';

const GENRE_IDS = {
  ACTION: 1,
  ADVENTURE: 2,
  COMEDY: 4,
  DRAMA: 8,
  FANTASY: 10,
  HORROR: 14,
  MYSTERY: 7,
  PSYCHOLOGICAL: 40,
  ROMANCE: 22,
  SCIFI: 24,
  SLICEOFLIFE: 36,
  SPORTS: 30,
  SUPERNATURAL: 37,
  THRILLER: 41
};

export const searchAnime = async (query: string) => {
  const response = await fetch(`${BASE_URL}/anime?q=${query}&limit=12`);
  const data = await response.json();
  return data;
};

export const getTopAnime = async () => {
  const response = await fetch(`${TOP_URL}?limit=10`);
  const data = await response.json();
  return data;
};

export const getInitialAnime = async () => {
  const response = await fetch(`${BASE_URL}/top/anime?limit=12`);
  const data = await response.json();
  return data;
};

export const getMoodBasedRecommendations = async (mood: string, page: number = 1) => {
  const moodGenreMap: Record<string, number[]> = {
    happy: [GENRE_IDS.COMEDY, GENRE_IDS.SLICEOFLIFE],
    sad: [GENRE_IDS.DRAMA, GENRE_IDS.PSYCHOLOGICAL],
    excited: [GENRE_IDS.ACTION, GENRE_IDS.ADVENTURE],
    relaxed: [GENRE_IDS.SLICEOFLIFE, GENRE_IDS.FANTASY],
    thoughtful: [GENRE_IDS.MYSTERY, GENRE_IDS.PSYCHOLOGICAL]
  };

  const genres = moodGenreMap[mood];
  if (!genres) {
    throw new Error(`Invalid mood: ${mood}`);
  }

  const genreParam = genres.join(',');
  const response = await fetch(
    `${BASE_URL}/anime?genres=${genreParam}&order_by=score&sort=desc&limit=6&page=${page}&sfw=true`
  );
  
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data;
};
export type Genre = 
  | 'action'
  | 'comedy'
  | 'drama'
  | 'fantasy'
  | 'horror'
  | 'mystery'
  | 'romance'
  | 'sci-fi'
  | 'slice-of-life'
  | 'sports'
  | 'thriller';

export type Mood = 
  | 'happy'
  | 'sad'
  | 'excited'
  | 'relaxed'
  | 'thoughtful';

export interface AnimeResponse {
  data: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
    synopsis: string;
    score: number;
    genres: Array<{
      name: string;
    }>;
    status: string;
    episodes: number;
    duration: string;
    rating: string;
    year: number;
    studios: Array<{
      name: string;
    }>;
  }[];
}

export interface AnimeDetail {
  mal_id: number;
  title: string;
  imageUrl: string;
  synopsis: string;
  score: number;
  genres: string[];
  status: string;
  episodes: number;
  duration: string;
  rating: string;
  year: number;
  studios: string[];
}
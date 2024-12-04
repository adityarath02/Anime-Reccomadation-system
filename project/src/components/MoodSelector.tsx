import React from 'react';
import { Mood } from '../types/anime';
import { Heart, Laugh, Brain, Coffee, Frown } from 'lucide-react';

interface MoodSelectorProps {
  selectedMood: Mood | null;
  onMoodSelect: (mood: Mood) => void;
}

const moodIcons = {
  happy: Laugh,
  sad: Frown,
  excited: Heart,
  relaxed: Coffee,
  thoughtful: Brain,
};

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodSelect }) => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {(Object.keys(moodIcons) as Mood[]).map((mood) => {
        const Icon = moodIcons[mood];
        return (
          <button
            key={mood}
            onClick={() => onMoodSelect(mood)}
            className={`flex flex-col items-center p-4 rounded-lg transition-all ${
              selectedMood === mood
                ? 'bg-purple-600 text-white scale-105'
                : 'bg-white hover:bg-purple-50'
            }`}
          >
            <Icon className="w-8 h-8 mb-2" />
            <span className="capitalize">{mood}</span>
          </button>
        );
      })}
    </div>
  );
};
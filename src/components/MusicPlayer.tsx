import { useEffect, useState } from 'react';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { ambientMusic, type MusicMood } from '../utils/ambientMusic';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mood, setMood] = useState<MusicMood>('night');
  const [volume, setVolume] = useState(0.45);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    return () => {
      ambientMusic.stop();
    };
  }, []);

  const togglePlay = async () => {
    if (isPlaying) {
      ambientMusic.stop();
      setIsPlaying(false);
    } else {
      await ambientMusic.start();
      ambientMusic.setVolume(isMuted ? 0 : volume);
      setIsPlaying(true);
    }
  };

  const handleMoodChange = (nextMood: MusicMood) => {
    setMood(nextMood);
    ambientMusic.setMood(nextMood);
  };

  const handleVolumeChange = (nextVal: number) => {
    setVolume(nextVal);
    if (nextVal > 0 && isMuted) {
      setIsMuted(false);
    }
    ambientMusic.setVolume(nextVal);
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    ambientMusic.setVolume(nextMuted ? 0 : volume);
  };

  return (
    <aside
      aria-label="Атмосферное музыкальное сопровождение"
      className="fixed bottom-4 right-4 z-40 flex items-center gap-3 border border-[#C9A24D]/35 bg-[#120F17]/95 px-3.5 py-2 shadow-xl backdrop-blur-md"
    >
      <button
        type="button"
        onClick={togglePlay}
        aria-label={isPlaying ? 'Поставить музыку на паузу' : 'Включить музыку'}
        className="inline-flex h-8 w-8 shrink-0 items-center justify-center bg-[#9E1B32] hover:bg-[#B8203B] text-[#F3EEF7] transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C9A24D]"
      >
        {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5 ml-0.5" />}
      </button>

      <div className="flex items-center gap-1 border border-[#F3EEF7]/12 bg-[#0A080C] p-0.5">
        <button
          type="button"
          onClick={() => handleMoodChange('night')}
          className={`px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
            mood === 'night'
              ? 'bg-[#1D1626] text-[#F2B8C6]'
              : 'text-[#9C92A8] hover:text-[#F3EEF7]'
          }`}
        >
          Сакура
        </button>
        <button
          type="button"
          onClick={() => handleMoodChange('crimson')}
          className={`px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-colors cursor-pointer ${
            mood === 'crimson'
              ? 'bg-[#9E1B32]/35 text-[#F3EEF7]'
              : 'text-[#9C92A8] hover:text-[#F3EEF7]'
          }`}
        >
          Алая луна
        </button>
      </div>

      <div className="hidden sm:flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Включить звук' : 'Выключить звук'}
          className="inline-flex h-7 w-7 items-center justify-center text-[#B8B0C2] hover:text-[#F3EEF7] transition-colors cursor-pointer"
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="h-3.5 w-3.5 text-[#9E1B32]" />
          ) : (
            <Volume2 className="h-3.5 w-3.5" />
          )}
        </button>
        <input
          type="range"
          min={0}
          max={0.85}
          step={0.05}
          value={isMuted ? 0 : volume}
          onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
          aria-label="Громкость музыки"
          className="w-16 accent-[#9E1B32] cursor-pointer"
        />
      </div>
    </aside>
  );
}

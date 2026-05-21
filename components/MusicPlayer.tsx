"use client";

import { useRef, useState } from "react";

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);

  async function toggleMusic() {
    const audio = audioRef.current;
    if (!audio) return;

    setHasError(false);

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      return;
    }

    try {
      audio.volume = 0.35;
      await audio.play();
      setIsPlaying(true);
    } catch (error) {
      console.log("Music play failed:", error);
      setHasError(true);
      setIsPlaying(false);
    }
  }

  return (
    <div className="music-player">
      <audio ref={audioRef} src="/bgm.mp3" loop preload="auto" />

      <button type="button" className="music-button" onClick={toggleMusic}>
        {isPlaying ? "music on ♫꒰･‿･๑꒱" : "music off ♫꒰｡•́‿•̀｡꒱"}
      </button>

      {hasError && (
        <p className="music-error">
          can’t play bgm.mp3 ꒰｡•́︿•̀｡꒱
        </p>
      )}
    </div>
  );
}
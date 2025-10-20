"use client";
import { useEffect, useRef, useState } from "react";

interface AfterMoviePlayerProps {
  onEnd: () => void;
}

export default function AfterMoviePlayer({ onEnd }: AfterMoviePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOutOpening, setFadeOutOpening] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOutOpening(true);

      setTimeout(() => {
        setShowVideo(true);
        const video = videoRef.current;
        if (video) {
          video.muted = true;
          video.onended = onEnd;

          // mainkan video dan otomatis fullscreen
          video.play().catch((err) => console.warn("Autoplay video diblokir:", err));

          // request fullscreen otomatis setelah video dimulai
          if (video.requestFullscreen) {
            video.requestFullscreen().catch((err) => console.warn("Fullscreen gagal:", err));
          }
        }
      }, 1200);
    }, 4000);

    return () => clearTimeout(fadeTimer);
  }, [onEnd]);

  return (
    <div className="relative w-screen h-screen bg-black flex items-center justify-center overflow-hidden">
      {!showVideo && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8
          bg-gradient-to-b from-black via-yellow-900/40 to-black
          transition-all duration-1000 ease-in-out
          ${fadeOutOpening ? "opacity-0 blur-md scale-105" : "opacity-100 blur-0 scale-100"}`}
        >
          <h1 className="title text-5xl md:text-7xl text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] tracking-widest animate-fade-in">
            Legenda yang Hidup
          </h1>
          <p className="subtitle mt-3 sm:mt-4 text-base sm:text-md md:text-lg text-yellow-200 tracking-widest opacity-80 animate-fade-in">
            “Ketika seni berbicara, waktu berhenti...”
          </p>
        </div>
      )}

      {showVideo && (
        <video
          ref={videoRef}
          src="/videos/aftermovie.mp4"
          autoPlay
          playsInline
          muted
          controls
          preload="auto"
          className="fixed top-0 left-0 w-screen h-screen object-cover z-10"
          onEnded={onEnd}
        />
      )}
    </div>
  );
}

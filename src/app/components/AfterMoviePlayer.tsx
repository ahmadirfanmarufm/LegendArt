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

          video.play().catch((err) => console.warn("Autoplay video diblokir:", err));

          if (video.requestFullscreen) {
            video.requestFullscreen().catch((err) => console.warn("Fullscreen gagal:", err));
          }
        }
      }, 1200);
    }, 4000);

    return () => clearTimeout(fadeTimer);
  }, [onEnd]);

  return (
    <div className="relative w-screen h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#FFF8F0" }}>
      {!showVideo && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8
          bg-gradient-to-b from-[#fff7d1] via-[#ffe9b3]/50 to-[#fffaf0]
          transition-all duration-1000 ease-in-out
          ${fadeOutOpening ? "opacity-0 blur-md scale-105" : "opacity-100 blur-0 scale-100"}`}
        >
          <h1 className="title text-5xl md:text-7xl text-[#8b5e3c] drop-shadow-[0_0_10px_rgba(199,139,45,0.3)] tracking-widest animate-fade-in">
            Legenda yang Hidup
          </h1>
          <p className="subtitle mt-3 sm:mt-4 text-base sm:text-md md:text-lg text-[#8b5e3c] tracking-widest opacity-80 animate-fade-in">
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

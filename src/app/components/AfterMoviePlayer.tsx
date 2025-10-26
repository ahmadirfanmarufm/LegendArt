"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface AfterMoviePlayerProps {
  onEnd: () => void;
}

export default function AfterMoviePlayer({ onEnd }: AfterMoviePlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showVideo, setShowVideo] = useState(false);
  const [fadeOutOpening, setFadeOutOpening] = useState(false);
  const [showStartButton, setShowStartButton] = useState(false);

  useEffect(() => {
    // Fade out opening
    const fadeTimer = setTimeout(() => {
      setFadeOutOpening(true);
      setTimeout(() => setShowStartButton(true), 1000);
    }, 4000);

    return () => clearTimeout(fadeTimer);
  }, []);

  const handleStart = async () => {
    setShowStartButton(false);
    setShowVideo(true);

    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.controls = true;
      video.onended = onEnd;

      try {
        await video.play();
      } catch (err) {
        console.warn("Video gagal diputar otomatis:", err);
      }

      // Optional fullscreen (user gesture sudah ada)
      if (video.requestFullscreen) {
        try {
          await video.requestFullscreen();
        } catch (err) {
          console.warn("Fullscreen gagal:", err);
        }
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
      {/* Opening */}
      {!showVideo && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-8
          bg-gradient-to-b from-[#fff7d1] via-[#ffe9b3]/50 to-[#fffaf0]
          transition-all duration-1000 ease-in-out
          ${fadeOutOpening ? "opacity-0 blur-md scale-105" : "opacity-100 blur-0 scale-100"}`}
        >
          <motion.img
            src="/images/comiculture_nusantara.png"
            alt="Comiculture Nusantara"
            className="mx-auto h-[48vh] 2xl:h-[52vh] w-auto max-w-[90vw] object-contain drop-shadow-[0_0_10px_rgba(199,139,45,0.3)] px-4 md:px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />

          {/* Tombol Start muncul setelah animasi opening */}
          {showStartButton && (
            <motion.button
              onClick={handleStart}
              className="mt-8 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-purple-500 text-white font-semibold text-lg shadow-md hover:scale-105 transition-all"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              🎬 Mulai Tonton Aftermovie
            </motion.button>
          )}
        </div>
      )}

      {/* Video */}
      {showVideo && (
        <video
          ref={videoRef}
          src="/videos/aftermovie.mp4"
          playsInline
          controls
          preload="auto"
          className="fixed top-0 left-0 w-screen h-screen object-cover z-10"
          onEnded={onEnd}
        />
      )}
    </div>
  );
}
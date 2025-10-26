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

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOutOpening(true);

      setTimeout(() => {
        setShowVideo(true);
        const video = videoRef.current;

        if (video) {
          video.muted = true;
          video.controls = true;
          video.playsInline = true;
          video.onended = onEnd;

          video.play().catch((err) => {
            console.warn("Autoplay diblokir:", err);
          });
        }
      }, 1200);
    }, 4000);

    return () => clearTimeout(fadeTimer);
  }, [onEnd]);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-[#FFF8F0]">
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
            className="mx-auto 
            h-[48vh] 2xl:h-[52vh]
            w-auto max-w-[90vw] object-contain
            drop-shadow-[0_0_10px_rgba(199,139,45,0.3)]
            px-4 md:px-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        </div>
      )}

      {showVideo && (
        <video
          ref={videoRef}
          src="/videos/aftermovie.mp4"
          autoPlay
          muted
          playsInline
          controls
          preload="auto"
          className="w-full h-full object-cover z-10"
          onEnded={onEnd}
        />
      )}
    </div>
  );
}
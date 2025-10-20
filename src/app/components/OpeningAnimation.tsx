"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface OpeningAnimationProps {
  onFinish: () => void;
}

export default function OpeningAnimation({ onFinish }: OpeningAnimationProps) {
  const [particles, setParticles] = useState<{ x: number; y: number; delay: number }[]>([]);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const newParticles = Array.from({ length: 30 }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 3.5, duration: 1.5 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(120deg, #e7b970, #b34d1e, #26547c, #6da34d, #f7e9c2)",
        backgroundSize: "400% 400%, cover",
        backgroundPosition: "center",
        backgroundBlendMode: "overlay",
        animation: "bgMove 12s ease-in-out infinite",
      }}
    >
      <style jsx>{`
        @keyframes bgMove {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 w-full h-56 bg-gradient-to-t from-yellow-900/50 via-transparent to-transparent"
        style={{
          clipPath: "polygon(0 70%, 25% 65%, 50% 75%, 75% 65%, 100% 70%, 100% 100%, 0 100%)",
        }}
      />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: Math.random() * 0.5 + 0.3,
              x: p.x,
              y: p.y,
              scale: Math.random() * 0.8 + 0.4,
            }}
            animate={{
              y: [p.y, p.y - 120],
              opacity: [0.2, 0.6, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "loop",
              delay: p.delay,
            }}
            className="absolute w-2 h-2 bg-yellow-200 rounded-full blur-sm"
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="text-center drop-shadow-[0_0_15px_rgba(255,215,0,0.7)]"
      >
        <h1 className="title text-5xl md:text-7xl text-yellow-400 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] tracking-widest animate-pulse">
            Legenda Nusantara
        </h1>
      </motion.div>

    <motion.img
        src="/images/seni2.png"
        alt="Wayang"
        className="absolute left-0 bottom-0 w-48 lg:w-64 max-w-[50%]"
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 0.6,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
    />

    <motion.img
        src="/images/seni1.png"
        alt="Daun Emas"
        className="absolute right-0 top-0 w-40 sm:w-56"
        initial={{ opacity: 0, y: 30 }}
        animate={{
          opacity: 0.5,
          y: [0, -10, 0],
        }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" }, 
        }}
    />

    <motion.img
        src="https://upload.wikimedia.org/wikipedia/id/thumb/0/0f/Logo_IPB.png/2048px-Logo_IPB.png"
        alt="Logo Universitas"
        className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-24"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 0.5,
          y: [0, -15, 0],
          rotate: [0, 1.5, 0, -1.5, 0],
        }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
    />

    </motion.div>
  );
}

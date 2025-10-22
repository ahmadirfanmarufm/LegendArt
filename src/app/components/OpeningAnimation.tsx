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
    const newParticles = Array.from({ length: 40 }).map(() => ({
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
      transition={{ delay: 4, duration: 1.8 }}
      onAnimationComplete={onFinish}
      className="fixed inset-0 flex items-center justify-center z-50 overflow-hidden 
      bg-[linear-gradient(135deg,#FDFDFD,#FDE68A,#FACC15,#E9D5FF,#A855F7,#5B21B6)] 
      bg-[length:400%_400%] animate-bgMove"
    >
      {/* Cahaya lembut global */}
      <motion.div
        className="absolute inset-0 bg-white/10 mix-blend-overlay blur-3xl"
        animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Wave bawah */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 w-full h-64 
        bg-gradient-to-br from-[#fff8e1] via-[#f3d98a] via-40% via-[#eecb66] to-[#a47cc2] bg-cover bg-center to-transparent
        blur-[2px] wave-clip"
      />

      {/* Partikel (emas, ungu, putih) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <motion.div
            key={i}
            initial={{
              opacity: Math.random() * 0.6 + 0.3,
              x: p.x,
              y: p.y,
              scale: Math.random() * 0.8 + 0.4,
            }}
            animate={{
              y: [p.y, p.y - 120],
              opacity: [0.2, 0.8, 0],
            }}
            transition={{
              duration: Math.random() * 6 + 4,
              repeat: Infinity,
              repeatType: "loop",
              delay: p.delay,
            }}
            className={`absolute w-2 h-2 rounded-full blur-[1.5px] ${
              Math.random() > 0.6
                ? "bg-yellow-200"
                : Math.random() > 0.3
                ? "bg-purple-300"
                : "bg-white"
            }`}
          />
        ))}
      </div>

      {/* Judul utama */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2 }}
        className="text-center relative px-6 py-4 rounded-3xl"
      >
        <h1
          className="title text-5xl md:text-7xl font-extrabold tracking-widest animate-pulse text-white
          drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]
          [text-shadow:_0_0_10px_rgba(250,204,21,0.9),_0_0_20px_rgba(168,85,247,0.7),_0_0_35px_rgba(0,0,0,0.6)]"
        >
          Legenda Nusantara
        </h1>
      </motion.div>

      {/* Gambar kiri - wayang */}
      <motion.img
        src="/images/seni2.png"
        alt="Wayang"
        className="absolute left-0 bottom-0 w-44 md:w-64 lg:w-72 max-w-[50%]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 1.2, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Gambar kanan atas - daun emas */}
      <motion.img
        src="/images/seni1.png"
        alt="Daun Emas"
        className="absolute right-0 top-0 w-36 sm:w-52"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 0.8, y: [0, -10, 0] }}
        transition={{
          opacity: { duration: 1.5, ease: "easeOut" },
          y: { duration: 5, repeat: Infinity, ease: "easeInOut" },
        }}
      />

      {/* Logo Universitas */}
      <motion.img
        src="/images/Logo_IPB.png"
        alt="Logo Universitas"
        className="absolute bottom-4 right-4 w-16 sm:w-20 md:w-24 opacity-80"
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 0.8,
          y: [0, -10, 0],
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

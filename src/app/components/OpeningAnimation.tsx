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
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
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
      
      {/* ✨ Dekorasi garis lengkung halus */}
      <motion.svg
        className="absolute top-0 left-0 w-[120%] h-[120%] opacity-30"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.35 }}
        transition={{ duration: 2 }}
      >
        <motion.path
          d="M-100 300 Q400 100 900 300 T1900 300"
          stroke="url(#grad1)"
          strokeWidth="2"
          fill="transparent"
          animate={{
            pathLength: [0, 1, 0.8, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="50%" stopColor="#D8B4FE" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* ✨ Garis lengkung tambahan di bawah */}
      <motion.svg
        className="absolute bottom-0 right-0 w-[130%] h-[130%] opacity-25 rotate-180"
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.25 }}
        transition={{ duration: 3 }}
      >
        <motion.path
          d="M-100 300 Q400 500 900 300 T1900 300"
          stroke="url(#grad2)"
          strokeWidth="2"
          fill="transparent"
          animate={{
            pathLength: [0, 1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <defs>
          <linearGradient id="grad2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#FDE68A" />
            <stop offset="50%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#5B21B6" />
          </linearGradient>
        </defs>
      </motion.svg>

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
          Legenda yang hidup
        </h1>
        <p className="subtitle mt-3 sm:mt-4 text-base sm:text-md md:text-lg text-white drop-shadow-[0_0_10px_rgba(250,204,21,0.9)]
          [text-shadow:_0_0_10px_rgba(250,204,21,0.9),_0_0_20px_rgba(168,85,247,0.7),_0_0_35px_rgba(0,0,0,0.6)] tracking-widest opacity-80 animate-pulse">
          “Mengukir tradisi, Merangkai warna, Mewujudkan citra”
        </p>
      </motion.div>

      <motion.div
        className="absolute top-5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Logo kiri */}
        <motion.img
          src="/images/senibudaya.png"
          alt="Tarian"
          className="w-16 sm:w-20 md:w-24 max-w-[50%] opacity-60 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          initial={{ y: 15 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Logo kanan */}
        <motion.img
          src="/images/Logo_IPB.svg"
          alt="Logo Universitas"
          className="w-16 sm:w-20 md:w-24 max-w-[50%] opacity-60 drop-shadow-[0_0_10px_rgba(255,255,255,0.6)]"
          initial={{ y: 15 }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 2, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
}

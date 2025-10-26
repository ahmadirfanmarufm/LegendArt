"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalStory from "./ModalStory";
import ModalVideo from "./ModalVideo";
import { FaInstagram } from "react-icons/fa";

interface LinkItem {
  title: string;
  url: string;
  action?: "story" | "video";
}

interface Member {
  name: string;
  avatar: string;
}

const members: Member[] = [
  {
    name: "Tiana Faza Anissa",
    avatar:
      "/images/faza.jpg",
  },
  {
    name: "Dandy Farel Kenedy",
    avatar:
      "/images/dandy.jpg",
  },
  {
    name: "Nazwa Naila Mi'raj",
    avatar:
      "/images/nazwa.jpg",
  },
  {
    name: "Sevchenko Ananta Kusnadi",
    avatar:
      "/images/sevchenko.jpg",
  },
  {
    name: "Cherryl Madina Ananda Rizkia",
    avatar:
      "/images/cherryl.jpg",
  },
];

export default function LinkTreeSection() {
  const [modal, setModal] = useState<"story" | "video" | null>(null);

  const links: LinkItem[] = [
    {
      title: "🎬 Saksikan Kembali Kisah Kami",
      url: "#",
      action: "video",
    },
    {
      title: "📖 Filosofi di Baliknya",
      url: "#",
      action: "story",
    },
  ];

  return (
    <div
      className="
        relative min-h-screen flex flex-col items-center justify-start text-[#3b2f2f] overflow-hidden px-4 pt-10 pb-20 
        bg-gradient-to-br from-[#fff8e1] via-[#f3d98a] via-40% via-[#eecb66] to-[#a47cc2] bg-cover bg-center
      "
    >
      {/* Ornamen */}
      <img
        src="/images/seni3.png"
        alt="Awan"
        className="absolute top-120 lg:top-10 left-0 w-40 sm:w-56 opacity-25 animate-floating pointer-events-none"
      />
      <img
        src="/images/seni4.png"
        alt="Daun"
        className="absolute right-0 bottom-10 sm:bottom-20 w-48 sm:w-60 opacity-40 animate-floating-slow pointer-events-none"
      />

      {/* Judul */}
      <h1 className="
        title tracking-widest text-center text-3xl sm:text-4xl md:text-6xl mb-6 text-yellow-600 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] 
        animate-fade-in"
      >
        Jelajahi Nusantara
      </h1>

      {/* Carousel Lukisan */}
      <div className="relative w-full max-w-2xl h-64 mb-10 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#c78b2d] animate-fade-in">
        <img
          src="/images/lukisan.jpg"
          alt="Lukisan"
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
        />
      </div>

      {/* Daftar Link */}
      <div className="flex flex-col gap-5 w-72 sm:w-80 animate-fade-in">
        {links.map((link) => (
          <button
            key={link.title}
            onClick={() => {
              if (link.action === "story") setModal("story");
              else if (link.action === "video") setModal("video");
              else window.open(link.url, "_blank");
            }}
            className="
              border border-[#c78b2d] py-3 rounded-xl text-center text-lg font-semibold
              transition-all duration-300 shadow-md hover:scale-105 
              bg-gradient-to-br from-[#fff9e8]/80 via-[#fff5e1]/70 to-[#a47cc2]/20 
              hover:from-[#fff9e8] hover:to-[#a47cc2]/60 
              cursor-pointer text-[#3b2f2f]
            "
          >
            <span className="subtitle text-base tracking-widest">{link.title}</span>
          </button>
        ))}
      </div>

      {/* Anggota Kelompok */}
      <div className="w-full max-w-6xl mt-12 px-2 animate-fade-in">
        <h2 className="
          title tracking-widest text-center text-3xl sm:text-4xl mb-6 text-yellow-600 drop-shadow-[0_0_20px_rgba(250,204,21,0.8)] animate-fade-in"
        >
          Tim Dibalik Layar
        </h2>

        <div className="
          flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center gap-4 overflow-x-auto md:overflow-visible py-2 -mx-2 px-2"
        >
          {members.map((member, i) => (
            <div key={member.name}
              className="
                flex-shrink-0 w-36 md:w-auto bg-[#fff5e1]/60 backdrop-blur-sm border border-[#c78b2d] rounded-2xl p-4 duration-300 
                hover:scale-105 transition-all flex flex-col items-center animate-fade-in
              "
            >
              <img
                src={member.avatar || "/images/avatar-placeholder.png"}
                alt={member.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-yellow-400 mb-2"
              />
              <p className="subtitle text-sm md:text-base font-semibold text-[#3b2f2f] text-center">
                {member.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Instagram Departemen Seni Budaya */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="my-10 flex justify-center z-10 relative"
      >
        <a
          href="https://www.instagram.com/senbud_ormawaeksepku/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-5 py-3 rounded-full text-sm sm:text-base font-semibold
          bg-gradient-to-br from-yellow-400 to-purple-500 text-[#fff5e1]
          shadow-lg hover:shadow-xl hover:scale-105 transition-all animated-fade-in duration-300"
        >
          <FaInstagram className="w-5 h-5" />
          <span className="subtitle tracking-wider">
            Follow Departemen Seni Budaya
          </span>
        </a>
      </motion.div>

      {/* Gelombang bawah */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 w-full h-36 bg-gradient-to-br from-[#fff8e1] via-[#f3d98a] via-40% via-[#eecb66] to-[#a47cc2] bg-cover bg-center to-transparent"
        style={{
          clipPath:
            "polygon(0 70%, 25% 65%, 50% 75%, 75% 65%, 100% 70%, 100% 100%, 0 100%)",
        }}
      />

      <ModalStory isOpen={modal === "story"} onClose={() => setModal(null)} />
      <ModalVideo isOpen={modal === "video"} onClose={() => setModal(null)} />
    </div>
  );
}

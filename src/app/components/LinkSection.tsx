"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ModalStory from "./ModalStory";
import ModalVideo from "./ModalVideo";
import { FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

interface LinkItem {
  title: string;
  url: string;
  thumbnail?: string;
  action?: "story" | "video";
}

interface Member {
  name: string;
  role: string;
  avatar: string;
  socials?: {
    instagram?: string,
    linkedin?: string,
  }
}

const paintings = [
  "https://assets.promediateknologi.id/crop/0x0:0x0/750x500/webp/photo/2022/12/06/3148179097.jpg",
  "https://luxuo-id-production.s3.ap-southeast-1.amazonaws.com/2021/03/pic-1-art-justian.jpg",
  "https://indoartnow.com/uploads/artwork/image/22075/artwork-1487683039.jpg",
  "https://64.media.tumblr.com/b1983be38c79c67313ec64a5f296c9ab/tumblr_inline_pb59fmEo4o1qg2a3v_500.jpg",
];

const members: Member[] = [
  {
    name: "Mr. Amba",
    role: "Ketua & Kurator",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdQI8ZxR2mngBLhDY1kA7WeQlnPb9ZUZcuI1G-CuUjltXBgvw7ssVRJNwQBKwbSxZMIRw&usqp=CAU",
    socials: {
      instagram: "https://instagram.com/tamvan1",
      linkedin: "https://linkedin.com/in/tamvan1",
    },
  },
  {
    name: "Rusdi",
    role: "Desainer Visual",
    avatar: "https://i.pinimg.com/736x/6c/7b/d0/6c7bd05189c6c6da96fff6705301afa5.jpg",
    socials: {
      instagram: "https://instagram.com/tamvan2",
    },
  },
  {
    name: "Fuad",
    role: "Peneliti Seni",
    avatar: "https://i.pinimg.com/736x/51/c5/8e/51c58e46e4c4c818836817758da0cfe2.jpg",
    socials: {
      instagram: "https://instagram.com/tamvan3",
    },
  },
  {
    name: "Mr. Ironi",
    role: "Teknologi & Video",
    avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8ks-MeGvK0F7hU9-NMfLaz7eDfRpeXXhPzsYj82Mrpin9bz9QtCVI24L1KnhtTteQNTs&usqp=CAU",
    socials: {
      linkedin: "https://linkedin.com/in/tamvan4",
    },
  },
];

export default function LinkTreeSection() {
  const [index, setIndex] = useState(0);
  const [modal, setModal] = useState<"story" | "video" | null>(null);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % paintings.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowMembers(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const links: LinkItem[] = [
    { title: "🎨 Tonton Proses Lukisan", url: "#", thumbnail: "/images/thumb_proses.jpg", action: "video" },
    { title: "📖 Tentang Sang Legenda", url: "#", thumbnail: "/images/thumb_legenda.jpg", action: "story" },
    { title: "💬 Beri Feedback", url: "#", thumbnail: "/images/thumb_feedback.jpg" },
  ];

  const SocialIcon = ({ type, url }: { type: "instagram" | "linkedin"; url: string }) => {
    const icons = {
      instagram: <FaInstagram className="w-5 h-5" />,
      linkedin: <FaLinkedin className="w-5 h-5" />,
    };

    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-yellow-300 hover:text-yellow-300/50 transition-colors duration-300"
        title={type}
      >
        {icons[type]}
      </a>
    );
  };

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-start text-white overflow-hidden px-4 pt-10 pb-20"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #3b1f0e, #5a2e1f, #a8703d)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <img
        src="/images/seni3.png"
        alt="Wayang"
        className="absolute left-0 bottom-10 md:top-10 w-40 sm:w-56 opacity-25 animate-floating"
      />
      <img
        src="/images/seni2.png"
        alt="Daun"
        className="absolute right-0 bottom-10 w-44 sm:w-60 opacity-40 animate-floating-slow"
      />

      {/* Judul */}
      <h1 className="title tracking-widest text-3xl sm:text-4xl md:text-6xl mb-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,220,100,0.6)] animate-fade-in">
        Jelajahi Legenda
      </h1>

      {/* 🔥 Carousel Lukisan */}
      <div className="relative w-full max-w-2xl h-64 mb-8 rounded-2xl overflow-hidden shadow-2xl border-2 border-yellow-500 animate-fade-in">
        {paintings.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`Lukisan ${i + 1}`}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-2">
          {paintings.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full ${
                i === index ? "bg-yellow-400" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Daftar Link dengan Thumbnail */}
      <div className="flex flex-col gap-5 w-72 sm:w-80 animate-fade-in">
        {links.map((link) => (
          <button
            key={link.title}
            onClick={() => {
              if (link.action === "story") setModal("story");
              else if (link.action === "video") setModal("video");
              else window.open(link.url, "_blank");
            }}
            className="border border-yellow-400 py-3 rounded-xl text-center text-lg font-semibold
              transition-all duration-300 shadow-lg hover:scale-105 bg-yellow-600/10 hover:bg-yellow-600/30 cursor-pointer"
          >
            <span className="text-lg font-semibold">{link.title}</span>
          </button>
        ))}
      </div>

      {/* 👥 Anggota Kelompok */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={showMembers ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mt-12 px-2"
      >
        <h2 className="title tracking-widest text-center text-3xl sm:text-4xl mb-6 text-yellow-300 drop-shadow-[0_0_10px_rgba(255,220,100,0.6)] animate-fade-in">
          Tim Dibalik Layar
        </h2>

        <div className="flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center gap-4 overflow-x-auto md:overflow-visible py-2 -mx-2 px-2">
          {members.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={showMembers ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex-shrink-0 w-36 md:w-auto bg-yellow-800/20 backdrop-blur-sm border border-yellow-500/40 rounded-2xl p-4 duration-300 hover:scale-105 transition-all flex flex-col items-center"
            >
              <img
                src={member.avatar || "/images/avatar-placeholder.png"}
                alt={member.name}
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-yellow-400 mb-2"
              />

              {/* Social Media Icons */}
              {member.socials && (
                <div className="flex gap-3 m-2">
                  {member.socials.instagram && (
                    <SocialIcon type="instagram" url={member.socials.instagram} />
                  )}
                  {member.socials.linkedin && (
                    <SocialIcon type="linkedin" url={member.socials.linkedin} />
                  )}
                </div>
              )}

              <p className="text-sm md:text-base font-semibold text-yellow-100 text-center">
                {member.name}
              </p>
              <p className="text-xs text-yellow-200 opacity-80 text-center mt-1">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Gelombang bawah */}
      <div
        className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-yellow-900/70 to-transparent"
        style={{
          clipPath: "polygon(0 70%, 25% 65%, 50% 75%, 75% 65%, 100% 70%, 100% 100%, 0 100%)",
        }}
      />

      <ModalStory isOpen={modal === "story"} onClose={() => setModal(null)} />
      <ModalVideo isOpen={modal === "video"} onClose={() => setModal(null)} />
    </div>
  );
}
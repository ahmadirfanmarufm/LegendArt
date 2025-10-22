"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ModalStory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);

  const story = [
    "Di tanah Jawa kuno, hiduplah seorang pelukis yang dikenal sebagai <b>Sang Legenda</b>.",
    "Ia tidak hanya melukis dengan kuas, tapi juga dengan <b>jiwa dan dongeng</b>.",
    "Setiap goresan mengandung mantra, setiap warna berasal dari <b>kenangan leluhur</b>.",
    "Karyanya hidup saat malam tiba, bercerita pada mereka yang <b>mau mendengar</b>.",
    "Dan kini, kau adalah bagian dari ceritanya...",
  ];

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      return;
    }
    if (step < story.length - 1) {
      const timer = setTimeout(() => setStep((s) => s + 1), 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, step]);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static as="div" className="relative z-50" open={isOpen} onClose={onClose}>
          {/* Background blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-yellow-200/30 via-purple-200/30 to-white/40 backdrop-blur-md pointer-events-auto"
            onClick={onClose}
          />

          {/* Modal utama */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative pointer-events-auto 
              bg-gradient-to-br from-yellow-100 via-white to-purple-100 
              text-purple-900 rounded-3xl p-6 sm:p-8 max-w-xl w-full 
              shadow-[0_0_40px_rgba(147,51,234,0.3)] border border-yellow-300/50"
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="title tracking-widest text-xl sm:text-2xl font-bold text-yellow-600 flex items-center gap-2">
                  📖 Kisah Sang Legenda
                </h2>
                <button
                  onClick={onClose}
                  className="text-yellow-600 hover:text-purple-500 text-3xl leading-none transition duration-300 cursor-pointer z-50"
                >
                  &times;
                </button>
              </div>

              {/* Isi cerita */}
              <div className="h-40 sm:h-48 flex items-center justify-center text-center">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="subtitle text-lg sm:text-xl leading-relaxed italic font-medium text-yellow-600"
                  dangerouslySetInnerHTML={{ __html: story[step] }}
                />
              </div>

              {/* Progress bar */}
              <div className="w-full bg-purple-200/50 rounded-full h-2 mt-4 overflow-hidden">
                <motion.div
                  className="h-2 bg-gradient-to-r from-yellow-400 via-yellow-300 to-purple-400 rounded-full shadow-[0_0_10px_rgba(250,204,21,0.7)]"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / story.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>

              {/* Ornamen efek berkilau */}
              <div className="absolute -top-10 right-0 w-32 h-32 bg-gradient-radial from-yellow-300/30 to-transparent rounded-full blur-2xl animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-radial from-purple-300/30 to-transparent rounded-full blur-2xl animate-pulse" />
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

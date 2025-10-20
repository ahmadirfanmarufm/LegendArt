"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function ModalStory({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(0);

  const story = [
    "Di tanah Jawa kuno, hiduplah seorang pelukis yang dikenal sebagai **Sang Legenda**.",
    "Ia tidak hanya melukis dengan kuas, tapi juga dengan **jiwa dan dongeng**.",
    "Setiap goresan mengandung mantra, setiap warna berasal dari **kenangan leluhur**.",
    "Karyanya hidup saat malam tiba, bercerita pada mereka yang **mau mendengar**.",
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-br from-yellow-900 via-yellow-800 to-amber-900 text-yellow-100 rounded-2xl p-6 sm:p-8 max-w-xl w-full border-2 border-yellow-500 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-bold">📖 Kisah Sang Legenda</h2>
                <button onClick={onClose} className="text-yellow-300 hover:text-white text-2xl cursor-pointer">&times;</button>
              </div>

              <div className="h-40 sm:h-48 flex items-center justify-center">
                <motion.p
                  key={step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.6 }}
                  className="text-lg sm:text-xl leading-relaxed text-center italic"
                  dangerouslySetInnerHTML={{ __html: story[step] }}
                />
              </div>

              <div className="w-full bg-yellow-700/30 rounded-full h-2 mt-4">
                <motion.div
                  className="bg-yellow-400 h-2 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${((step + 1) / story.length) * 100}%` }}
                  transition={{ duration: 0.6 }}
                />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
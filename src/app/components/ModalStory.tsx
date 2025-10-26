"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function ModalStory({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const steps = [
    `<strong>Comiculture Nusantara</strong> mengangkat kisah legenda <strong>Timun Mas</strong> dari Jawa Tengah sebagai inspirasi utama, berpadu dengan slogan <em>MPKMB 62</em>: “<strong>Resonansi Cita Eksplorasi Dunia</strong>”, serta lima elemen <strong>Harsakala</strong> yang menjadi dasar mural ini.`,
    `Legenda <strong>Timun Mas</strong> merepresentasikan keberanian, ketangguhan, kecerdasan, dan semangat pantang menyerah ketika menghadapi rintangan. Nilai-nilai itulah yang menjadi benang merah dalam tiap goresan mural.`,
    `Slogan <strong><em>“Resonansi Cita Eksplorasi Dunia”</em></strong> menegaskan semangat KMPKU IPB 62: berani mengeksplorasi, tangguh menghadapi tantangan, cerdas berinovasi, dan gigih meraih cita.`,
    `<strong>Comiculture Nusantara</strong> menjadi harmoni antara warisan budaya Nusantara dan semangat eksplorasi generasi muda — menciptakan resonansi cita yang terus hidup dan berkembang.`,
  ];

  const AUTO_ADVANCE_MS = 12000;
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setStep(0);
      setPaused(false);
      return;
    }

    if (!paused && step < steps.length - 1) {
      timerRef.current = window.setTimeout(() => {
        setStep((s) => Math.min(s + 1, steps.length - 1));
      }, AUTO_ADVANCE_MS);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isOpen, step, paused]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setStep((s) => Math.min(s + 1, steps.length - 1));
      if (e.key === "ArrowLeft") setStep((s) => Math.max(s - 1, 0));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, onClose, steps.length]);

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));
  const jumpTo = (i: number) => setStep(i);

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" open={isOpen} onClose={onClose} className="relative z-50">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gradient-to-br from-yellow-100/40 via-purple-100/30 to-white/30 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Dialog.Panel
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-br from-[#fffbf5] to-[#f6f0ff] p-5 sm:p-8 shadow-2xl border border-yellow-200/60"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="title text-xl sm:text-2xl md:text-3xl font-extrabold text-yellow-600  tracking-widest">
                      ✨ Filosofi Comiculture Nusantara
                    </h3>
                  </div>

                  <button
                    onClick={onClose}
                    aria-label="Tutup"
                    className="ml-3 shrink-0 rounded-full p-1 text-yellow-600 hover:text-purple-600 cursor-pointer transition"
                  >
                    <span className="text-2xl leading-none">&times;</span>
                  </button>
                </div>

                {/* Isi teks */}
                <div className="mt-6">
                  <div className="min-h-[150px] sm:min-h-[180px] md:min-h-[200px] flex items-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.5 }}
                        className="w-full"
                      >
                        <div
                          className="
                          subtitle
                          max-w-3xl mx-auto 
                          text-purple-800 leading-relaxed text-center
                          text-base sm:text-lg md:text-xl lg:text-[1.3rem] xl:text-[1.35rem]
                          px-2 sm:px-4
                          font-medium tracking-wide"
                          dangerouslySetInnerHTML={{ __html: steps[step] }}
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Tombol Navigasi */}
                  <div className="mt-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap justify-center">
                      <button
                        onClick={goPrev}
                        disabled={step === 0}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition duration-300
                          ${
                            step === 0
                              ? "bg-yellow-100 text-yellow-400 cursor-not-allowed"
                              : "bg-yellow-500 text-white hover:bg-yellow-400 cursor-pointer"
                          }`}
                      >
                        ← Sebelumnya
                      </button>

                      {step === steps.length - 1 ? 
                        <button
                          onClick={onClose}
                          className="
                            px-4 py-2 rounded-xl text-sm bg-purple-600 text-white hover:bg-purple-500 font-semibold transition duration-300
                            cursor-pointer
                          "
                        >
                          Selesai ✅
                        </button>
                      : 
                        <button
                          onClick={goNext}
                          disabled={step === steps.length - 1}
                          className={`px-4 py-2 rounded-xl text-sm font-semibold transition duration-300
                            ${
                              step === steps.length - 1
                                ? "bg-purple-100 text-purple-400 cursor-not-allowed"
                                : "bg-purple-600 text-white hover:bg-purple-500 cursor-pointer"
                            }`}
                        >
                          Berikutnya →
                        </button>
                      }
                    </div>

                    <div className="text-xs text-gray-600 italic text-center sm:text-right">
                      {paused
                        ? "⏸️ Putar otomatis dijeda"
                        : "⏳ Putar otomatis aktif"}
                    </div>
                  </div>

                  {/* Progress bar & dots */}
                  <div className="mt-6">
                    <div className="w-full h-3 bg-purple-100/50 rounded-full overflow-hidden">
                      <motion.div
                        className="h-3 bg-gradient-to-r from-yellow-400 via-yellow-300 to-purple-500 rounded-full"
                        initial={{ width: "0%" }}
                        animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>

                    <div className="mt-3 flex gap-2 justify-center">
                      {steps.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => jumpTo(i)}
                          aria-label={`Langkah ${i + 1}`}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            i === step
                              ? "bg-yellow-400 scale-110 shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                              : "bg-white/60 hover:bg-yellow-200"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Glow efek */}
                <div className="pointer-events-none">
                  <motion.div
                    className="absolute -top-8 left-4 w-36 h-36 rounded-full bg-gradient-radial from-yellow-300/30 to-transparent blur-2xl"
                    animate={{ opacity: [0.4, 0.85, 0.4] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute -bottom-10 right-6 w-44 h-44 rounded-full bg-gradient-radial from-purple-300/30 to-transparent blur-2xl"
                    animate={{ opacity: [0.3, 0.75, 0.3] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
              </Dialog.Panel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
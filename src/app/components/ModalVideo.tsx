"use client";

import { Dialog } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalVideo({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog static as="div" className="relative z-50" open={isOpen} onClose={onClose}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm"
          />

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel as={motion.div}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-black rounded-2xl overflow-hidden max-w-4xl w-full border-2 border-yellow-500 shadow-2xl"
            >
              <div className="flex justify-between items-center p-4 bg-yellow-900 text-yellow-100">
                <h2 className="text-lg sm:text-xl font-bold">🎨 Proses Lukisan Sang Legenda</h2>
                <button onClick={onClose} className="text-yellow-300 hover:text-white text-2xl cursor-pointer">&times;</button>
              </div>

              <div className="aspect-w-16 aspect-h-9">
                <video
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  muted
                  src="/videos/proses-lukisan.mp4"
                  poster="/images/poster-video.jpg"
                />
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
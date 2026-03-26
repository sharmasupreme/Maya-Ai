/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';

export default function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-[#f5f5f5] dark:bg-[#0a0a0a]"
    >
      <div className="relative flex flex-col items-center">
        {/* Outer Ring */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            rotate: { duration: 1.5, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-20 h-20 border-2 border-orange-600/20 border-t-orange-600 rounded-full"
        />
        
        {/* Inner Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-orange-600/20">
            M
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex flex-col items-center gap-1"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">
            Initializing
          </span>
          <div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                className="w-1 h-1 bg-orange-600 rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

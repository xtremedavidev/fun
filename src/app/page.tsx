'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Howl } from 'howler';
import Image from 'next/image';

export default function Home() {
  const [isScanning, setIsScanning] = useState(false);
  const [isMarried, setIsMarried] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [longPressTimer, setLongPressTimer] = useState<NodeJS.Timeout | null>(null);
  const [isPressed, setIsPressed] = useState(false);
  
  const soundRef = useRef<Howl | null>(null);

  // Initialize sound
  useEffect(() => {
    try {
      soundRef.current = new Howl({
        src: ['/celebration.mp3'],
        volume: 0.5,
        preload: true,
      });
    } catch (error) {
      console.log('Sound file not available');
    }
  }, []);

  const handleTouchStart = () => {
    setIsPressed(true);
    const timer = setTimeout(() => {
      startScanning();
    }, 2500);
    setLongPressTimer(timer);
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    if (longPressTimer) {
      clearTimeout(longPressTimer);
      setLongPressTimer(null);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsMarried(true);
      setShowCertificate(true);
      setShowConfetti(true);
      if (soundRef.current) {
        soundRef.current.play();
      }
    }, 2000);
  };

  const confettiColors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD'];

  return (
    <div className="min-h-screen bg-gradient-radial from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20" />
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        
        {/* Initial View */}
        <AnimatePresence>
          {!isMarried && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-white mb-8"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Long-press the fingerprint to scan...
              </motion.h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Fingerprint Button */}
        <motion.div
          className="absolute bottom-8 right-8"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.button
            className={`relative p-4 rounded-full transition-all duration-300 ${
              isPressed 
                ? 'bg-green-500/20 shadow-lg shadow-green-500/50' 
                : 'bg-white/10 hover:bg-white/20'
            }`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleTouchStart}
            onMouseUp={handleTouchEnd}
            onMouseLeave={handleTouchEnd}
            disabled={isScanning}
          >
            {/* Fingerprint Icon */}
            <motion.div
              className="w-16 h-16 text-white"
              animate={isScanning ? {
                scale: [1, 1.2, 1],
                rotate: [0, 360],
              } : {}}
              transition={isScanning ? {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            >
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
                <path d="M16 24C16 18.4772 20.4772 14 26 14H38C43.5228 14 48 18.4772 48 24V40C48 45.5228 43.5228 50 38 50H26C20.4772 50 16 45.5228 16 40V24Z" fill="none" stroke="currentColor" strokeWidth="2"/>
                <path d="M24 28C24 25.7909 25.7909 24 28 24H36C38.2091 24 40 25.7909 40 28V36C40 38.2091 38.2091 40 36 40H28C25.7909 40 24 38.2091 24 36V28Z" fill="currentColor" opacity="0.3"/>
                <circle cx="28" cy="32" r="2" fill="currentColor"/>
                <circle cx="36" cy="32" r="2" fill="currentColor"/>
                <path d="M32 20C32 18.8954 32.8954 18 34 18H30C31.1046 18 32 18.8954 32 20V44C32 45.1046 31.1046 46 30 46H34C32.8954 46 32 45.1046 32 44V20Z" fill="currentColor"/>
              </svg>
            </motion.div>

            {/* Scanning Ripple Effect */}
            {isScanning && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-green-400"
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}

            {/* Pulse Effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/30"
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
        </motion.div>

        {/* Marriage Certificate */}
        <AnimatePresence>
          {showCertificate && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="absolute inset-0 bg-black/50" />
              <motion.div
                className="relative rounded-lg p-6 max-w-md w-full shadow-2xl border-8 border-amber-200 overflow-hidden"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                {/* Brown Paper Background */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/brown-paper.jpg"
                    alt="Brown paper background"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10">
                  {/* Official Header */}
                  <div className="text-center mb-6 border-b-2 border-amber-300 pb-4">
                    <div className="text-xs text-black mb-2 font-wedding">Official Document</div>
                    <h1 className="text-2xl font-algerian font-bold text-amber-900 mb-1">CERTIFICATE OF MARRIAGE</h1>
                    <div className="text-sm text-black font-wedding">Certificate No: MC-2024-001</div>
                  </div>

                  {/* Certificate Content */}
                  <div className="space-y-4 text-amber-900 font-serif">
                    <p className="text-sm leading-relaxed">
                      This is to certify that on this day, a marriage has been solemnized between:
                    </p>
                    
                    <div className="space-y-3">
                      <div className="border-l-4 border-amber-400 pl-4">
                        <div className="text-xs text-black uppercase tracking-wide font-wedding">Groom</div>
                        <div className="text-lg font-bold">David Adebayo</div>
                        <div className="text-xs text-black">Gender: Male | Nationality: Nigerian</div>
                      </div>
                      
                      <div className="text-center text-black">
                        <div className="text-lg font-wedding">AND</div>
                      </div>
                      
                      <div className="border-l-4 border-amber-400 pl-4">
                        <div className="text-xs text-black uppercase tracking-wide font-wedding">Bride</div>
                        <div className="text-lg font-bold">You</div>
                        <div className="text-xs text-black">Gender: Female | Nationality: Guest</div>
                      </div>
                    </div>

                    <div className="text-center py-4">
                      <div className="text-sm text-black mb-2 font-wedding">Date of Marriage</div>
                      <div className="text-lg font-bold">{new Date().toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</div>
                    </div>

                    <div className="text-center py-4">
                      <div className="text-xl font-bold text-amber-800 font-wedding">Congratulations!</div>
                      <div className="text-sm text-black mt-1 font-wedding">May your love be eternal</div>
                    </div>
                  </div>

                  {/* Official Stamps */}
                  <div className="absolute top-4 left-0 z-20">
                    <Image
                      src="/official-stamp.png"
                      alt="Official stamp"
                      width={80}
                      height={80}
                      className="opacity-90"
                    />
                  </div>

                  <div className="absolute bottom-4 left-4 z-20">
                    <Image
                      src="/certified-stamp.png"
                      alt="Certified stamp"
                      width={48}
                      height={48}
                      className="opacity-90"
                    />
                  </div>

                  {/* Fingerprint Stamps */}
                  <div className="absolute bottom-6 right-6 z-20">
                    <div className="text-xs text-black mb-1 text-center font-bold">David's Print</div>
                    <Image
                      src="/fingerprint.png"
                      alt="David's fingerprint"
                      width={48}
                      height={48}
                      className="opacity-80"
                    />
                  </div>

                  <div className="absolute bottom-6 left-20 z-20">
                    <div className="text-xs text-black mb-1 text-center font-bold">Your Print</div>
                    <Image
                      src="/fingerprint.png"
                      alt="Your fingerprint"
                      width={48}
                      height={48}
                      className="opacity-80"
                    />
                  </div>

                  {/* Signature Line - Fixed Alignment */}
                  <div className="mt-8 pt-4 border-t border-amber-300">
                    <div className="grid grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="border-b-2 border-amber-600 w-full h-8 mb-2"></div>
                        <div className="text-xs text-black font-wedding">Authorized Signature</div>
                      </div>
                      <div className="text-center">
                        <div className="border-b-2 border-amber-600 w-full h-8 mb-2"></div>
                        <div className="text-xs text-black font-wedding">Date</div>
                      </div>
                    </div>
                  </div>

                  {/* Close Button */}
                  <button
                    onClick={() => setShowCertificate(false)}
                    className="absolute top-2 right-2 text-black hover:text-amber-900 text-xl bg-amber-100 rounded-full w-8 h-8 flex items-center justify-center z-30"
                  >
                    ×
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confetti Animation */}
        <AnimatePresence>
          {showConfetti && (
            <div className="fixed inset-0 pointer-events-none z-40">
              {[...Array(50)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: confettiColors[i % confettiColors.length],
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                  }}
                  initial={{ y: -10, x: 0, opacity: 1, rotate: 0 }}
                  animate={{
                    y: window.innerHeight + 10,
                    x: Math.random() * 200 - 100,
                    opacity: [1, 1, 0],
                    rotate: 360,
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    ease: "easeOut",
                    delay: Math.random() * 0.5,
                  }}
                  onAnimationComplete={() => {
                    if (i === 49) {
                      setTimeout(() => setShowConfetti(false), 1000);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

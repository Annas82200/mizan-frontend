"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface MizanLogoAnimationProps {
  onComplete?: () => void;
  duration?: number;
  showOnLoad?: boolean;
}

export default function MizanLogoAnimation({ 
  onComplete, 
  duration = 3000,
  showOnLoad = true 
}: MizanLogoAnimationProps) {
  const [isVisible, setIsVisible] = useState(showOnLoad);
  const [animationPhase, setAnimationPhase] = useState<'enter' | 'balance' | 'fade'>('enter');

  useEffect(() => {
    if (!isVisible) return;

    const timer1 = setTimeout(() => {
      setAnimationPhase('balance');
    }, 800);

    const timer2 = setTimeout(() => {
      setAnimationPhase('fade');
    }, duration - 800);

    const timer3 = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isVisible, duration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-white via-gray-50 to-mizan-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background Elements - Inspired by Balance */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Floating Balance Elements */}
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-mizan-teal/20 rounded-full"
              initial={{ 
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: 0,
                opacity: 0
              }}
              animate={{
                y: [null, -20, 0, -10, 0],
                scale: [0, 1, 0.8, 1, 0],
                opacity: [0, 0.6, 0.8, 0.4, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 2.5,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}

          {/* Concentric Circles - Representing Unity and Interconnectedness */}
          {[...Array(4)].map((_, i) => (
            <motion.div
              key={`circle-${i}`}
              className="absolute top-1/2 left-1/2 border border-mizan-teal/20 rounded-full"
              style={{
                width: `${(i + 1) * 200}px`,
                height: `${(i + 1) * 200}px`,
                marginLeft: `-${(i + 1) * 100}px`,
                marginTop: `-${(i + 1) * 100}px`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: [0, 1.2, 1],
                opacity: [0, 0.3, 0.1],
                rotate: [0, 360]
              }}
              transition={{
                duration: 3,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>

        {/* Main Logo Container */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Logo Image with Scale Animation */}
          <motion.div
            className="relative mb-8"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: animationPhase === 'enter' ? [0, 1.2, 1] : 
                     animationPhase === 'balance' ? [1, 1.05, 1] : [1, 0.9, 0],
              rotate: animationPhase === 'enter' ? [-180, 0] : 
                      animationPhase === 'balance' ? [0, 5, -5, 0] : [0, 180],
              y: animationPhase === 'balance' ? [0, -10, 0] : 0
            }}
            transition={{
              duration: animationPhase === 'enter' ? 1.2 : 
                       animationPhase === 'balance' ? 2 : 0.8,
              ease: "easeInOut",
              repeat: animationPhase === 'balance' ? Infinity : 0,
              repeatType: "reverse"
            }}
          >
            <div className="relative w-32 h-32 md:w-40 md:h-40">
              <Image
                src="/logo.png"
                alt="Mizan Logo"
                fill
                className="object-contain"
                priority
              />
              
              {/* Glow Effect */}
              <motion.div
                className="absolute inset-0 bg-mizan-teal/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>

          {/* Brand Name with Typewriter Effect */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-mizan-dark mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              MIZAN
            </motion.h1>
            
            {/* Tagline with Stagger Animation */}
            <motion.div
              className="text-lg md:text-xl text-gray-600 font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.6 }}
            >
              {"Balancing People, Purpose & Performance".split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + i * 0.1, duration: 0.4 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Three Pillars Visualization */}
          <motion.div
            className="flex items-end justify-center mt-8 space-x-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            {[
              { label: 'People', height: 'h-12', color: 'bg-blue-500', delay: 0 },
              { label: 'Purpose', height: 'h-16', color: 'bg-mizan-teal', delay: 0.1 },
              { label: 'Performance', height: 'h-14', color: 'bg-green-500', delay: 0.2 }
            ].map((pillar, i) => (
              <motion.div
                key={pillar.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.4 + pillar.delay, duration: 0.4 }}
              >
                <motion.div
                  className={`w-8 ${pillar.height} ${pillar.color} rounded-t-lg mb-2`}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ 
                    delay: 2.6 + pillar.delay, 
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  style={{ transformOrigin: 'bottom' }}
                />
                <span className="text-xs text-gray-500 font-medium">
                  {pillar.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Loading Indicator */}
          <motion.div
            className="mt-8 flex items-center space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.4 }}
          >
            <div className="flex space-x-1">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-mizan-teal rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-3">
              Initializing platform...
            </span>
          </motion.div>
        </div>

        {/* Fade Out Overlay */}
        {animationPhase === 'fade' && (
          <motion.div
            className="absolute inset-0 bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// Hook for triggering logo animation
export function useMizanLogoAnimation() {
  const [showLogo, setShowLogo] = useState(false);

  const triggerAnimation = () => {
    setShowLogo(true);
  };

  const handleComplete = () => {
    setShowLogo(false);
  };

  return {
    showLogo,
    triggerAnimation,
    handleComplete,
    LogoAnimation: () => showLogo ? (
      <MizanLogoAnimation 
        onComplete={handleComplete}
        showOnLoad={false}
      />
    ) : null
  };
}

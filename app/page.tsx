'use client'; // This directive is required for Next.js App Router

import React, { useState, useEffect } from 'react';
import { Heart, Stars, Gift, Music, Camera, Calendar } from 'lucide-react';

const ValentineApp = () => {
  const [noCount, setNoCount] = useState(0);
  const [yesPressed, setYesPressed] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; animationDuration: number; opacity: number }>>([]);

  // Phrases that appear on the "No" button
  const phrases = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you absolutely certain?",
    "This could be a mistake!",
    "Have a heart!",
    "Don't be so cold!",
    "Change of heart?",
    "Wouldn't you reconsider?",
    "Is that your final answer?",
    "You're breaking my heart ;(",
  ];

  // Generate floating hearts for the background
  useEffect(() => {
    const createHeart = () => {
      return {
        id: Math.random(),
        left: Math.random() * 100,
        animationDuration: Math.random() * 3 + 2,
        opacity: Math.random() * 0.5 + 0.3,
      };
    };

    const initialHearts = Array.from({ length: 20 }, createHeart);
    setHearts(initialHearts);

    const interval = setInterval(() => {
      setHearts(prev => {
        const newHearts = prev.filter(h => h.id > 0.1); 
        return [...prev]; 
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Calculate "Yes" button size
  const yesButtonSize = noCount * 20 + 16;

  // Handle "No" button click
  const handleNoClick = () => {
    setNoCount(noCount + 1);
  };

  // Get current text for "No" button
  const getNoButtonText = () => {
    return phrases[Math.min(noCount, phrases.length - 1)];
  };

  // Background floating hearts styles
  const FloatingHeart = ({ style }: { style: { left: number; animationDuration: number; opacity: number } }) => (
    <div 
      className="absolute text-pink-200 pointer-events-none animate-float"
      style={{
        left: `${style.left}%`,
        bottom: '-20px',
        animation: `float ${style.animationDuration}s linear infinite`,
        opacity: style.opacity,
        fontSize: `${Math.random() * 20 + 10}px`
      }}
    >
      <Heart fill="currentColor" />
    </div>
  );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-pink-100 via-red-50 to-pink-200 overflow-hidden flex flex-col items-center justify-center p-4 selection:bg-pink-200">
      
      {/* CSS for custom animation */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        .animate-float {
          animation-name: float;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>

      {/* Floating Background Hearts */}
      <div className="absolute inset-0 overflow-hidden">
        {hearts.map((h) => (
          <FloatingHeart key={h.id} style={h} />
        ))}
      </div>

      {yesPressed ? (
        // SUCCESS STATE
        <div className="z-10 text-center animate-fade-in space-y-6">
          <div className="relative inline-block">
            {/* Note: In a real Next.js app, you might use the <Image> component from 'next/image' here */}
            <img 
              src="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif" 
              alt="Cute bear kissing" 
              className="w-64 h-64 object-cover rounded-2xl shadow-2xl border-4 border-white mx-auto"
            />
            <Heart className="absolute -top-6 -right-6 text-red-500 w-12 h-12 animate-bounce" fill="currentColor" />
            <Heart className="absolute -bottom-6 -left-6 text-red-500 w-12 h-12 animate-bounce" style={{animationDelay: '0.5s'}} fill="currentColor" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-red-600 drop-shadow-sm font-serif">
            YAY!!! I knew you'd say yes!
          </h1>
          <p className="text-xl text-pink-700 font-medium">
            Best Valentine ever. ❤️
          </p>
          
          {/* Virtual Ticket */}
          <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm mx-auto mt-8 border-dashed border-2 border-pink-300 transform rotate-2 hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center justify-between border-b border-pink-100 pb-4 mb-4">
              <span className="text-pink-500 font-bold tracking-widest">TICKET</span>
              <div className="flex gap-1">
                <Stars className="w-4 h-4 text-yellow-400" />
                <Stars className="w-4 h-4 text-yellow-400" />
                <Stars className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-gray-700">
                <Calendar className="w-5 h-5 text-pink-500" />
                <span>Feb 14th, 2026</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Music className="w-5 h-5 text-pink-500" />
                <span>Romantic Dinner & Vibes</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <Camera className="w-5 h-5 text-pink-500" />
                <span>Memories with Me</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-pink-100 text-center text-xs text-gray-400 uppercase tracking-widest">
              Admit One • Non-Refundable
            </div>
          </div>
        </div>
      ) : (
        // QUESTION STATE
        <div className="z-10 flex flex-col items-center text-center max-w-2xl w-full">
          <div className="mb-8 relative group">
            <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
            <img 
              src="https://media.tenor.com/K2s47jJ8lC8AAAAi/cute-bear.gif" 
              alt="Cute bear asking" 
              className="relative w-48 h-48 md:w-64 md:h-64 object-contain mx-auto mix-blend-multiply filter drop-shadow-xl hover:scale-105 transition-transform duration-300" 
            />
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-red-600 mb-8 leading-tight drop-shadow-sm px-4">
            Will you be my Valentine?
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 w-full px-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 flex items-center gap-2"
              style={{ fontSize: yesButtonSize }}
              onClick={() => setYesPressed(true)}
            >
              <Heart className={yesButtonSize > 20 ? "w-8 h-8 md:w-12 md:h-12 animate-pulse" : "w-5 h-5"} fill="currentColor" />
              Yes
            </button>

            <button
              className="bg-red-400 hover:bg-red-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 whitespace-nowrap"
              onClick={handleNoClick}
            >
              {noCount === 0 ? "No" : getNoButtonText()}
            </button>
          </div>
          
          <div className="mt-12 opacity-60">
            <Gift className="w-6 h-6 text-pink-400 mx-auto animate-bounce" />
            <p className="text-sm text-pink-400 mt-2">Special surprise inside...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValentineApp;
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

// Declare ttq for TypeScript
declare global {
  interface Window {
    ttq: any;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const carouselImages = [
    "https://i.ibb.co/n8LSGBxP/Slide-4-3-2.png?v=2",
    "https://i.ibb.co/hJn86xC1/Slide-4-3-3.png",
    "https://i.ibb.co/7JcczrfV/Slide-4-3-1.png",
  ];

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentImageIndex((prev) => {
      let nextIndex = prev + newDirection;
      if (nextIndex >= carouselImages.length) nextIndex = 0;
      if (nextIndex < 0) nextIndex = carouselImages.length - 1;
      return nextIndex;
    });
  };

  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipe = Math.abs(offset.x) * velocity.x;
    if (swipe < -10000 || offset.x < -50) {
      paginate(1);
    } else if (swipe > 10000 || offset.x > 50) {
      paginate(-1);
    }
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0
    })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleJoin = () => {
    // 1. Fire pixel
    if (window.ttq) {
      window.ttq.track('CompleteRegistration');
    }

    // 2. Delay 300ms
    setTimeout(() => {
      const tgHash = 'kmRViHrt8L1mMTgy';
      const tgUrl = `https://t.me/+${tgHash}`;
      
      // 3. Check device
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
      const isAndroid = /android/i.test(userAgent);

      if (isAndroid) {
        // Intent redirect for Android to bypass TikTok in-app browser
        const intentUrl = `intent://join?invite=${tgHash}#Intent;scheme=tg;package=org.telegram.messenger;S.browser_fallback_url=${encodeURIComponent(tgUrl)};end`;
        window.location.href = intentUrl;
      } else {
        // Standard redirect for iOS/PC
        window.location.href = tgUrl;
      }
    }, 300);
  };

  return (
    <div className="min-h-screen bg-[#161616] text-white font-sans selection:bg-[#EF4444] selection:text-white relative z-0 flex flex-col">
      {/* Grid Background */}
      <div className="fixed inset-0 pointer-events-none -z-10" style={{
        backgroundImage: `
          linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50vw 50vh'
      }} />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#161616]"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              className="w-12 h-12 border-4 border-[#333] border-t-[#EF4444] rounded-full"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 w-full max-w-4xl mx-auto px-6 pt-10 pb-6 flex flex-col items-start relative z-10">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.15] tracking-tight mb-4 text-left">
            Разбор кейса: <span className="underline decoration-[#EF4444] decoration-4 underline-offset-4">300к₽/мес</span> на трафике
          </h1>
          <p className="text-[#A3A3A3] text-xl md:text-2xl leading-tight text-left max-w-3xl">
            Рассказываю всю схему перелива трафика, и как тебе сделать также
          </p>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="w-full mb-8 flex justify-center"
        >
          <motion.button
            onClick={handleJoin}
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="py-4 px-10 bg-[#EF4444] hover:bg-[#DC2626] text-white text-xl font-bold rounded-lg transition-colors whitespace-nowrap shadow-lg shadow-red-500/20"
          >
            Перейти в Telegram
          </motion.button>
        </motion.div>

        {/* Carousel Section */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="w-full mb-12"
        >
          <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-black/60 group bg-[#222]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.img
                key={currentImageIndex}
                src={carouselImages[currentImageIndex]}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3 }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={handleDragEnd}
                draggable={false}
                className="absolute inset-0 w-full h-full object-cover cursor-grab active:cursor-grabbing touch-pan-y"
                alt={`Слайд ${currentImageIndex + 1}`}
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setDirection(idx > currentImageIndex ? 1 : -1);
                    setCurrentImageIndex(idx);
                  }}
                  className={`w-2 h-2 rounded-full transition-all ${
                    idx === currentImageIndex ? 'bg-[#EF4444] w-4' : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Footer Links */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-auto pt-8 w-full text-center text-xs text-gray-500 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a href="#" className="hover:text-gray-300 transition-colors">Политика конфиденциальности</a>
          <a href="#" className="hover:text-gray-300 transition-colors">Условия использования</a>
        </motion.div>

      </main>
    </div>
  );
}

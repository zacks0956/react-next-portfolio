'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useState } from 'react';

export default function Hero() {
  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const [isContactClicked, setIsContactClicked] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  };

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center px-6 pt-20">
      <motion.div
        className="max-w-3xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 mb-8">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <span className="text-neutral-400 text-sm">現在、お仕事募集中</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold text-neutral-100 mb-6 leading-tight"
        >
          デジタル体験を構築する
          <br />
          <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            フロントエンド開発者
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className="text-lg md:text-xl text-neutral-400 mb-12 leading-relaxed max-w-2xl mx-auto"
        >
          ReactとNext.jsを中心としたモダンな技術で、高品質なウェブアプリケーションを開発しています。
          <br />
          ユーザー体験を第一に考え、美しく機能的なインターフェースを創造します。
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center">
          <motion.button
            onClick={() => {
              scrollToAbout();
              setIsDetailClicked(true);
            }}
            animate={isDetailClicked ? { 
              rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
            } : { rotate: 0 }}
            transition={isDetailClicked ? {
              duration: 0.6,
              ease: "easeInOut"
            } : { type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.2 }
            }}
            className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
          >
            詳しく見る
          </motion.button>
          <motion.a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              const element = document.getElementById('contact');
              if (element) {
                const offset = 80;
                const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
                window.scrollTo({
                  top: elementPosition - offset,
                  behavior: 'smooth'
                });
              }
              setIsContactClicked(true);
            }}
            animate={isContactClicked ? { 
              rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
            } : { rotate: 0 }}
            transition={isContactClicked ? {
              duration: 0.6,
              ease: "easeInOut"
            } : { type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ 
              scale: 0.95,
              transition: { duration: 0.2 }
            }}
            className="px-8 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg font-medium transition-colors inline-block relative overflow-hidden"
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-500/20"
              initial={{ x: '-100%' }}
              whileTap={{ 
                x: '100%',
                transition: { duration: 0.6 }
              }}
            />
            <span className="relative">お問い合わせ</span>
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className="mt-20 flex justify-center"
        >
          <motion.button
            onClick={scrollToAbout}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="text-neutral-500 hover:text-neutral-300 transition-colors"
          >
            <ArrowDown size={32} />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
}

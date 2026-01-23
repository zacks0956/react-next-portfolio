'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [clickedButton, setClickedButton] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setClickedButton(id);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-xl font-bold text-neutral-100 hover:text-white transition-colors"
          >
            Code by <span className="text-blue-400">Sho</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <motion.button
              onClick={() => scrollToSection('about')}
              animate={clickedButton === 'about' ? { 
                rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
              } : { rotate: 0 }}
              transition={clickedButton === 'about' ? {
                duration: 0.6,
                ease: "easeInOut"
              } : { type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              概要
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('skills')}
              animate={clickedButton === 'skills' ? { 
                rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
              } : { rotate: 0 }}
              transition={clickedButton === 'skills' ? {
                duration: 0.6,
                ease: "easeInOut"
              } : { type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              スキル
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('projects')}
              animate={clickedButton === 'projects' ? { 
                rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
              } : { rotate: 0 }}
              transition={clickedButton === 'projects' ? {
                duration: 0.6,
                ease: "easeInOut"
              } : { type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              プロジェクト
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              animate={clickedButton === 'contact' ? { 
                rotate: [-4, 3, -2, 1, -3, 2, -1, 0],
              } : { rotate: 0 }}
              transition={clickedButton === 'contact' ? {
                duration: 0.6,
                ease: "easeInOut"
              } : { type: "spring", stiffness: 300, damping: 20 }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              お問い合わせ
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-neutral-300 hover:text-white"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-4 border-t border-neutral-800 pt-4">
            <motion.button
              onClick={() => scrollToSection('about')}
              whileTap={{ scale: 0.95, x: 10 }}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              概要
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('skills')}
              whileTap={{ scale: 0.95, x: 10 }}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              スキル
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('projects')}
              whileTap={{ scale: 0.95, x: 10 }}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              プロジェクト
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileTap={{ scale: 0.95, x: 10 }}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              お問い合わせ
            </motion.button>
          </div>
        )}
      </nav>
    </header>
  );
}

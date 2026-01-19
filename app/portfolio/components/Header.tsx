'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
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
            Code by <span className="text-blue-400">太郎</span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <button
              onClick={() => scrollToSection('about')}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              概要
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              スキル
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              プロジェクト
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-300 hover:text-white transition-colors text-sm"
            >
              お問い合わせ
            </button>
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
            <button
              onClick={() => scrollToSection('about')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              概要
            </button>
            <button
              onClick={() => scrollToSection('skills')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              スキル
            </button>
            <button
              onClick={() => scrollToSection('projects')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              プロジェクト
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-neutral-300 hover:text-white transition-colors text-left"
            >
              お問い合わせ
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

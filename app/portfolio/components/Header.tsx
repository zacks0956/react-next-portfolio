'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './Header.module.css';

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
      className={`${styles.header} ${
        isScrolled ? styles.headerScrolled : ''
      }`}
    >
      <nav className={styles.nav}>
        <div className={styles.navContent}>
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={styles.logo}
          >
            Code by <span className={styles.brandHighlight}>Sho</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${styles.mobileMenuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu */}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <motion.button
              onClick={() => scrollToSection('about')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              概要
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('skills')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              スキル
            </motion.button>
            <motion.button
              onClick={() => scrollToSection('news')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              ニュース
            </motion.button>
            <Link href="/blog">
              <motion.div
                whileTap={{ scale: 0.95, x: 10 }}
                onClick={() => {
                  setClickedButton('blog');
                  setIsMobileMenuOpen(false);
                }}
                className={styles.navButton}
              >
                ブログ
              </motion.div>
            </Link>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              お問い合わせ
            </motion.button>
          </div>
        )}
      </nav>
    </header>
  );
}

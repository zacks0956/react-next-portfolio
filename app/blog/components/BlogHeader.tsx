'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import styles from './BlogHeader.module.css';

export default function BlogHeader() {
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

  const navigateToPortfolioSection = (sectionId: string) => {
    setClickedButton(sectionId);
    window.location.href = `/portfolio#${sectionId}`;
    setIsMobileMenuOpen(false);
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
          <Link
            href="/portfolio"
            className={styles.logo}
          >
            Code by <span className={styles.brandHighlight}>Sho</span>
          </Link>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`${styles.menuButton} ${isMobileMenuOpen ? styles.active : ''}`}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu */}
        {isMobileMenuOpen && (
          <div className={styles.menu}>
            <motion.button
              onClick={() => navigateToPortfolioSection('about')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              概要
            </motion.button>
            <motion.button
              onClick={() => navigateToPortfolioSection('skills')}
              whileTap={{ scale: 0.95, x: 10 }}
              className={styles.navButton}
            >
              スキル
            </motion.button>
            <motion.button
              onClick={() => navigateToPortfolioSection('news')}
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
              onClick={() => navigateToPortfolioSection('contact')}
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

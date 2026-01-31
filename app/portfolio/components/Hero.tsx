'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import styles from './Hero.module.css';

export default function Hero() {
  const [isDetailClicked, setIsDetailClicked] = useState(false);
  const [isContactClicked, setIsContactClicked] = useState(false);
  const [fallenLetters, setFallenLetters] = useState<Set<number>>(new Set());
  const [glitchingLetters, setGlitchingLetters] = useState<Set<number>>(new Set());
  const letterRefs = useRef<Map<number, HTMLSpanElement>>(new Map());
  const originalPositions = useRef<Map<number, { x: number; y: number }>>(new Map());
  
  const mainText = "Perfectly Imperfect.";
  const letters = useMemo(() => mainText.split('').map((char, i) => ({ char, id: i })), []);

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut' as const,
      },
    },
  }), []);

  const scrollToAbout = useCallback(() => {
    const element = document.getElementById('about');
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  }, []);

  // Initialize letter positions
  useEffect(() => {
    letterRefs.current.forEach((letterEl, id) => {
      if (letterEl) {
        const rect = letterEl.getBoundingClientRect();
        originalPositions.current.set(id, { 
          x: rect.left + window.scrollX, 
          y: rect.top + window.scrollY 
        });
      }
    });
  }, []);

  // Trigger random letter falls
  useEffect(() => {
    const delays = [1000, 1500, 2000, 2500, 3000, 3500];
    const timers: NodeJS.Timeout[] = [];

    // Select random letters to fall (skip spaces)
    const fallableLetters = letters.filter(l => l.char !== ' ');
    const selectedCount = Math.min(5, Math.floor(fallableLetters.length * 0.3));
    
    const shuffled = [...fallableLetters].sort(() => Math.random() - 0.5);
    const toFall = shuffled.slice(0, selectedCount);

    toFall.forEach((letter, idx) => {
      const delay = delays[idx % delays.length] + Math.random() * 1000;
      const timer = setTimeout(() => {
        startFalling(letter.id);
      }, delay);
      timers.push(timer);
    });

    return () => timers.forEach(t => clearTimeout(t));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startFalling = (id: number) => {
    const letterEl = letterRefs.current.get(id);
    if (!letterEl) return;

    const rect = letterEl.getBoundingClientRect();
    const startX = rect.left;
    const startY = rect.top;
    
    // Store original position
    originalPositions.current.set(id, { 
      x: startX + window.scrollX, 
      y: startY + window.scrollY 
    });

    // Random physics
    const fallDistance = window.innerHeight - startY + 50;
    const rotation = (Math.random() - 0.5) * 720; // -360 to 360 degrees
    const horizontalDrift = (Math.random() - 0.5) * 100;
    const fallDuration = 1.5 + Math.random() * 1.0; // 1.5-2.5s

    letterEl.style.position = 'fixed';
    letterEl.style.left = `${startX}px`;
    letterEl.style.top = `${startY}px`;
    letterEl.style.transition = `transform ${fallDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
    letterEl.style.transform = `translate(${horizontalDrift}px, ${fallDistance}px) rotate(${rotation}deg)`;
    letterEl.classList.add(styles.falling);

    setFallenLetters(prev => new Set(prev).add(id));

    // Trigger glitch on impact
    setTimeout(() => {
      triggerGlitch(id);
    }, fallDuration * 1000);
  };

  const triggerGlitch = (id: number) => {
    setGlitchingLetters(prev => new Set(prev).add(id));
    setTimeout(() => {
      setGlitchingLetters(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 300);
  };

  const handleLetterHover = (id: number) => {
    if (!fallenLetters.has(id)) return;

    const letterEl = letterRefs.current.get(id);
    const originalPos = originalPositions.current.get(id);
    
    if (!letterEl || !originalPos) return;

    // Magnetic recovery
    triggerGlitch(id);
    
    letterEl.classList.remove(styles.falling);
    letterEl.classList.add(styles.recovering);
    letterEl.style.position = 'absolute';
    letterEl.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
    letterEl.style.transform = 'translate(0, 0) rotate(0deg)';
    letterEl.style.left = '0';
    letterEl.style.top = '0';

    setTimeout(() => {
      letterEl.classList.remove(styles.recovering);
      letterEl.style.position = 'relative';
      setFallenLetters(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 800);
  };

  return (
    <section className={styles.heroContainer}>
      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Status Badge */}
        <motion.div variants={itemVariants} className={styles.statusBadge}>
          <span className={styles.pulseContainer}>
            <span className={styles.pulseDot}></span>
            <span className={styles.pulseCore}></span>
          </span>
          <span className="text-neutral-400 text-sm">現在、お仕事募集中</span>
        </motion.div>

        {/* Name */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100">
            Suzaku Sho
          </h2>
        </motion.div>

        {/* Main Headline with Glitch Effect */}
        <motion.div variants={itemVariants}>
          <h1 className={styles.glitchTitle}>
            {letters.map(({ char, id }) => (
              <span 
                key={id} 
                className={styles.letterWrapper}
              >
                <span
                  ref={(el) => {
                    if (el) letterRefs.current.set(id, el);
                  }}
                  className={`${styles.letter} ${
                    glitchingLetters.has(id) ? styles.glitch : ''
                  } ${
                    glitchingLetters.has(id) ? styles.rgbSplit : ''
                  }`}
                  data-text={char}
                  onMouseEnter={() => handleLetterHover(id)}
                  style={{
                    display: char === ' ' ? 'inline' : 'inline-block',
                    minWidth: char === ' ' ? '0.5rem' : undefined,
                  }}
                >
                  {char}
                </span>
              </span>
            ))}
          </h1>
          <div className={styles.subtitle}>
            完璧に、不完全
          </div>
        </motion.div>

        {/* Sub-headline */}
        <motion.p
          variants={itemVariants}
          className={styles.description}
        >
          完璧を目指し、不完全さを払拭することで成長する
          <br />
          試行錯誤と学びを重ね、より良いものを
          <br />創り上げていくことを大切にしています
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className={styles.ctaButtons}>
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
            className={styles.primaryButton}
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
            className={styles.secondaryButton}
          >
            お問い合わせ
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          variants={itemVariants}
          className={styles.scrollIndicator}
        >
          <button
            onClick={scrollToAbout}
            className={styles.scrollButton}
          >
            <ArrowDown size={32} />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

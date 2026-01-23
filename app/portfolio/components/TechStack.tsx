'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import Image from 'next/image';
import styles from './TechStack.module.css';

const technologies = [
  { name: 'HTML5', icon: '/html.png' },
  { name: 'CSS3', icon: '/css.png' },
  { name: 'Tailwind CSS', icon: '/tailwind.png' },
  { name: 'JavaScript', icon: '/javascript.png' },
  { name: 'TypeScript', icon: '/typescript.png' },
  { name: 'React', icon: '/react.png' },
  { name: 'Next.js', icon: '/nextjs.png' },
  { name: 'Node.js', icon: '/nodejs.png' },
  { name: 'Git', icon: '/git.png' },
  { name: 'GitHub', icon: '/github.png' },
  { name: 'Vercel', icon: '/vercel.png' },
  { name: 'Python', icon: '/python.png' },
];

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [clickedTech, setClickedTech] = useState<string | null>(null);
  const [crackedTech, setCrackedTech] = useState<Set<string>>(new Set());
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [deletedTech, setDeletedTech] = useState<Set<string>>(new Set());
  const [explodingTech, setExplodingTech] = useState<string | null>(null);

  const handleTechClick = (techName: string) => {
    if (deletedTech.has(techName)) return;
    
    setClickedTech(techName);
    
    const newCount = (clickCounts[techName] || 0) + 1;
    setClickCounts(prev => ({ ...prev, [techName]: newCount }));
    
    // ひび割れを追加
    setCrackedTech(prev => new Set(prev).add(techName));
    
    // 5回クリックで破壊
    if (newCount >= 5) {
      setExplodingTech(techName);
      
      // 星のアニメーション後に削除
      setTimeout(() => {
        setDeletedTech(prev => new Set(prev).add(techName));
        setExplodingTech(null);
      }, 2500);
    }
  };

  const visibleTechnologies = technologies.filter(tech => !deletedTech.has(tech.name));

  return (
    <section id="skills" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12">
            技術スタック
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {visibleTechnologies.map((tech, index) => (
              <motion.div
                key={tech.name}
                layout={explodingTech === tech.name ? false : "position"}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={
                  explodingTech === tech.name
                    ? { opacity: 0, scale: 0, rotate: 180 }
                    : isInView
                    ? clickedTech === tech.name
                      ? { opacity: 1, scale: 1, rotate: [-4, 3, -2, 1, -3, 2, -1, 0] }
                      : { opacity: 1, scale: 1, rotate: 0 }
                    : { opacity: 0, scale: 0.8 }
                }
                transition={{
                  duration: explodingTech === tech.name ? 1 : clickedTech === tech.name ? 0.6 : 0.5,
                  delay: explodingTech === tech.name ? 0 : index * 0.1,
                  type: clickedTech === tech.name ? "tween" : "spring",
                  ease: clickedTech === tech.name ? "easeInOut" : undefined,
                  stiffness: 300,
                  damping: 20
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95, transition: { duration: 0.2 } }}
                onClick={() => handleTechClick(tech.name)}
                className={styles.techCard}
              >
                {/* ひび割れエフェクト */}
                {crackedTech.has(tech.name) && explodingTech !== tech.name && (
                  <>
                    {[...Array(Math.min((clickCounts[tech.name] || 0) * 2, 10))].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 0.6 }}
                        className={styles.crackLine}
                        style={{
                          width: '100%',
                          height: '1px',
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${i * 36}deg) translateX(-50%)`,
                        }}
                      />
                    ))}
                    {[...Array(Math.min((clickCounts[tech.name] || 0) * 3, 15))].map((_, i) => (
                      <motion.div
                        key={`crack-${i}`}
                        initial={{ scaleY: 0, opacity: 0 }}
                        animate={{ scaleY: 1, opacity: 0.5 }}
                        className={styles.crackLineSecondary}
                        style={{
                          width: '2px',
                          height: `${Math.random() * 50 + 30}px`,
                          top: '50%',
                          left: '50%',
                          transform: `rotate(${Math.random() * 360}deg) translateX(-50%)`,
                        }}
                      />
                    ))}
                  </>
                )}

                {/* 破壊エフェクト（星） */}
                {explodingTech === tech.name && (
                  <>
                    {[...Array(25)].map((_, i) => {
                      const angle = (i / 25) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
                      const distance = 60 + Math.random() * 40;
                      const initialX = Math.cos(angle) * distance;
                      const initialY = Math.sin(angle) * distance;
                      const fallSpeed = 300 + Math.random() * 200;
                      const drift = (Math.random() - 0.5) * 150;
                      
                      return (
                        <motion.div
                          key={`star-${i}`}
                          initial={{ scale: 0, x: 0, y: 0, opacity: 0, rotate: 0 }}
                          animate={{ 
                            scale: [0, 0.8, 0.6, 0.3, 0],
                            x: [0, initialX * 0.7, initialX + drift * 0.3, drift],
                            y: [0, initialY * 0.5, initialY * 0.3, fallSpeed],
                            opacity: [0, 0.9, 0.7, 0.4, 0],
                            rotate: [0, 90, 180, 270, 360]
                          }}
                          transition={{ 
                            duration: 2.5,
                            ease: [0.25, 0.1, 0.25, 1],
                            times: [0, 0.15, 0.4, 0.7, 1]
                          }}
                          className={
                            i % 3 === 0 ? styles.particleStarGold :
                            i % 3 === 1 ? styles.particleStarBlue :
                            styles.particleStar
                          }
                          style={{
                            width: `${3 + Math.random() * 4}px`,
                            height: `${3 + Math.random() * 4}px`,
                            top: '50%',
                            left: '50%',
                            filter: 'blur(0.5px)',
                          }}
                        />
                      );
                    })}
                    
                    {/* 光の波紋 - より儚く */}
                    {[...Array(2)].map((_, i) => (
                      <motion.div
                        key={`wave-${i}`}
                        initial={{ scale: 0, opacity: 0.5 }}
                        animate={{ 
                          scale: [0, 2.5, 4],
                          opacity: [0.5, 0.2, 0]
                        }}
                        transition={{ duration: 1.5, delay: i * 0.2 }}
                        className={styles.shockwave}
                        style={{
                          width: '80px',
                          height: '80px',
                        }}
                      />
                    ))}
                  </>
                )}
                
                <div className="relative w-12 h-12">
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-neutral-300 text-sm font-medium text-center">
                  {tech.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

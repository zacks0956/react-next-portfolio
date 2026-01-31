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
  const [cracks, setCracks] = useState<Record<string, Array<{ direction: string; position: number; pathData: string }>>>({});
  const [clickCounts, setClickCounts] = useState<Record<string, number>>({});
  const [deletedTech, setDeletedTech] = useState<Set<string>>(new Set());
  const [explodingTech, setExplodingTech] = useState<string | null>(null);

  // ジグザグの亀裂パスを生成
  const generateCrackPath = (direction: string, position: number, length: number = 50) => {
    const segments = 8; // ジグザグのセグメント数
    const segmentLength = length / segments;
    const maxDeviation = 8; // 最大のずれ幅
    
    let path = 'M';
    let points: { x: number; y: number }[] = [];
    
    // 方向に応じて開始点と進行方向を設定
    if (direction === 'top') {
      points.push({ x: position, y: 0 });
      for (let i = 1; i <= segments; i++) {
        const deviation = (Math.random() - 0.5) * maxDeviation;
        points.push({
          x: position + deviation,
          y: (i / segments) * length
        });
      }
    } else if (direction === 'bottom') {
      points.push({ x: position, y: 100 });
      for (let i = 1; i <= segments; i++) {
        const deviation = (Math.random() - 0.5) * maxDeviation;
        points.push({
          x: position + deviation,
          y: 100 - (i / segments) * length
        });
      }
    } else if (direction === 'left') {
      points.push({ x: 0, y: position });
      for (let i = 1; i <= segments; i++) {
        const deviation = (Math.random() - 0.5) * maxDeviation;
        points.push({
          x: (i / segments) * length,
          y: position + deviation
        });
      }
    } else if (direction === 'right') {
      points.push({ x: 100, y: position });
      for (let i = 1; i <= segments; i++) {
        const deviation = (Math.random() - 0.5) * maxDeviation;
        points.push({
          x: 100 - (i / segments) * length,
          y: position + deviation
        });
      }
    }
    
    // pathデータを生成
    path += `${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      path += ` L${points[i].x} ${points[i].y}`;
    }
    
    return path;
  };

  const handleTechClick = (techName: string) => {
    if (deletedTech.has(techName)) return;
    
    setClickedTech(techName);
    
    const newCount = (clickCounts[techName] || 0) + 1;
    setClickCounts(prev => ({ ...prev, [techName]: newCount }));
    
    // ランダムな方向に大きな亀裂を追加
    const directions = ['top', 'right', 'bottom', 'left'];
    const randomDirection = directions[Math.floor(Math.random() * directions.length)];
    const randomPosition = Math.random() * 60 + 20; // 20-80%の範囲
    const pathData = generateCrackPath(randomDirection, randomPosition);
    
    setCracks(prev => ({
      ...prev,
      [techName]: [
        ...(prev[techName] || []),
        { direction: randomDirection, position: randomPosition, pathData }
      ]
    }));
    
    // 5回クリックで破壊
    if (newCount >= 5) {
      setExplodingTech(techName);
      
      // 星のアニメーション後に削除
      setTimeout(() => {
        setDeletedTech(prev => new Set(prev).add(techName));
        setExplodingTech(null);
        setCracks(prev => {
          const newCracks = { ...prev };
          delete newCracks[techName];
          return newCracks;
        });
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
                {/* 亀裂エフェクト */}
                {cracks[tech.name] && explodingTech !== tech.name && (
                  <svg
                    className={styles.crackSvg}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                  >
                    {cracks[tech.name].map((crack, i) => (
                      <g key={i}>
                        {/* メインの亀裂 */}
                        <motion.path
                          d={crack.pathData}
                          stroke="rgba(255, 255, 255, 0.8)"
                          strokeWidth="0.5"
                          fill="none"
                          filter="drop-shadow(0 0 2px rgba(255, 255, 255, 0.5))"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: 1 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                        />
                        {/* 光る効果 */}
                        <motion.path
                          d={crack.pathData}
                          stroke="rgba(96, 165, 250, 0.6)"
                          strokeWidth="0.3"
                          fill="none"
                          initial={{ pathLength: 0, opacity: 0 }}
                          animate={{ pathLength: 1, opacity: [0, 1, 0.3] }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                      </g>
                    ))}
                    
                    {/* 派生する小さな亀裂 */}
                    {cracks[tech.name].map((crack, crackIndex) => (
                      [...Array(4)].map((_, i) => {
                        const angle = (Math.random() - 0.5) * 50;
                        const branchLength = 10 + Math.random() * 15;
                        
                        // メイン亀裂の途中からブランチを生成
                        const branchPoint = 30 + Math.random() * 40;
                        let startX = 0, startY = 0, endX = 0, endY = 0;
                        
                        if (crack.direction === 'top' || crack.direction === 'bottom') {
                          startX = crack.position;
                          startY = crack.direction === 'top' ? branchPoint : (100 - branchPoint);
                          endX = startX + Math.sin(angle * Math.PI / 180) * branchLength;
                          endY = startY + (crack.direction === 'top' ? 1 : -1) * Math.cos(angle * Math.PI / 180) * branchLength;
                        } else {
                          startY = crack.position;
                          startX = crack.direction === 'left' ? branchPoint : (100 - branchPoint);
                          endY = startY + Math.sin(angle * Math.PI / 180) * branchLength;
                          endX = startX + (crack.direction === 'left' ? 1 : -1) * Math.cos(angle * Math.PI / 180) * branchLength;
                        }
                        
                        // ブランチもジグザグに
                        const midX = (startX + endX) / 2 + (Math.random() - 0.5) * 3;
                        const midY = (startY + endY) / 2 + (Math.random() - 0.5) * 3;
                        const branchPath = `M${startX} ${startY} L${midX} ${midY} L${endX} ${endY}`;
                        
                        return (
                          <motion.path
                            key={`branch-${crackIndex}-${i}`}
                            d={branchPath}
                            stroke="rgba(255, 255, 255, 0.5)"
                            strokeWidth="0.3"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ pathLength: 1, opacity: 0.6 }}
                            transition={{ duration: 0.3, delay: 0.2 + i * 0.05 }}
                          />
                        );
                      })
                    ))}
                  </svg>
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

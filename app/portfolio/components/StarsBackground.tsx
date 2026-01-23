'use client';

import { useEffect, useState } from 'react';
import styles from './StarsBackground.module.css';

interface Star {
  id: number;
  left: string;
  top: string;
  size: number;
  animationDelay: string;
  animationDuration: string;
}

interface TrailStar {
  id: number;
  x: number;
  y: number;
}

export default function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);
  const [trailStars, setTrailStars] = useState<TrailStar[]>([]);

  useEffect(() => {
    // ランダムな位置に星を生成
    const generateStars = () => {
      const starCount = 100;
      const newStars: Star[] = [];

      for (let i = 0; i < starCount; i++) {
        newStars.push({
          id: i,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          size: Math.random() * 2 + 1,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 3 + 2}s`,
        });
      }

      setStars(newStars);
    };

    generateStars();

    // マウストラッキング
    let starId = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const newStar: TrailStar = {
        id: starId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrailStars(prev => {
        const updated = [...prev, newStar];
        // 最新の20個のみ保持
        return updated.slice(-20);
      });

      // 星を一定時間後に削除
      setTimeout(() => {
        setTrailStars(prev => prev.filter(s => s.id !== newStar.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>{stars.map((star) => (
        <div
          key={star.id}
          className={styles.star}
          style={{
            left: star.left,
            top: star.top,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDelay: star.animationDelay,
            animationDuration: star.animationDuration,
          }}
        />
      ))}

      {trailStars.map((star) => (
        <div
          key={`trail-${star.id}`}
          className={styles.trailStar}
          style={{
            left: `${star.x}px`,
            top: `${star.y}px`,
          }}
        />
      ))}
    </>
  );
}
{styles.trailStar}
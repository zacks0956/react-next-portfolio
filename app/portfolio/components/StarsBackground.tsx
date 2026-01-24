'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
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
  const [trailStars, setTrailStars] = useState<TrailStar[]>([]);

  // 星の生成を最適化 - 初回のみ生成
  const stars = useMemo(() => {
    const starCount = 50; // 100から50に削減
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

    return newStars;
  }, []);

  useEffect(() => {
    let starId = 0;
    let throttleTimeout: NodeJS.Timeout | null = null;

    // スロットリング付きマウストラッキング
    const handleMouseMove = (e: MouseEvent) => {
      if (throttleTimeout) return;

      throttleTimeout = setTimeout(() => {
        throttleTimeout = null;
      }, 50); // 50msごとに制限

      const newStar: TrailStar = {
        id: starId++,
        x: e.clientX,
        y: e.clientY,
      };

      setTrailStars(prev => {
        const updated = [...prev, newStar];
        // 最新の10個のみ保持（20から削減）
        return updated.slice(-10);
      });

      // 星を一定時間後に削除
      setTimeout(() => {
        setTrailStars(prev => prev.filter(s => s.id !== newStar.id));
      }, 800); // 1000msから800msに短縮
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (throttleTimeout) clearTimeout(throttleTimeout);
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
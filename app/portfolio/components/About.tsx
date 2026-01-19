'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">
            私について
          </h2>
          
          <div className="space-y-4 text-neutral-400 leading-relaxed">
            <p>
              こんにちは！私は情熱的なフロントエンド開発者です。美しいユーザーインターフェースと
              シームレスなユーザー体験を創造することに喜びを感じています。
            </p>
            
            <p>
              Web開発の世界に魅了されて以来、常に最新の技術トレンドを追い続け、
              ベストプラクティスを学び続けています。特に、ReactとNext.jsを使用した
              モダンなWebアプリケーション開発に注力しています。
            </p>
            
            <p>
              コードを書くことは単なる仕事ではなく、問題を解決し、アイデアを実現し、
              人々の生活をより良くするための手段だと考えています。
              パフォーマンス、アクセシビリティ、そしてユーザビリティを重視し、
              細部にまでこだわった開発を心がけています。
            </p>
            
            <p>
              仕事以外では、オープンソースプロジェクトへの貢献や、技術ブログの執筆、
              新しいフレームワークやツールの探求を楽しんでいます。
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

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
              完璧を追い求めながらも、不完全さを恐れない。それが私の開発スタイルです。
              一つひとつのプロジェクトは、失敗と学びの連続であり、そこから生まれる成長こそが
              私の最大の原動力となっています。
            </p>
            
            <p>
              「Perfectly Imperfect」というコンセプトのもと、完璧な答えを求めるのではなく、
              試行錯誤を繰り返しながら、より良い解決策を見つけていくプロセスを大切にしています。
              バグは学びの機会であり、エラーは成長のステップです。
            </p>
            
            <p>
              ReactやNext.jsといったモダンな技術を活用しながら、常に「なぜ？」を問い続け、
              理解を深めることを心がけています。コードを書くことは、単なるスキルの発揮ではなく、
              問題に向き合い、解決策を模索し、時には失敗しながらも前進し続ける、
              クリエイティブな旅だと考えています。
            </p>
            
            <p>
              不完全であることを受け入れ、学び続ける姿勢こそが、
              真の成長への道だと信じています。
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex justify-center"
          >
            <Link href="/blog">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-400 text-blue-400 rounded-lg font-medium transition-all duration-300 flex items-center gap-3 group cursor-pointer"
              >
                <span>ブログ記事を見る</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

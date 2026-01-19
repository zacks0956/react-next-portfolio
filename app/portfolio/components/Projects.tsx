'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import ProjectCard from './ProjectCard';

const projects = [
  {
    title: 'ミニマルブログ',
    description: 'Next.js製のミニマルなブログサイト。SSGを活用し高速化を実現。マークダウン記事の動的生成とSEO最適化を実装。',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MDX'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'Eコマースダッシュボード',
    description: '管理者向けのモダンなダッシュボード。リアルタイムデータ可視化、在庫管理、注文処理機能を備えています。',
    tags: ['React', 'TypeScript', 'Chart.js', 'Firebase'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'タスク管理アプリ',
    description: 'ドラッグ&ドロップ対応のタスク管理アプリケーション。直感的なUIとローカルストレージによるデータ永続化。',
    tags: ['React', 'TypeScript', 'Framer Motion', 'Zustand'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
  {
    title: 'ポートフォリオサイト',
    description: 'レスポンシブでアニメーション豊富なポートフォリオサイト。スムーズなスクロール効果とインタラクティブな要素を実装。',
    tags: ['Next.js', 'Framer Motion', 'Tailwind CSS'],
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
  },
];

export default function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-12">
            制作実績
          </h2>

          <div className="space-y-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

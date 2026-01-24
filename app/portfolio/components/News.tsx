'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { News } from '@/app/lib/microcms';

interface NewsListProps {
  news: News[];
}

export default function NewsList({ news }: NewsListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <section id="news" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            News
          </h2>
          <p className="text-neutral-400 text-lg">
            最新のお知らせや活動情報
          </p>
        </motion.div>

        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-neutral-400"
          >
            まだニュースがありません
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-6 md:gap-8"
          >
            {news.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <Link 
                  href={`/portfolio/news/${item.id}`}
                  className="block bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.thumbnail && (
                      <div className="w-full md:w-80 h-56 md:h-64 relative overflow-hidden flex-shrink-0">
                        <Image
                          src={item.thumbnail.url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2 md:gap-3 mb-4">
                          <div className="flex items-center gap-1.5 text-xs md:text-sm text-neutral-400">
                            <Calendar size={16} className="flex-shrink-0" />
                            <time dateTime={item.publishedAt}>
                              {formatDate(item.publishedAt)}
                            </time>
                          </div>
                          {item.category && (
                            <div className="flex items-center gap-1.5 text-xs md:text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                              <Tag size={14} className="flex-shrink-0" />
                              <span>{item.category.name}</span>
                            </div>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-neutral-100 mb-3 md:mb-4 group-hover:text-blue-400 transition-colors line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-sm md:text-base text-neutral-400 line-clamp-2 md:line-clamp-3">
                          {item.description || item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                        </p>
                      </div>
                      <div className="mt-4 md:mt-6">
                        <span className="text-blue-400 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                          続きを読む
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

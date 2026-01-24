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
            className="grid gap-6"
          >
            {news.map((item) => (
              <motion.article
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
              >
                <Link 
                  href={`/portfolio/news/${item.id}`}
                  className="block bg-neutral-800/50 backdrop-blur-sm border border-neutral-700/50 rounded-lg overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {item.thumbnail && (
                      <div className="md:w-64 h-48 md:h-auto relative overflow-hidden">
                        <Image
                          src={item.thumbnail.url}
                          alt={item.title}
                          width={item.thumbnail.width}
                          height={item.thumbnail.height}
                          className="absolute inset-0 w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="flex-1 p-6">
                      <div className="flex flex-wrap gap-3 mb-3">
                        <div className="flex items-center gap-1 text-sm text-neutral-400">
                          <Calendar size={16} />
                          <time dateTime={item.publishedAt}>
                            {formatDate(item.publishedAt)}
                          </time>
                        </div>
                        {item.category && (
                          <div className="flex items-center gap-1 text-sm bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                            <Tag size={16} />
                            <span>{item.category.name}</span>
                          </div>
                        )}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-neutral-100 mb-3 hover:text-blue-400 transition-colors">
                        {item.title}
                      </h3>
                      <div
                        className="text-neutral-400 line-clamp-3"
                        dangerouslySetInnerHTML={{
                          __html: item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...',
                        }}
                      />
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

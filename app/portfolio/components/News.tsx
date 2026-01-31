'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { News } from '@/app/lib/microcms';
import styles from './News.module.css';

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
    <section id="news" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={styles.header}
        >
          <h2 className={styles.title}>
            News
          </h2>
          <p className={styles.subtitle}>
            最新のお知らせや活動情報
          </p>
        </motion.div>

        {news.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={styles.emptyState}
          >
            まだニュースがありません
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={styles.newsGrid}
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
                  className={styles.newsCard}
                >
                  <div className={styles.cardContent}>
                    {item.thumbnail && (
                      <div className={styles.thumbnail}>
                        <Image
                          src={item.thumbnail.url}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 320px"
                          className={styles.thumbnailImage}
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className={styles.textContent}>
                      <div>
                        <div className={styles.meta}>
                          <div className={styles.dateInfo}>
                            <Calendar size={16} className={styles.dateIcon} />
                            <time dateTime={item.publishedAt}>
                              {formatDate(item.publishedAt)}
                            </time>
                          </div>
                          {item.category && (
                            <div className={styles.category}>
                              <Tag size={14} className={styles.categoryIcon} />
                              <span>{item.category.name}</span>
                            </div>
                          )}
                        </div>
                        <h3 className={styles.newsTitle}>
                          {item.title}
                        </h3>
                        <p className={styles.description}>
                          {item.description || item.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...'}
                        </p>
                      </div>
                      <div className={styles.readMore}>
                        <span>
                          続きを読む
                        </span>
                        <svg className={styles.readMoreIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
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

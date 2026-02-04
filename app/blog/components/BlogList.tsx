'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Blog, Category } from '@/app/lib/microcms';
import { useState } from 'react';
import styles from './BlogList.module.css';

interface BlogListProps {
  posts: Blog[];
  categories: Category[];
}

export default function BlogList({ posts, categories }: BlogListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Get tags based on selected category
  const getTagsForCategory = (categoryName: string | null) => {
    const postsToCheck = categoryName
      ? posts.filter(post => post.category?.name === categoryName)
      : posts;
    
    const allTags = postsToCheck
      .flatMap(post => post.tags || [])
      .filter(Boolean);
    
    return Array.from(new Set(allTags));
  };

  const availableTags = getTagsForCategory(selectedCategory);

  // Filter posts by category and tag
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory
      ? post.category?.name === selectedCategory
      : true;
    
    const matchesTag = selectedTag
      ? post.tags?.includes(selectedTag)
      : true;
    
    return matchesCategory && matchesTag;
  });

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
    <div>
      {/* Category filter */}
      {categories.length > 0 && (
        <div className={styles.filterSection}>
          <h3 className={styles.filterTitle}>カテゴリー</h3>
          <div className={styles.filterButtons}>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className={`${styles.filterButton} ${selectedCategory === null ? styles.active : ''}`}
            >
              すべて ({posts.length})
            </button>
            {categories.map((category) => {
              const count = posts.filter(post => post.category?.name === category.name).length;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setSelectedCategory(category.name);
                    setSelectedTag(null);
                  }}
                  className={`${styles.filterButton} ${selectedCategory === category.name ? styles.active : ''}`}
                >
                  {category.name} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Tag filter - only show when there are tags */}
      {availableTags.length > 0 && (
        <div className={styles.tagFilterSection}>
          <h3 className={styles.filterTitle}>
            タグ {selectedCategory && `(${selectedCategory})`}
          </h3>
          <div className={styles.filterButtons}>
            <button
              onClick={() => setSelectedTag(null)}
              className={`${styles.tagButton} ${selectedTag === null ? styles.active : ''}`}
            >
              すべてのタグ
            </button>
            {availableTags.map((tag) => {
              const count = (selectedCategory
                ? posts.filter(post => post.category?.name === selectedCategory)
                : posts
              ).filter(post => post.tags?.includes(tag)).length;
              
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(tag)}
                  className={`${styles.tagButton} ${selectedTag === tag ? styles.active : ''}`}
                >
                  #{tag} ({count})
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Posts grid */}
      {filteredPosts.length === 0 ? (
        <div className={styles.emptyState}>
          記事が見つかりませんでした
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={styles.postsGrid}
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Link 
                href={`/blog/${post.id}`}
                className={styles.postCard}
              >
                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className={styles.thumbnailContainer}>
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={styles.thumbnailImage}
                      loading="lazy"
                    />
                  </div>
                )}

                <div className={styles.cardContent}>
                  {/* Meta */}
                  <div className={styles.cardMeta}>
                    <div className={styles.cardDate}>
                      <Calendar size={14} />
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                    {post.category && (
                      <div className={styles.cardCategory}>
                        <Tag size={12} />
                        <span>{post.category.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className={styles.cardTitle}>
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className={styles.cardDescription}>
                    {post.description || post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                  </p>

                  {/* Read more */}
                  <div className={styles.readMore}>
                    <span>続きを読む</span>
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </motion.div>
      )}
    </div>
  );
}

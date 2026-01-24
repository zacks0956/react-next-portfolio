'use client';

import { motion } from 'framer-motion';
import { Calendar, Tag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Blog, Category } from '@/app/lib/microcms';
import { useState } from 'react';

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
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-neutral-400 mb-3">カテゴリー</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setSelectedCategory(null);
                setSelectedTag(null);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === null
                  ? 'bg-blue-500 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
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
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedCategory === category.name
                      ? 'bg-blue-500 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
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
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-neutral-400 mb-3">
            タグ {selectedCategory && `(${selectedCategory})`}
          </h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                selectedTag === null
                  ? 'bg-purple-500 text-white'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
              }`}
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
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    selectedTag === tag
                      ? 'bg-purple-500 text-white'
                      : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  }`}
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
        <div className="text-center py-12 text-neutral-400">
          記事が見つかりませんでした
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Link 
                href={`/blog/${post.id}`}
                className="block bg-neutral-900/50 border border-neutral-800 rounded-xl overflow-hidden hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
              >
                {/* Thumbnail */}
                {post.thumbnail && (
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={post.thumbnail.url}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Meta */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400">
                      <Calendar size={14} />
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                    {post.category && (
                      <div className="flex items-center gap-1.5 text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                        <Tag size={12} />
                        <span>{post.category.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-neutral-100 mb-2 line-clamp-2 group-hover:text-blue-400 transition-colors">
                    {post.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-neutral-400 line-clamp-3 mb-4">
                    {post.description || post.content.replace(/<[^>]*>/g, '').substring(0, 100) + '...'}
                  </p>

                  {/* Read more */}
                  <div className="flex items-center gap-2 text-blue-400 text-sm font-medium group-hover:gap-3 transition-all">
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

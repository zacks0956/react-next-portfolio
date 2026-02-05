import { getBlogDetail, getBlogList } from '@/app/lib/microcms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import BlogHeader from '../components/BlogHeader';
import StarsBackground from '@/app/portfolio/components/StarsBackground';
import styles from './page.module.css';

type Props = {
  params: { id: string };
};

export async function generateStaticParams() {
  const blogData = await getBlogList(100);
  return blogData.contents.map((post) => ({
    id: post.id,
  }));
}

export async function generateMetadata({ params }: Props) {
  const post = await getBlogDetail(params.id);
  
  if (!post) {
    return {
      title: 'Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.description || post.content.replace(/<[^>]*>/g, '').substring(0, 150),
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const post = await getBlogDetail(params.id);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });
  };

  return (
    <div className={styles.pageContainer}>
      {/* Fixed background */}
      <div 
        className={styles.fixedBackground}
        style={{ backgroundImage: 'url(/night.png)' }}
      >
        <div className={styles.overlay}></div>
        <StarsBackground />
      </div>

      {/* Header */}
      <BlogHeader />

      {/* Content */}
      <div className={styles.relativeContent}>
        <main className={styles.mainContent}>
          <div className={styles.content}>
          {/* Back button */}
          <Link 
            href="/blog"
            className={styles.backLink}
          >
            <ArrowLeft size={20} />
            <span>ブログ一覧に戻る</span>
          </Link>

          {/* Thumbnail */}
          {post.thumbnail && (
            <div className={styles.thumbnail}>
              <Image
                src={post.thumbnail.url}
                alt={post.title}
                width={post.thumbnail.width}
                height={post.thumbnail.height}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Meta Information */}
          <div className={styles.meta}>
            <div className={styles.date}>
              <Calendar size={18} />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            {post.category && (
              <div className={styles.category}>
                <Tag size={18} />
                <span>{post.category.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            {post.title}
          </h1>

          {/* Content */}
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Back Button (Bottom) */}
          <div className={styles.footer}>
            <Link 
              href="/blog"
              className={styles.backLink}
            >
              <ArrowLeft size={20} />
              <span>ブログ一覧に戻る</span>
            </Link>
          </div>
        </div>
      </main>
      </div>
    </div>
  );
}

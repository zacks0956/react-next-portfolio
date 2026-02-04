import { getBlogDetail, getBlogList } from '@/app/lib/microcms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import BlogHeader from '../components/BlogHeader';
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
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className={styles.pageContainer}>
      <BlogHeader />
      <main className={styles.mainContent}>
        {/* Back button */}
        <Link 
          href="/blog"
          className={styles.backButton}
        >
          <ArrowLeft size={20} />
          <span>ブログ一覧に戻る</span>
        </Link>

        <article className={styles.article}>
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className={styles.thumbnail}>
              <Image
                src={post.thumbnail.url}
                alt={post.title}
                fill
                className={styles.thumbnailImage}
                priority
              />
            </div>
          )}

          <div className={styles.articleContent}>
            {/* Meta */}
            <div className={styles.meta}>
              <div className={styles.metaDate}>
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.category && (
                <div className={styles.metaCategory}>
                  <Tag size={16} />
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
              className={`${styles.richText} prose prose-invert prose-lg max-w-none`}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Back to list */}
        <div className={styles.bottomSection}>
          <Link 
            href="/blog"
            className={styles.backToListButton}
          >
            <ArrowLeft size={20} />
            <span>ブログ一覧に戻る</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

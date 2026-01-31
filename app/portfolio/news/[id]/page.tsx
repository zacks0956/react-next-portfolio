import { notFound } from 'next/navigation';
import { getNewsDetail } from '@/app/lib/microcms';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import StarsBackground from '../../components/StarsBackground';
import Header from '../../components/Header';
import styles from './page.module.css';

type Props = {
  params: {
    id: string;
  };
};

export default async function NewsDetailPage({ params }: Props) {
  const news = await getNewsDetail(params.id);

  if (!news) {
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
    <div className="min-h-screen text-neutral-200 relative">
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/night.png)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <StarsBackground />
      </div>

      {/* Header */}
      <Header />

      {/* Content */}
      <div className="relative z-10">
        <div className={styles.content}>
          {/* Back Button */}
          <Link 
            href="/portfolio#news"
            className={styles.backLink}
          >
            <ArrowLeft size={20} />
            <span>ニュース一覧に戻る</span>
          </Link>

          {/* Thumbnail */}
          {news.thumbnail && (
            <div className={styles.thumbnail}>
              <Image
                src={news.thumbnail.url}
                alt={news.title}
                width={news.thumbnail.width}
                height={news.thumbnail.height}
                className="w-full h-auto"
                priority
              />
            </div>
          )}

          {/* Meta Information */}
          <div className={styles.meta}>
            <div className={styles.date}>
              <Calendar size={18} />
              <time dateTime={news.publishedAt}>
                {formatDate(news.publishedAt)}
              </time>
            </div>
            {news.category && (
              <div className={styles.category}>
                <Tag size={18} />
                <span>{news.category.name}</span>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className={styles.title}>
            {news.title}
          </h1>

          {/* Content */}
          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

          {/* Back Button (Bottom) */}
          <div className={styles.footer}>
            <Link 
              href="/portfolio#news"
              className={styles.backLink}
            >
              <ArrowLeft size={20} />
              <span>ニュース一覧に戻る</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

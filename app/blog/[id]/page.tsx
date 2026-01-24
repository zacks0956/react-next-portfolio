import { getBlogDetail, getBlogList } from '@/app/lib/microcms';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Tag, ArrowLeft } from 'lucide-react';
import BlogHeader from '../components/BlogHeader';

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
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <BlogHeader />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back button */}
        <Link 
          href="/blog"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>ブログ一覧に戻る</span>
        </Link>

        <article className="bg-neutral-900/50 rounded-xl overflow-hidden border border-neutral-800">
          {/* Thumbnail */}
          {post.thumbnail && (
            <div className="relative w-full h-64 md:h-96">
              <Image
                src={post.thumbnail.url}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="p-6 md:p-10">
            {/* Meta */}
            <div className="flex flex-wrap gap-4 mb-6 text-sm">
              <div className="flex items-center gap-2 text-neutral-400">
                <Calendar size={16} />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              {post.category && (
                <div className="flex items-center gap-2 bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full">
                  <Tag size={16} />
                  <span>{post.category.name}</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">
              {post.title}
            </h1>

            {/* Content */}
            <div 
              className="prose prose-invert prose-lg max-w-none
                prose-headings:text-neutral-100 
                prose-p:text-neutral-300 prose-p:leading-relaxed
                prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-neutral-200
                prose-code:text-blue-400 prose-code:bg-neutral-800 prose-code:px-2 prose-code:py-1 prose-code:rounded
                prose-pre:bg-neutral-800 prose-pre:border prose-pre:border-neutral-700
                prose-img:rounded-lg
                prose-ul:text-neutral-300
                prose-ol:text-neutral-300
                prose-li:marker:text-blue-400"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </article>

        {/* Back to list */}
        <div className="mt-12 text-center">
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 hover:border-blue-400 text-blue-400 rounded-lg transition-all group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>ブログ一覧に戻る</span>
          </Link>
        </div>
      </main>
    </div>
  );
}

import { getBlogList, getCategoryList } from '@/app/lib/microcms';
import BlogList from './components/BlogList';
import BlogHeader from './components/BlogHeader';

export const metadata = {
  title: 'Blog | Suzaku Sho',
  description: '技術記事や学習記録、プロジェクトの振り返りなどを発信するブログ',
};

export default async function BlogPage() {
  const [blogData, categoryData] = await Promise.all([
    getBlogList(100),
    getCategoryList(),
  ]);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200">
      <BlogHeader />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-100 mb-4">
            Blog
          </h1>
          <p className="text-lg text-neutral-400">
            技術記事、学習記録、プロジェクトの振り返りを発信しています
          </p>
        </div>
        <BlogList posts={blogData.contents} categories={categoryData.contents} />
      </main>
    </div>
  );
}

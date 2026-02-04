import { getBlogList, getCategoryList } from '@/app/lib/microcms';
import BlogList from './components/BlogList';
import BlogHeader from './components/BlogHeader';
import styles from './page.module.css';

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
    <div className={styles.pageContainer}>
      <BlogHeader />
      <main className={styles.mainContent}>
        <div className={styles.header}>
          <h1 className={styles.pageTitle}>
            Blog
          </h1>
          <p className={styles.pageDescription}>
            技術記事、学習記録、プロジェクトの振り返りを発信しています
          </p>
        </div>
        <BlogList posts={blogData.contents} categories={categoryData.contents} />
      </main>
    </div>
  );
}

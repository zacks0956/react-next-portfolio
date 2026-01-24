import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import News from './components/News';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsBackground from './components/StarsBackground';
import StripeAnimation from './components/StripeAnimation';
import { getNewsList } from '@/app/lib/microcms';

export const metadata = {
  title: 'ポートフォリオ',
  description: 'ReactとNext.jsを中心としたモダンな技術で、高品質なウェブアプリケーションを開発するフロントエンド開発者のポートフォリオサイト。',
};

export default async function PortfolioPage() {
  const newsData = await getNewsList(6);

  return (
    <div className="min-h-screen text-neutral-200 relative">
      {/* Fixed background image */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/night.png)' }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <StarsBackground />
        <StripeAnimation />
      </div>
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <TechStack />
          <News news={newsData.contents} />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

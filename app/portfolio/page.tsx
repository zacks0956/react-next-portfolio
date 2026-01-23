import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import StarsBackground from './components/StarsBackground';

export const metadata = {
  title: 'Code by 太郎 | フロントエンド開発者ポートフォリオ',
  description: 'ReactとNext.jsを中心としたモダンな技術で、高品質なウェブアプリケーションを開発するフロントエンド開発者のポートフォリオサイト。',
};

export default function PortfolioPage() {
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
      
      {/* Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <TechStack />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}

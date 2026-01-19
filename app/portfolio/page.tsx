import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export const metadata = {
  title: 'Code by 太郎 | フロントエンド開発者ポートフォリオ',
  description: 'ReactとNext.jsを中心としたモダンな技術で、高品質なウェブアプリケーションを開発するフロントエンド開発者のポートフォリオサイト。',
};

export default function PortfolioPage() {
  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-200">
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
  );
}

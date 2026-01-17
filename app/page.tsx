import GitHubHeader from './components/GitHubHeader';
import ProfileSidebar from './components/ProfileSidebar';
import PinnedProject from './components/PinnedProject';
import ContributionGraph from './components/ContributionGraph';
import { Book, MessageSquare } from 'lucide-react';

export default function Home() {
  const pinnedProjects = [
    {
      title: 'next-portfolio-template',
      description: 'A modern, GitHub-styled portfolio template built with Next.js and Tailwind CSS',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 234,
      forks: 45,
      href: '/project/1',
    },
    {
      title: 'react-component-library',
      description: 'Accessible React component library with Storybook documentation',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 189,
      forks: 32,
      href: '/project/2',
    },
    {
      title: 'api-documentation-gen',
      description: 'Automated API documentation generator from OpenAPI specifications',
      language: 'JavaScript',
      languageColor: '#f1e05a',
      stars: 156,
      forks: 28,
      href: '/project/3',
    },
    {
      title: 'performance-dashboard',
      description: 'Real-time web vitals monitoring dashboard with analytics',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 142,
      forks: 19,
      href: '/project/4',
    },
    {
      title: 'design-system',
      description: 'Complete design system with components, tokens, and guidelines',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 312,
      forks: 67,
      href: '/project/5',
    },
    {
      title: 'cli-tool-starter',
      description: 'Modern CLI tool starter with TypeScript and testing setup',
      language: 'TypeScript',
      languageColor: '#3178c6',
      stars: 98,
      forks: 15,
      href: '/project/6',
    },
  ];

  return (
    <div className="min-h-screen">
      <GitHubHeader />
      
      <div className="max-w-[1280px] mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Left Sidebar */}
          <ProfileSidebar />

          {/* Main Content */}
          <main className="flex-1 space-y-6">
            {/* Navigation Tabs */}
            <nav className="border-b border-github-border-default">
              <div className="flex gap-4 text-sm">
                <button className="py-3 px-4 border-b-2 border-orange-500 text-github-fg-default font-semibold">
                  Overview
                </button>
                <button className="py-3 px-4 border-b-2 border-transparent text-github-fg-muted hover:text-github-fg-default hover:border-github-border-default transition-colors">
                  Repositories <span className="ml-1 bg-github-canvas-subtle rounded-full px-2 py-0.5 text-xs">24</span>
                </button>
                <button className="py-3 px-4 border-b-2 border-transparent text-github-fg-muted hover:text-github-fg-default hover:border-github-border-default transition-colors">
                  Projects
                </button>
                <button className="py-3 px-4 border-b-2 border-transparent text-github-fg-muted hover:text-github-fg-default hover:border-github-border-default transition-colors">
                  Packages
                </button>
              </div>
            </nav>

            {/* Pinned Repositories */}
            <section>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-github-fg-default text-base font-normal">
                  Pinned
                </h2>
                <button className="text-sm text-github-accent-fg hover:underline">
                  Customize your pins
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {pinnedProjects.map((project) => (
                  <PinnedProject key={project.title} {...project} />
                ))}
              </div>
            </section>

            {/* Contribution Activity */}
            <section className="pt-6">
              <h2 className="text-github-fg-default text-base font-normal mb-4">
                Contribution activity
              </h2>
              <ContributionGraph />
            </section>

            {/* Activity Timeline */}
            <section className="space-y-4">
              <h2 className="text-github-fg-default text-base font-normal">
                Recent activity
              </h2>

              <div className="space-y-3">
                {/* Activity Item 1 */}
                <div className="flex gap-3 pb-4 border-b border-github-border-default">
                  <Book size={16} className="text-github-fg-muted mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-github-fg-default">
                      Created a new repository{' '}
                      <a href="#" className="text-github-accent-fg hover:underline font-semibold">
                        react-hooks-collection
                      </a>
                    </p>
                    <p className="text-xs text-github-fg-muted mt-1">2 days ago</p>
                  </div>
                </div>

                {/* Activity Item 2 */}
                <div className="flex gap-3 pb-4 border-b border-github-border-default">
                  <MessageSquare size={16} className="text-github-fg-muted mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-github-fg-default">
                      Opened an issue in{' '}
                      <a href="#" className="text-github-accent-fg hover:underline font-semibold">
                        vercel/next.js
                      </a>
                    </p>
                    <p className="text-xs text-github-fg-muted mt-1">5 days ago</p>
                  </div>
                </div>

                {/* Activity Item 3 */}
                <div className="flex gap-3 pb-4">
                  <Book size={16} className="text-github-fg-muted mt-1 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-github-fg-default">
                      Published{' '}
                      <a href="#" className="text-github-accent-fg hover:underline font-semibold">
                        v2.0.0
                      </a>
                      {' '}of{' '}
                      <a href="#" className="text-github-accent-fg hover:underline font-semibold">
                        design-system
                      </a>
                    </p>
                    <p className="text-xs text-github-fg-muted mt-1">1 week ago</p>
                  </div>
                </div>
              </div>

              <button className="w-full py-2 text-sm text-github-accent-fg hover:underline">
                Show more activity
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

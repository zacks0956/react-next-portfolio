import { Search, Bell, Plus } from 'lucide-react';
import Link from 'next/link';

export default function GitHubHeader() {
  return (
    <header className="bg-github-canvas-overlay border-b border-github-border-default px-4 py-3">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="text-github-fg-default hover:text-white">
            <svg height="32" width="32" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
            </svg>
          </Link>
          
          {/* Search Bar */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search or jump to..."
              className="bg-github-canvas-default border border-github-border-default rounded-github px-3 py-1.5 text-sm text-github-fg-default placeholder-github-fg-muted focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis w-[272px]"
            />
            <kbd className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-github-fg-muted">/</kbd>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex items-center gap-4">
          <Link href="/pull-requests" className="text-sm text-github-fg-default hover:text-white hidden md:block">
            Pull requests
          </Link>
          <Link href="/issues" className="text-sm text-github-fg-default hover:text-white hidden md:block">
            Issues
          </Link>
          <Link href="/codespaces" className="text-sm text-github-fg-default hover:text-white hidden md:block">
            Codespaces
          </Link>
          <Link href="/marketplace" className="text-sm text-github-fg-default hover:text-white hidden md:block">
            Marketplace
          </Link>
          <Link href="/explore" className="text-sm text-github-fg-default hover:text-white hidden md:block">
            Explore
          </Link>
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          <button className="p-2 hover:bg-github-canvas-subtle rounded-github">
            <Bell size={16} className="text-github-fg-default" />
          </button>
          <button className="p-2 hover:bg-github-canvas-subtle rounded-github">
            <Plus size={16} className="text-github-fg-default" />
          </button>
          <button className="w-8 h-8 rounded-full overflow-hidden border border-github-border-default">
            <img 
              src="https://github.com/github.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </button>
        </div>
      </div>
    </header>
  );
}

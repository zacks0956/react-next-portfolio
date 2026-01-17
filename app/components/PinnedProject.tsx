import { Star, GitFork } from 'lucide-react';
import Link from 'next/link';

interface PinnedProjectProps {
  title: string;
  description: string;
  language: string;
  languageColor: string;
  stars: number;
  forks: number;
  href: string;
}

export default function PinnedProject({
  title,
  description,
  language,
  languageColor,
  stars,
  forks,
  href,
}: PinnedProjectProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-github-canvas-overlay border border-github-border-default rounded-github p-4 hover:border-github-border-muted transition-colors h-full flex flex-col">
        {/* Title */}
        <h3 className="text-github-accent-fg font-semibold mb-2 hover:underline flex items-center gap-2">
          <svg height="16" width="16" viewBox="0 0 16 16" fill="currentColor" className="text-github-fg-muted">
            <path d="M2 2.5A2.5 2.5 0 014.5 0h8.75a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-2.5a.75.75 0 110-1.5h1.75v-2h-8a1 1 0 00-.714 1.7.75.75 0 01-1.072 1.05A2.495 2.495 0 012 11.5v-9zm10.5-1V9h-8c-.356 0-.694.074-1 .208V2.5a1 1 0 011-1h8zM5 12.25v3.25a.25.25 0 00.4.2l1.45-1.087a.25.25 0 01.3 0L8.6 15.7a.25.25 0 00.4-.2v-3.25a.25.25 0 00-.25-.25h-3.5a.25.25 0 00-.25.25z"/>
          </svg>
          {title}
        </h3>

        {/* Description */}
        <p className="text-github-fg-muted text-sm mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-github-fg-muted">
          {/* Language */}
          <div className="flex items-center gap-1.5">
            <span 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: languageColor }}
            />
            <span>{language}</span>
          </div>

          {/* Stars */}
          <div className="flex items-center gap-1">
            <Star size={14} />
            <span>{stars}</span>
          </div>

          {/* Forks */}
          <div className="flex items-center gap-1">
            <GitFork size={14} />
            <span>{forks}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

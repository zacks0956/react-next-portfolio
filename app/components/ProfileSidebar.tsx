import { MapPin, Link as LinkIcon, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function ProfileSidebar() {
  return (
    <aside className="w-full md:w-[296px] space-y-4">
      {/* Profile Picture */}
      <div className="flex flex-col items-center md:items-start">
        <div className="relative w-[296px] h-[296px] rounded-full overflow-hidden border-2 border-github-border-default mb-4">
          <Image
            src="https://github.com/github.png"
            alt="Profile Picture"
            fill
            className="object-cover"
          />
        </div>
        
        {/* Name and Username */}
        <div className="text-center md:text-left w-full">
          <h1 className="text-2xl font-semibold text-github-fg-default mb-1">
            Sho Suzaku
          </h1>
          <p className="text-xl text-github-fg-muted mb-4">
            zack
          </p>
        </div>

        {/* Edit Profile Button */}
        <button className="w-full bg-github-canvas-subtle hover:bg-github-border-default border border-github-border-default rounded-github px-4 py-2 text-sm font-medium text-github-fg-default transition-colors">
          Edit profile
        </button>
      </div>

      {/* Bio */}
      <div className="pt-4">
        <p className="text-github-fg-default text-base leading-relaxed">
          Building the future of web development, one commit at a time. 
          Passionate about clean code and elegant solutions.
        </p>
      </div>

      {/* Meta Information */}
      <div className="space-y-3 pt-2">
        {/* Followers */}
        <div className="flex items-center gap-2 text-sm">
          <Users size={16} className="text-github-fg-muted" />
          <Link href="/followers" className="hover:text-github-accent-fg">
            <span className="font-semibold text-github-fg-default">234</span>
            <span className="text-github-fg-muted"> followers</span>
          </Link>
          <span className="text-github-fg-muted">·</span>
          <Link href="/following" className="hover:text-github-accent-fg">
            <span className="font-semibold text-github-fg-default">89</span>
            <span className="text-github-fg-muted"> following</span>
          </Link>
        </div>

        {/* Location */}
        <div className="flex items-center gap-2 text-sm text-github-fg-muted">
          <MapPin size={16} />
          <span>Tokyo, Japan</span>
        </div>

        {/* Email */}
        <div className="flex items-center gap-2 text-sm">
          <Mail size={16} className="text-github-fg-muted" />
          <a href="mailto:your.email@example.com" className="text-github-accent-fg hover:underline">
            your.email@example.com
          </a>
        </div>

        {/* Website */}
        <div className="flex items-center gap-2 text-sm">
          <LinkIcon size={16} className="text-github-fg-muted" />
          <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-github-accent-fg hover:underline">
            yourwebsite.com
          </a>
        </div>
      </div>

      {/* Organizations */}
      <div className="pt-4 border-t border-github-border-default">
        <h2 className="text-github-fg-default font-semibold mb-3">Organizations</h2>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((org) => (
            <Link key={org} href={`/org${org}`} className="hover:opacity-80">
              <div className="w-8 h-8 rounded-md bg-github-canvas-subtle border border-github-border-default flex items-center justify-center text-xs font-mono">
                O{org}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}

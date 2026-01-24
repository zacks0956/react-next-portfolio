'use client';

import Link from 'next/link';
import { ArrowLeft, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BlogHeader() {
  return (
    <header className="sticky top-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800/50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/blog"
            className="text-xl font-bold text-neutral-100 hover:text-blue-400 transition-colors"
          >
            Blog by <span className="text-blue-400">Sho</span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/portfolio"
                className="flex items-center gap-2 px-4 py-2 text-sm text-neutral-300 hover:text-neutral-100 transition-colors"
              >
                <Home size={18} />
                <span className="hidden sm:inline">ポートフォリオ</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </nav>
    </header>
  );
}

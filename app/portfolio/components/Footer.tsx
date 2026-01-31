'use client';

import { Github, Instagram, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Copyright */}
          <div className={styles.copyright}>
            © {currentYear} Designed & Built by <span className={styles.brandName}>Sho</span>
          </div>

          {/* Social Links */}
          <div className={styles.socialLinks}>
            <a
              href="https://github.com/zacks0956"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.instagram.com/suzaku.0695?igsh=cXBhYzI5aTJhMTF6&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialLink}
              aria-label="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a
              href="mailto:KTC25A31E0009@edu.kyoto-tech.ac.jp"
              className={styles.socialLink}
              aria-label="Email"
            >
              <Mail size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

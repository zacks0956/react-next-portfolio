'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Mail, Github, Instagram } from 'lucide-react';
import Image from 'next/image';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const socialLinks = useMemo(() => [
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:KTC25A31E0009@edu.kyoto-tech.ac.jp',
      label: 'KTC25A31E0009@edu.kyoto-tech.ac.jp',
      imageUrl: 'https://kyoto-tech.ac.jp/assets/images/logo_mark_b.svg',
      isImage: true,
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/zacks0956',
      label: '@zacks0956',
    },
    {
      name: '電話番号',
      icon: Mail,
      href: 'tel:0120-109-525',
      label: '0120-109-525',
      imageUrl: 'https://kyoto-tech.ac.jp/assets/images/logo_mark_b.svg',
      isImage: true,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://www.instagram.com/suzaku.0695?igsh=cXBhYzI5aTJhMTF6&utm_source=qr',
      label: '@suzaku.0695',
    },
  ], []);

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className={styles.title}>
            お問い合わせ
          </h2>


          <div className={styles.grid}>
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              const isPhoneLink = link.href.startsWith('tel:');
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target={isPhoneLink ? undefined : "_blank"}
                  rel={isPhoneLink ? undefined : "noopener noreferrer"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ 
                    scale: 0.95,
                    rotate: [-6, 4, -4, 3, -2, 0],
                    transition: { duration: 0.5 }
                  }}
                  className={styles.linkCard}
                >
                  {/* クリック時のリップル効果 */}
                  <motion.div
                    className={styles.rippleEffect}
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ 
                      scale: 2,
                      opacity: [0, 1, 0],
                      transition: { duration: 0.6 }
                    }}
                  />
                  
                  <div className={styles.iconContainer}>
                    {link.isImage && link.imageUrl ? (
                      <Image
                        src={link.imageUrl}
                        alt={link.name}
                        width={24}
                        height={24}
                        className={styles.logoImage}
                      />
                    ) : (
                      <Icon className={styles.icon} size={24} />
                    )}
                  </div>
                  <div className={styles.textContainer}>
                    <div className={styles.linkName}>{link.name}</div>
                    <div className={styles.linkLabel}>{link.label}</div>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

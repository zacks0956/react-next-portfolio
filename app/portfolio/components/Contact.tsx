'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useMemo } from 'react';
import { Mail, Github, Instagram } from 'lucide-react';
import Image from 'next/image';

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
    <section id="contact" className="py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-100 mb-8">
            お問い合わせ
          </h2>

          <p className="text-neutral-400 text-lg mb-12 leading-relaxed">
            新しいプロジェクトのご相談や、コラボレーションの機会がございましたら、
            お気軽にご連絡ください。お話できることを楽しみにしています！
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
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
                  className="bg-neutral-900/50 border border-neutral-800 rounded-lg p-6 hover:border-neutral-700 transition-all flex items-center gap-4 group relative overflow-hidden"
                >
                  {/* クリック時のリップル効果 */}
                  <motion.div
                    className="absolute inset-0 bg-blue-500/20"
                    initial={{ scale: 0, opacity: 0 }}
                    whileTap={{ 
                      scale: 2,
                      opacity: [0, 1, 0],
                      transition: { duration: 0.6 }
                    }}
                  />
                  
                  <div className="bg-neutral-800 p-3 rounded-lg group-hover:bg-neutral-700 transition-colors relative w-12 h-12 flex items-center justify-center">
                    {link.isImage && link.imageUrl ? (
                      <Image
                        src={link.imageUrl}
                        alt={link.name}
                        width={24}
                        height={24}
                        className="object-contain"
                      />
                    ) : (
                      <Icon className="text-neutral-300" size={24} />
                    )}
                  </div>
                  <div>
                    <div className="text-neutral-300 font-medium">{link.name}</div>
                    <div className="text-neutral-500 text-sm">{link.label}</div>
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

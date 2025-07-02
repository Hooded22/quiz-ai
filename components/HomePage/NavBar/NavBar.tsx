'use client';

import { useState, useEffect } from 'react';
import styles from './NavBar.module.css';

interface NavBarProps {
  links?: { text: string; href: string }[];
  onJoinWaitlist?: () => void;
}

export default function NavBar({ links = [], onJoinWaitlist }: NavBarProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map((link) => link.href.substring(1)); // Remove '#' from href
      const scrollY = window.scrollY;
      const navbarHeight = 200; // Height of sticky navbar

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + scrollY;
          const elementBottom = elementTop + rect.height;

          // Check if section is in viewport (accounting for sticky navbar)
          if (scrollY >= elementTop - navbarHeight - 150 && scrollY < elementBottom - navbarHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    const sectionId = href.substring(1); // Remove '#' from href
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.offsetTop - navbarHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}></div>
        </div>

        <div className={styles.linksContainer}>
          {links.map((link, index) => {
            const sectionId = link.href.substring(1);
            const isActive = activeSection === sectionId;
            return (
              <a
                key={index}
                href={link.href}
                className={`${styles.navLink} ${isActive ? styles.active : ''}`}
                onClick={(e) => handleLinkClick(e, link.href)}
              >
                {link.text}
              </a>
            );
          })}
        </div>

        <div className={styles.buttonContainer}>
          <button className={styles.waitlistButton} onClick={onJoinWaitlist}>
            Join to the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}

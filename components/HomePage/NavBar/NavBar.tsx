'use server';

import styles from './NavBar.module.css';

interface NavBarProps {
  links?: { text: string; href: string }[];
}

export default function NavBar({ links = [] }: NavBarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.content}>
        <div className={styles.logoContainer}>
          <div className={styles.logo}></div>
        </div>
        
        <div className={styles.linksContainer}>
          {links.map((link, index) => (
            <a key={index} href={link.href} className={styles.navLink}>
              {link.text}
            </a>
          ))}
        </div>
        
        <div className={styles.buttonContainer}>
          <button className={styles.waitlistButton}>
            Join to the waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
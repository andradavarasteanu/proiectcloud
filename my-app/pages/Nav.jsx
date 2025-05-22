
import React, { useState } from 'react';
import styles from './Navbar.module.css';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>Travel Journal</div>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
        <div className={styles.bar}></div>
      </div>
      <ul className={`${styles.navLinks} ${isOpen ? styles.active : ''}`}>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/add">Add a destination</Link></li>
        <li><Link href="/ideas">Vacation Ideas</Link></li>
      </ul>
    </nav>
  );
}

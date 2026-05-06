'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className="container">
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            Luxe<span>Drive</span>
          </Link>
          
          <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
            <Link href="/" className={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
            <Link href="#cars" className={styles.link} onClick={() => setIsOpen(false)}>Browse Cars</Link>
            <Link href="/about" className={styles.link} onClick={() => setIsOpen(false)}>About Us</Link>
            <Link href="/contact" className={styles.link} onClick={() => setIsOpen(false)}>Contact</Link>
            
            <div className={styles.mobileAuth}>
              {isAuthenticated ? (
                <button className={styles.loginBtn} onClick={() => { logout(); setIsOpen(false); }}>Logout</button>
              ) : (
                <>
                  <Link href="/auth/login" className={styles.loginBtn} onClick={() => setIsOpen(false)}>Login</Link>
                  <Link href="/auth/register" className={styles.registerBtn} onClick={() => setIsOpen(false)}>Register</Link>
                </>
              )}
            </div>
          </div>

          <div className={styles.desktopAuth}>
            {isAuthenticated ? (
              <div className={styles.userInfo}>
                <span className={styles.userName}>Hello, {user?.name || 'User'}</span>
                <button className={styles.logoutBtn} onClick={logout}>Logout</button>
              </div>
            ) : (
              <>
                <Link href="/auth/login" className={styles.loginBtn}>Login</Link>
                <Link href="/auth/register" className={styles.registerBtn}>Register</Link>
              </>
            )}
          </div>

          <button className={styles.hamburger} onClick={() => setIsOpen(!isOpen)}>
            <div className={`${styles.bar} ${isOpen ? styles.bar1 : ''}`}></div>
            <div className={`${styles.bar} ${isOpen ? styles.bar2 : ''}`}></div>
            <div className={`${styles.bar} ${isOpen ? styles.bar3 : ''}`}></div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

import Link from 'next/link';
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={`${styles.navbar} glass`}>
      <div className="container">
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            Luxe<span>Drive</span>
          </Link>
          
          <div className={styles.links}>
            <Link href="/cars" className={styles.link}>Browse Cars</Link>
            <Link href="/about" className={styles.link}>About Us</Link>
            <Link href="/contact" className={styles.link}>Contact</Link>
          </div>

          <div className={styles.auth}>
            <Link href="/auth/login" className={styles.loginBtn}>Login</Link>
            <Link href="/auth/register" className={styles.registerBtn}>Register</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button, Drawer, Space } from 'antd';
import { MenuOutlined, LogoutOutlined, UserOutlined, SunOutlined, MoonOutlined } from '@ant-design/icons';
import styles from './Navbar.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useAuth } from '@/hooks/useAuth';

const Navbar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  const { logout } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Browse Cars', href: '/cars' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ];

  const ThemeToggle = () => (
    <Button
      type="text"
      icon={resolvedTheme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
      className={styles.themeToggle}
    />
  );

  return (
    <nav className={`${styles.navbar} glass`}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          <Link href="/" className={styles.logo}>
            Luxe<span>Drive</span>
          </Link>
          
          <div className={styles.links}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href} className={styles.link}>
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.desktopAuth}>
            <Space size="middle">
              {mounted && <ThemeToggle />}
              {isAuthenticated ? (
                <div className={styles.userInfo}>
                  <span className={styles.userName}>
                    <UserOutlined style={{ marginRight: 8 }} />
                    Hello, {user?.name || 'User'}
                  </span>
                  <Button 
                    type="default" 
                    danger 
                    icon={<LogoutOutlined />} 
                    onClick={logout}
                    className={styles.logoutBtn}
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <div className={styles.authButtons}>
                  <Link href="/auth/login">
                    <Button type="text" className={styles.loginBtn}>Login</Button>
                  </Link>
                  <Link href="/auth/register">
                    <Button type="primary" size="large" className={styles.registerBtn}>Register</Button>
                  </Link>
                </div>
              )}
            </Space>
          </div>

          <div className={styles.mobileRight}>
            {mounted && <ThemeToggle />}
            <Button 
              className={styles.hamburger} 
              icon={<MenuOutlined />} 
              onClick={() => setIsDrawerOpen(true)}
              type="text"
            />
          </div>
        </div>
      </div>

      <Drawer
        title={<span className={styles.logo} style={{ fontSize: '1.2rem' }}>Luxe<span>Drive</span></span>}
        placement="right"
        onClose={() => setIsDrawerOpen(false)}
        open={isDrawerOpen}
        size="default"
        className={styles.drawer}
      >
        <div className={styles.mobileNav}>
          {navLinks.map((link) => (
            <Link 
              key={link.label} 
              href={link.href} 
              className={styles.mobileLink}
              onClick={() => setIsDrawerOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className={styles.mobileAuth}>
            {isAuthenticated ? (
              <Button 
                block 
                danger 
                type="primary" 
                icon={<LogoutOutlined />} 
                onClick={() => { logout(); setIsDrawerOpen(false); }}
              >
                Logout
              </Button>
            ) : (
              <>
                <Link href="/auth/login" style={{ width: '100%' }}>
                  <Button block onClick={() => setIsDrawerOpen(false)}>Login</Button>
                </Link>
                <Link href="/auth/register" style={{ width: '100%' }}>
                  <Button block type="primary" onClick={() => setIsDrawerOpen(false)}>Register</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Drawer>
    </nav>
  );
};

export default Navbar;

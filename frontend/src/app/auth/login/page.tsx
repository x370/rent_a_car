'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../Auth.module.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', formData);
    // Implementation for login will go here
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authCard} glass`}>
        <h2 className={styles.title}>Welcome <span>Back</span></h2>
        <p className={styles.subtitle}>Enter your credentials to access your account</p>
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn}>Login</button>
        </form>

        <p className={styles.switch}>
          Don't have an account? <Link href="/auth/register">Register Now</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

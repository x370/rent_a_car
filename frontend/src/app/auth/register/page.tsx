'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../Auth.module.css';
import { useAuth } from '@/hooks/useAuth';

const RegisterPage = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    phone: ''
  });
  const { register, loading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
    } catch (err) {
      // Error handled by hook
    }
  };

  return (
    <div className={styles.authContainer}>
      <div className={`${styles.authCard} glass`}>
        <h2 className={styles.title}>Create <span>Account</span></h2>
        <p className={styles.subtitle}>Join LuxeDrive and start your journey</p>
        
        {error && <div className={styles.errorMsg}>{error}</div>}
        
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input 
              type="text" 
              placeholder="John Doe"
              value={formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              value={formData.email}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <input 
              type="tel" 
              placeholder="+92 300 1234567"
              value={formData.phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              value={formData.password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, password: e.target.value })}
              required
            />
          </div>

          <button type="submit" className={styles.submitBtn} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>

        <p className={styles.switch}>
          Already have an account? <Link href="/auth/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

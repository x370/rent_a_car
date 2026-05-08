'use client';

import { Button, Typography } from 'antd';
import Link from 'next/link';
import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroGrid}>
          <div className={styles.heroContent} data-aos="fade-right">
            <Typography.Title className={styles.title}>
              Drive Your <span>Dreams</span> <br />
              With LuxeDrive
            </Typography.Title>
            <Typography.Paragraph className={styles.subtitle}>
              Experience the pinnacle of comfort and style. Rent the latest
              models from top brands with unmatched service and competitive pricing.
            </Typography.Paragraph>
            <div className={styles.cta}>
              <Link href="/cars">
                <Button type="primary" size="large" className={styles.primaryBtn}>
                  Explore Fleet
                </Button>
              </Link>
              <Button size="large" className={styles.secondaryBtn}>
                How it Works
              </Button>
            </div>

            <div className={styles.stats}>
              <div className={styles.statItem} data-aos="fade-up" data-aos-delay="100">
                <h3>50+</h3>
                <p>Luxury Cars</p>
              </div>
              <div className={styles.statItem} data-aos="fade-up" data-aos-delay="200">
                <h3>12k+</h3>
                <p>Happy Clients</p>
              </div>
              <div className={styles.statItem} data-aos="fade-up" data-aos-delay="300">
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
          
          <div className={styles.heroImageWrapper} data-aos="fade-left" data-aos-delay="400">
            <img src="/hero-car.png" alt="Luxury Car" className={styles.heroImage} />
            <div className={styles.glow}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

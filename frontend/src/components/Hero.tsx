import styles from './Hero.module.css';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={`${styles.textContent} animate-fade-in`}>
            <h1 className={styles.title}>
              Drive Your <span>Dreams</span> <br />
              With LuxeDrive
            </h1>
            <p className={styles.subtitle}>
              Experience the pinnacle of comfort and style. Rent the latest 
              models from top brands with unmatched service and competitive pricing.
            </p>
            <div className={styles.cta}>
              <button className={styles.primaryBtn}>Explore Fleet</button>
              <button className={styles.secondaryBtn}>How it Works</button>
            </div>
            
            <div className={styles.stats}>
              <div className={styles.statItem}>
                <h3>50+</h3>
                <p>Luxury Cars</p>
              </div>
              <div className={styles.statItem}>
                <h3>12k+</h3>
                <p>Happy Clients</p>
              </div>
              <div className={styles.statItem}>
                <h3>24/7</h3>
                <p>Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.heroImageWrapper}>
        <img src="/hero-car.png" alt="Luxury Car" className={styles.heroImage} />
        <div className={styles.glow}></div>
      </div>
    </section>
  );
};

export default Hero;

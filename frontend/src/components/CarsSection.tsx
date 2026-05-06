'use client';

import CarCard from './CarCard';
import styles from './CarsSection.module.css';
import { useCars } from '@/hooks/useCars';

const CarsSection = () => {
  const { cars, loading, error } = useCars();

  if (loading) return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <section className={styles.section} id="cars">
      <div className="container">
        <div className={styles.header}>
          <h2 className={styles.title}>Our <span>Fleet</span></h2>
          <p className={styles.subtitle}>Choose from our wide range of premium vehicles</p>
        </div>
        
        <div className="grid-cars">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsSection;

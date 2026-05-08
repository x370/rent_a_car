'use client';

import CarCard from './CarCard';
import styles from './CarsSection.module.css';
import { useCars } from '@/hooks/useCars';

interface CarsSectionProps {
  limit?: number;
  customCars?: any[];
}

const CarsSection = ({ limit, customCars }: CarsSectionProps) => {
  const { cars: allCars, loading, error } = useCars();
  
  const displayCars = customCars || allCars;

  if (loading && !customCars) return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );

  if (error && !customCars) return <div className={styles.error}>Error: {error}</div>;

  const finalCars = limit ? displayCars.slice(0, limit) : displayCars;

  return (
    <section className={styles.section} id="cars">
      <div className="container">
        <div className={styles.header} data-aos="fade-up">
          <h2 className={styles.title}>Our <span>Fleet</span></h2>
          <p className={styles.subtitle}>Choose from our wide range of premium vehicles</p>
        </div>
        
        <div className="grid-cars">
          {finalCars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CarsSection;

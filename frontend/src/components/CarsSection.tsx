'use client';

import { useEffect, useState } from 'react';
import CarCard from './CarCard';
import styles from './CarsSection.module.css';

const CarsSection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cars');
        if (!response.ok) throw new Error('Failed to fetch cars');
        const result = await response.json();
        setCars(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (loading) return (
    <div className={styles.loaderContainer}>
      <div className={styles.loader}></div>
    </div>
  );

  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <section className={styles.section}>
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

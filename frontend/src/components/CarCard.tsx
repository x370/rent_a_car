'use client';

import { Button, Tag, Divider } from 'antd';
import { DashboardOutlined, ControlOutlined, FireOutlined } from '@ant-design/icons';
import Link from 'next/link';
import styles from './CarCard.module.css';

interface CarProps {
  car: {
    id: number;
    name: string;
    brand: string;
    model: string;
    year: number;
    fuel_type: string;
    fuel_average: number;
    price_per_day_without_driver: number;
    image_url: string;
    transmission: string;
  };
}

const CarCard = ({ car }: CarProps) => {
  return (
    <Link href={`/cars/${car.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className={`${styles.card} glass`} data-aos="fade-up">
        <div className={styles.imageContainer}>
          <img src={car.image_url} alt={car.name} className={styles.image} />
          <div className={styles.priceTag}>
            Rs. {car.price_per_day_without_driver.toLocaleString()}<span>/day</span>
          </div>
        </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <Tag color="blue" style={{ marginBottom: '4px' }}>{car.brand}</Tag>
            <h3 className={styles.name}>{car.name} {car.model}</h3>
          </div>
          <span className={styles.year}>{car.year}</span>
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <DashboardOutlined />
            <span>{car.fuel_average} km/l</span>
          </div>
          <div className={styles.spec}>
            <ControlOutlined />
            <span>{car.transmission}</span>
          </div>
          <div className={styles.spec}>
            <FireOutlined />
            <span>{car.fuel_type}</span>
          </div>
        </div>

        <Divider style={{ margin: '1rem 0', borderColor: 'var(--glass-border)' }} />

        <Button type="primary" block size="large" className={styles.bookBtn}>
          Rent Now
        </Button>
      </div>
    </div>
    </Link>
  );
};

export default CarCard;

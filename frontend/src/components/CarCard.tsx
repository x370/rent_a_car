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
    <div className={`${styles.card} glass`}>
      <div className={styles.imageContainer}>
        <img src={car.image_url} alt={car.name} className={styles.image} />
        <div className={styles.priceTag}>
          Rs. {car.price_per_day_without_driver.toLocaleString()}<span>/day</span>
        </div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div>
            <span className={styles.brand}>{car.brand}</span>
            <h3 className={styles.name}>{car.name} {car.model}</h3>
          </div>
          <span className={styles.year}>{car.year}</span>
        </div>

        <div className={styles.specs}>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Fuel Avg</span>
            <span className={styles.specValue}>{car.fuel_average} km/l</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Transmission</span>
            <span className={styles.specValue}>{car.transmission}</span>
          </div>
          <div className={styles.spec}>
            <span className={styles.specLabel}>Fuel Type</span>
            <span className={styles.specValue}>{car.fuel_type}</span>
          </div>
        </div>

        <button className={styles.bookBtn}>Rent Now</button>
      </div>
    </div>
  );
};

export default CarCard;

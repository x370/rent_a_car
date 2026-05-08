const { PrismaClient, Role, Transmission } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create a default owner
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      name: 'Asad Khan',
      email: 'owner@example.com',
      phone: '03001234567',
      password: 'password123',
      role: Role.OWNER,
    },
  });

  console.log('Owner created:', owner.email);

  // Clear existing data to avoid conflicts
  await prisma.carImage.deleteMany();
  await prisma.car.deleteMany();

  const pakistaniCars = [
    {
      brand: 'Honda',
      name: 'Civic RS',
      model: 'Turbo 2024',
      images: [
        'https://images.unsplash.com/photo-1594502184342-2e12f877aa73', // Exterior
        'https://images.unsplash.com/photo-1532581291347-9c39cf10a73c', // Interior
        'https://images.unsplash.com/photo-1503376780353-7e6692767b70', // Side
        'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7', // Dashboard
      ]
    },
    {
      brand: 'Toyota',
      name: 'Fortuner',
      model: 'Sigma 4 2023',
      images: [
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        'https://images.unsplash.com/photo-1469285994282-454ceb49e63c',
        'https://images.unsplash.com/photo-1511919884226-fd3cad34687c',
        'https://images.unsplash.com/photo-1493238792040-81541dad8d00',
      ]
    },
    {
      brand: 'KIA',
      name: 'Sportage',
      model: 'AWD 2023',
      images: [
        'https://images.unsplash.com/photo-1621115127606-d760773d3257',
        'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2',
        'https://images.unsplash.com/photo-1552519507-da3b142c6e3d',
        'https://images.unsplash.com/photo-1542362567-b05261b20244',
      ]
    },
    {
      brand: 'Suzuki',
      name: 'Alto',
      model: 'VXL 2024',
      images: [
        'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d',
        'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a',
        'https://images.unsplash.com/photo-1486496146582-9ffcd0b2b2b7',
        'https://images.unsplash.com/photo-1494976388531-d1058494cdd8',
      ]
    },
    {
      brand: 'Hyundai',
      name: 'Tucson',
      model: 'GLS Sport 2024',
      images: [
        'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb',
        'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf',
        'https://images.unsplash.com/photo-1502877338535-766e1452684a',
        'https://images.unsplash.com/photo-1494905998402-395d579af36f',
      ]
    },
    {
      brand: 'MG',
      name: 'HS',
      model: 'Essence 2023',
      images: [
        'https://images.unsplash.com/photo-1632243193041-563a017a55c4',
        'https://images.unsplash.com/photo-1583121274602-3e2820c69888',
        'https://images.unsplash.com/photo-1494905998402-395d579af36f',
        'https://images.unsplash.com/photo-1560958089-b8a1929cea89',
      ]
    }
  ];

  const cities = ['Lahore', 'Karachi', 'Islamabad', 'Faisalabad', 'Peshawar', 'Multan'];
  const transmissions = [Transmission.AUTO, Transmission.MANUAL];
  const fuelTypes = ['Petrol', 'Hybrid', 'Diesel'];

  console.log('Seeding 60 Pakistani cars with 4 images each...');

  let count = 0;
  for (let i = 0; i < 60; i++) {
    const baseCar = pakistaniCars[i % pakistaniCars.length];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const transmission = transmissions[Math.floor(Math.random() * transmissions.length)];
    const fuelType = fuelTypes[Math.floor(Math.random() * fuelTypes.length)];
    const basePrice = 4000 + Math.floor(Math.random() * 15000);
    const year = 2020 + (i % 5);
    const plate = `PAK-${2000 + i}`;

    const carData = {
      name: baseCar.name,
      brand: baseCar.brand,
      model: `${baseCar.model}`,
      year: year,
      license_plate: plate,
      seating_capacity: baseCar.name === 'Fortuner' ? 7 : 5,
      transmission: transmission,
      fuel_type: fuelType,
      fuel_average: 10 + Math.random() * 8,
      price_per_day_without_driver: basePrice,
      price_per_day_with_driver: basePrice + 2500,
      city: city,
      image_url: `${baseCar.images[0]}?auto=format&fit=crop&q=80&w=800&sig=${i}_0`,
      owner_id: owner.id,
      is_available: true,
    };

    const car = await prisma.car.upsert({
      where: { license_plate: carData.license_plate },
      update: carData,
      create: carData,
    });

    // Create 4 images for this car
    for (let j = 0; j < 4; j++) {
      await prisma.carImage.create({
        data: {
          car_id: car.id,
          image_url: `${baseCar.images[j]}?auto=format&fit=crop&q=80&w=800&sig=${i}_${j}`,
          is_primary: j === 0,
        }
      });
    }
    
    count++;
  }

  console.log(`Seeding complete! ${count} Pakistani cars added with 4 images each.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

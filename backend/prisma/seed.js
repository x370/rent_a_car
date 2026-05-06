const { PrismaClient, Role, Transmission } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // 1. Create a default owner if not exists
  const owner = await prisma.user.upsert({
    where: { email: 'owner@example.com' },
    update: {},
    create: {
      name: 'John Doe',
      email: 'owner@example.com',
      phone: '1234567890',
      password: 'password123', // In real life, hash this
      role: Role.OWNER,
    },
  });

  console.log('Owner created:', owner.email);

  // 2. Sample Cars
  const cars = [
    {
      name: 'Civic',
      brand: 'Honda',
      model: '2023',
      year: 2023,
      license_plate: 'ABC-123',
      seating_capacity: 5,
      transmission: Transmission.AUTO,
      fuel_type: 'Petrol',
      fuel_average: 14.5,
      price_per_day_without_driver: 5000,
      price_per_day_with_driver: 7000,
      city: 'Lahore',
      image_url: 'https://images.unsplash.com/photo-1594502184342-2e12f877aa73?auto=format&fit=crop&q=80&w=800',
      owner_id: owner.id,
    },
    {
      name: 'Corolla',
      brand: 'Toyota',
      model: 'Altis',
      year: 2022,
      license_plate: 'XYZ-789',
      seating_capacity: 5,
      transmission: Transmission.AUTO,
      fuel_type: 'Petrol',
      fuel_average: 12.0,
      price_per_day_without_driver: 4500,
      price_per_day_with_driver: 6500,
      city: 'Karachi',
      image_url: 'https://images.unsplash.com/photo-1623860841270-2a628080f68c?auto=format&fit=crop&q=80&w=800',
      owner_id: owner.id,
    },
    {
      name: 'Sportage',
      brand: 'KIA',
      model: 'Alpha',
      year: 2023,
      license_plate: 'LHR-456',
      seating_capacity: 5,
      transmission: Transmission.AUTO,
      fuel_type: 'Petrol',
      fuel_average: 10.5,
      price_per_day_without_driver: 8000,
      price_per_day_with_driver: 10000,
      city: 'Islamabad',
      image_url: 'https://images.unsplash.com/photo-1621115127606-d760773d3257?auto=format&fit=crop&q=80&w=800',
      owner_id: owner.id,
    },
    {
      name: 'Mehran',
      brand: 'Suzuki',
      model: 'VX',
      year: 2018,
      license_plate: 'SUZ-001',
      seating_capacity: 4,
      transmission: Transmission.MANUAL,
      fuel_type: 'Petrol',
      fuel_average: 18.0,
      price_per_day_without_driver: 2000,
      price_per_day_with_driver: 3500,
      city: 'Lahore',
      image_url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&q=80&w=800',
      owner_id: owner.id,
    }
  ];

  for (const carData of cars) {
    await prisma.car.upsert({
      where: { license_plate: carData.license_plate },
      update: carData,
      create: carData,
    });
  }

  console.log('Sample cars seeded successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

'use client';

import { useState, useEffect, useMemo } from 'react';
import Navbar from '@/components/Navbar';
import CarsSection from '@/components/CarsSection';
import { Typography, Breadcrumb, Divider, Row, Col, Input, Select, Slider, Card, Button, Space } from 'antd';
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useCars } from '@/hooks/useCars';

const { Title, Paragraph } = Typography;

export default function BrowseCarsPage() {
  const { cars, loading } = useCars();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);

  const brands = useMemo(() => Array.from(new Set(cars.map(c => c.brand))), [cars]);
  const cities = useMemo(() => Array.from(new Set(cars.map(c => c.city))), [cars]);

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(search.toLowerCase()) || 
                           car.brand.toLowerCase().includes(search.toLowerCase());
      const matchesBrand = !selectedBrand || car.brand === selectedBrand;
      const matchesCity = !selectedCity || car.city === selectedCity;
      const matchesPrice = car.price_per_day_without_driver >= priceRange[0] && 
                          car.price_per_day_without_driver <= priceRange[1];
      
      return matchesSearch && matchesBrand && matchesCity && matchesPrice;
    });
  }, [cars, search, selectedBrand, selectedCity, priceRange]);

  const handleReset = () => {
    setSearch('');
    setSelectedBrand(null);
    setSelectedCity(null);
    setPriceRange([0, 50000]);
  };

  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '2rem' }}>
        <Breadcrumb
          items={[
            { title: <Link href="/">Home</Link> },
            { title: 'Browse Cars' },
          ]}
          style={{ marginBottom: '2rem' }}
        />
        
        <div style={{ marginBottom: '3rem' }}>
          <Title className="animate-fade-in" style={{ marginBottom: '0.5rem' }}>
            Our Premium <span style={{ color: 'var(--primary)' }}>Fleet</span>
          </Title>
          <Paragraph style={{ fontSize: '1.1rem', color: 'var(--text-dim)' }}>
            Search and filter through our extensive collection of {cars.length} luxury vehicles.
          </Paragraph>
        </div>

        <Card className="glass" style={{ marginBottom: '3rem', border: '1px solid var(--glass-border)' }}>
          <Row gutter={[24, 24]} align="bottom">
            <Col xs={24} md={6}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Search</div>
              <Input 
                placeholder="Search car or brand..." 
                prefix={<SearchOutlined />} 
                size="large"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </Col>
            <Col xs={24} sm={12} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Brand</div>
              <Select
                placeholder="All Brands"
                style={{ width: '100%' }}
                size="large"
                allowClear
                value={selectedBrand}
                onChange={value => setSelectedBrand(value)}
                options={brands.map(b => ({ label: b, value: b }))}
              />
            </Col>
            <Col xs={24} sm={12} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>Location</div>
              <Select
                placeholder="All Cities"
                style={{ width: '100%' }}
                size="large"
                allowClear
                value={selectedCity}
                onChange={value => setSelectedCity(value)}
                options={cities.map(c => ({ label: c, value: c }))}
              />
            </Col>
            <Col xs={24} md={5}>
              <div style={{ marginBottom: 8, fontWeight: 600 }}>
                Price Range (Rs. {priceRange[0]} - {priceRange[1]})
              </div>
              <Slider 
                range 
                min={0} 
                max={50000} 
                step={1000}
                value={priceRange}
                onChange={val => setPriceRange(val as [number, number])}
              />
            </Col>
            <Col xs={24} md={3}>
              <Button 
                block 
                icon={<ReloadOutlined />} 
                onClick={handleReset}
                size="large"
              >
                Reset
              </Button>
            </Col>
          </Row>
        </Card>

        <Divider style={{ borderColor: 'var(--glass-border)' }} />
      </div>

      <CarsSection customCars={filteredCars} />

      {!loading && filteredCars.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem 0' }}>
          <Title level={3}>No cars found matching your criteria</Title>
          <Button type="primary" onClick={handleReset}>Clear All Filters</Button>
        </div>
      )}

      <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <Paragraph style={{ color: 'var(--text-dim)' }}>
          Don't see what you're looking for? <Link href="/contact" style={{ color: 'var(--primary)' }}>Contact us</Link> and we'll help you find it.
        </Paragraph>
      </div>
    </main>
  );
}

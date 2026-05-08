'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import { Typography, Row, Col, Card, Button, Tag, Space, Divider, Spin, Empty } from 'antd';
import { 
  ArrowLeftOutlined, 
  DashboardOutlined, 
  ControlOutlined, 
  FireOutlined, 
  TeamOutlined, 
  GlobalOutlined,
  CheckCircleOutlined
} from '@ant-design/icons';
import { useCars } from '@/hooks/useCars';

const { Title, Paragraph, Text } = Typography;

export default function CarDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { cars, loading } = useCars();
  const [car, setCar] = useState<any>(null);
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (cars.length > 0) {
      const foundCar = cars.find(c => c.id === Number(id));
      setCar(foundCar);
      if (foundCar && foundCar.images && foundCar.images.length > 0) {
        setActiveImage(foundCar.images[0].image_url);
      } else if (foundCar) {
        setActiveImage(foundCar.image_url);
      }
    }
  }, [cars, id]);

  if (loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" description="Loading car details..." />
      </div>
    );
  }

  if (!car && !loading) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <Empty description="Car not found" />
        <Button onClick={() => router.push('/cars')}>Back to Fleet</Button>
      </div>
    );
  }

  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '2rem' }}>
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.back()} 
          style={{ marginBottom: '2rem' }}
        >
          Back
        </Button>

        <Row gutter={[48, 48]}>
          <Col xs={24} lg={14}>
            <div data-aos="fade-right">
              {/* Main Image */}
              <img 
                src={activeImage} 
                alt={car.name} 
                style={{ 
                  width: '100%', 
                  height: '450px',
                  objectFit: 'cover',
                  borderRadius: '24px', 
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  marginBottom: '1rem'
                }} 
              />
              
              {/* Thumbnails */}
              <Row gutter={[12, 12]} style={{ marginBottom: '2rem' }}>
                {car.images?.map((img: any, idx: number) => (
                  <Col span={6} key={img.id}>
                    <img 
                      src={img.image_url} 
                      alt={`${car.name} view ${idx + 1}`}
                      onClick={() => setActiveImage(img.image_url)}
                      style={{ 
                        width: '100%', 
                        height: '80px', 
                        objectFit: 'cover', 
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: activeImage === img.image_url ? '3px solid var(--primary)' : '2px solid transparent',
                        transition: 'all 0.3s'
                      }}
                    />
                  </Col>
                ))}
              </Row>

              <Card className="glass" title="Features & Specifications" style={{ border: '1px solid var(--glass-border)' }}>
                <Row gutter={[16, 16]}>
                  <Col span={12} md={6}>
                    <Space orientation="vertical" align="center" style={{ width: '100%' }}>
                      <DashboardOutlined style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                      <Text type="secondary">Fuel Avg</Text>
                      <Text strong>{car.fuel_average?.toFixed(1)} km/l</Text>
                    </Space>
                  </Col>
                  <Col span={12} md={6}>
                    <Space orientation="vertical" align="center" style={{ width: '100%' }}>
                      <ControlOutlined style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                      <Text type="secondary">Transmission</Text>
                      <Text strong>{car.transmission}</Text>
                    </Space>
                  </Col>
                  <Col span={12} md={6}>
                    <Space orientation="vertical" align="center" style={{ width: '100%' }}>
                      <FireOutlined style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                      <Text type="secondary">Fuel Type</Text>
                      <Text strong>{car.fuel_type}</Text>
                    </Space>
                  </Col>
                  <Col span={12} md={6}>
                    <Space orientation="vertical" align="center" style={{ width: '100%' }}>
                      <TeamOutlined style={{ fontSize: '1.5rem', color: 'var(--primary)' }} />
                      <Text type="secondary">Capacity</Text>
                      <Text strong>{car.seating_capacity} Persons</Text>
                    </Space>
                  </Col>
                </Row>
              </Card>
            </div>
          </Col>

          <Col xs={24} lg={10}>
            <div data-aos="fade-left">
              <Tag color="blue" style={{ fontSize: '1rem', padding: '4px 12px', marginBottom: '1rem' }}>{car.brand}</Tag>
              <Title level={1} style={{ marginBottom: '0.5rem' }}>{car.name} {car.model}</Title>
              <Space style={{ marginBottom: '2rem' }}>
                <GlobalOutlined /> <Text type="secondary">{car.city}</Text>
              </Space>

              <Card className="glass" style={{ marginBottom: '2rem', background: 'var(--surface)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <Text type="secondary" style={{ display: 'block' }}>Daily Rent</Text>
                    <Title level={2} style={{ margin: 0, color: 'var(--primary)' }}>
                      Rs. {car.price_per_day_without_driver.toLocaleString()}
                    </Title>
                  </div>
                  <Tag color="green">Available</Tag>
                </div>
              </Card>

              <Paragraph style={{ fontSize: '1.1rem', color: 'var(--text-dim)', marginBottom: '2rem' }}>
                Experience the ultimate comfort and performance with the {car.brand} {car.name}. 
                This vehicle is meticulously maintained and comes with all the premium features 
                you expect for a smooth and safe journey.
              </Paragraph>

              <Divider style={{ borderColor: 'var(--glass-border)' }} />

              <Title level={4}>What's included:</Title>
              <ul style={{ paddingLeft: '1.5rem', color: 'var(--text-dim)', marginBottom: '3rem' }}>
                <li>24/7 Roadside Assistance</li>
                <li>Free Cancellation (up to 24h)</li>
                <li>Comprehensive Insurance</li>
                <li>Clean and Sanitized Interior</li>
              </ul>

              <Button 
                type="primary" 
                size="large" 
                block 
                style={{ height: '60px', fontSize: '1.2rem', fontWeight: 'bold', borderRadius: '16px' }}
                onClick={() => router.push('/auth/login')}
              >
                Register to Book Now
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </main>
  );
}

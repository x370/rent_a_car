'use client';

import Navbar from '@/components/Navbar';
import { Typography, Row, Col, Card, Timeline } from 'antd';
import { TrophyOutlined, TeamOutlined, GlobalOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <Title className="animate-fade-in">About <span style={{ color: 'var(--primary)' }}>LuxeDrive</span></Title>
          <Paragraph style={{ fontSize: '1.2rem', color: 'var(--text-dim)', maxWidth: '800px', margin: '0 auto' }}>
            We are more than just a car rental company. We are your gateway to luxury and comfort on the road.
          </Paragraph>
        </div>

        <Row gutter={[32, 32]} style={{ marginBottom: '6rem' }}>
          <Col xs={24} md={12}>
            <Title level={2}>Our Mission</Title>
            <Paragraph style={{ fontSize: '1.1rem' }}>
              At LuxeDrive, our mission is to redefine the car rental experience by providing an unparalleled selection of premium vehicles coupled with world-class customer service. We believe that every journey should be as memorable as the destination itself.
            </Paragraph>
            <Paragraph style={{ fontSize: '1.1rem' }}>
              Founded in 2020, we have grown from a small fleet of luxury sedans to a comprehensive collection of sports cars, SUVs, and exotic vehicles, serving thousands of happy clients across the globe.
            </Paragraph>
          </Col>
          <Col xs={24} md={12}>
            <Card className="glass" style={{ border: '1px solid var(--glass-border)' }}>
              <Timeline
                mode="start"
                items={[
                  {
                    title: '2020',
                    content: 'LuxeDrive Founded with 5 Luxury Sedans',
                    color: 'var(--primary)',
                  },
                  {
                    title: '2021',
                    content: 'Expanded to Sports & SUV Collections',
                  },
                  {
                    title: '2023',
                    content: 'Opened 10 New Locations Globally',
                  },
                  {
                    title: '2026',
                    content: 'Voted #1 Premium Car Rental App',
                    color: 'green',
                  },
                ]}
              />
            </Card>
          </Col>
        </Row>

        <Title level={2} style={{ textAlign: 'center', marginBottom: '3rem' }}>Why Choose Us?</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass" hoverable style={{ height: '100%', textAlign: 'center' }}>
              <TrophyOutlined style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <Title level={4}>Best Quality</Title>
              <Text type="secondary">Every car in our fleet is meticulously maintained and regularly serviced.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass" hoverable style={{ height: '100%', textAlign: 'center' }}>
              <TeamOutlined style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <Title level={4}>Expert Team</Title>
              <Text type="secondary">Our staff are car enthusiasts dedicated to providing you the best service.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass" hoverable style={{ height: '100%', textAlign: 'center' }}>
              <GlobalOutlined style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <Title level={4}>Global Reach</Title>
              <Text type="secondary">Pick up and drop off at hundreds of locations worldwide.</Text>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Card className="glass" hoverable style={{ height: '100%', textAlign: 'center' }}>
              <RocketOutlined style={{ fontSize: '3rem', color: 'var(--primary)', marginBottom: '1rem' }} />
              <Title level={4}>Fast Booking</Title>
              <Text type="secondary">Our app makes it incredibly simple to book your dream car in seconds.</Text>
            </Card>
          </Col>
        </Row>
      </div>
    </main>
  );
}

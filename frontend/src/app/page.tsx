import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarsSection from '@/components/CarsSection';
import { Button } from 'antd';
import Link from 'next/link';
import { ArrowRightOutlined } from '@ant-design/icons';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      
      <CarsSection limit={6} />
      
      <div style={{ textAlign: 'center', paddingBottom: '6rem' }} data-aos="fade-up">
        <Link href="/cars">
          <Button 
            type="primary" 
            size="large" 
            icon={<ArrowRightOutlined />}
            style={{ 
              height: '56px', 
              padding: '0 3rem', 
              fontSize: '1.1rem', 
              fontWeight: 'bold',
              borderRadius: '14px'
            }}
          >
            Show More Cars
          </Button>
        </Link>
      </div>
      
      {/* Footer */}
      <footer className="glass" style={{ padding: '4rem 0', marginTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)' }}>&copy; 2026 LuxeDrive Premium Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

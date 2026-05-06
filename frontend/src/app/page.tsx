import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CarsSection from '@/components/CarsSection';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <CarsSection />
      
      {/* Footer */}
      <footer className="glass" style={{ padding: '4rem 0', marginTop: '4rem', borderTop: '1px solid var(--glass-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <p style={{ color: 'var(--text-dim)' }}>&copy; 2026 LuxeDrive Premium Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}

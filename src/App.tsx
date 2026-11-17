import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WhatsAppFloat } from './components/WhatsAppFloat';
import { CakeProduct, CakeSize, MENU_CAKES } from './data/cakes';

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState<{
    productId: string;
    size: CakeSize;
  }>({
    productId: MENU_CAKES[0].id,
    size: '25 fatias',
  });

  const scrollToContact = () => {
    const target = document.getElementById('contato');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProduct = (product: CakeProduct, size: CakeSize) => {
    setSelectedOrder({ productId: product.id, size });
    scrollToContact();
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-quartz/30 selection:text-foreground">
      <Navbar onContactClick={scrollToContact} />
      <main>
        <HeroSection onContactClick={scrollToContact} />
        <MenuSection onSelectProduct={handleSelectProduct} />
        <AboutSection onContactClick={scrollToContact} />
        <ContactSection
          selectedOrder={selectedOrder}
          onOrderChange={setSelectedOrder}
        />
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}

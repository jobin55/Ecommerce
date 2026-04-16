import React from 'react';
import { Link } from 'react-router-dom';
import '../style/Home.css';

export default function Home() {
  const products = [
    { id: 1, name: 'Aura Sync Watch', category: 'Wearables', price: '$299', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&q=80&w=400' },
    { id: 2, name: 'Nexus Keyboard', category: 'Accessories', price: '$149', image: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400' },
    { id: 3, name: 'Echo Smart Lens', category: 'Optics', price: '$599', image: 'https://images.unsplash.com/photo-1514916298197-2a1c0d512a87?auto=format&fit=crop&q=80&w=400' },
    { id: 4, name: 'Vortex Controller', category: 'Gaming', price: '$89', image: 'https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=400' },
  ];

  return (
    <>
      {/* Hero Section */}
      <section className="ecom-hero">
        <div className="ecom-hero-content">
          <h1 className="ecom-hero-title">Experience <span>Sound</span> Like Never Before.</h1>
          <p className="ecom-hero-subtitle">
            Immersive audio meets minimalist design. Discover our new flagship wireless headphones with active noise cancellation and spatial audio processing.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button className="ecom-btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Buy Now - $349</button>
            <button className="ecom-btn-outline" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>View Specs</button>
          </div>
        </div>
        <div className="ecom-hero-image-wrap">
          <img src="/headphones.png" alt="Premium Wireless Headphones" className="ecom-hero-main-image" />
          <div className="ecom-glow"></div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="ecom-products">
        <div className="ecom-section-header">
          <h2 className="ecom-section-title">Trending Now</h2>
          <Link to="/" className="ecom-nav-link" style={{ color: 'var(--ecom-primary)' }}>View All Products →</Link>
        </div>
        
        <div className="ecom-grid">
          {products.map((product) => (
            <div key={product.id} className="ecom-card">
              <div className="ecom-card-image">
                <img src={product.image} alt={product.name} />
              </div>
              <div className="ecom-card-content">
                <span className="ecom-card-category">{product.category}</span>
                <h3 className="ecom-card-title">{product.name}</h3>
                <div className="ecom-card-price">{product.price}</div>
                <div className="ecom-card-actions">
                  <button className="ecom-btn-outline">Details</button>
                  <button className="ecom-btn-primary">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

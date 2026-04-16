import React from 'react';

export default function Footer() {
  return (
    <footer className="ecom-footer">
      <div>© 2026 JOBS Tech. All rights reserved.</div>
      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <span style={{ cursor: 'pointer' }}>Privacy Policy</span>
        <span style={{ cursor: 'pointer' }}>Terms of Service</span>
      </div>
    </footer>
  );
}

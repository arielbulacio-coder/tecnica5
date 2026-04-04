import React from 'react';

const Footer = () => {
    return (
        <footer style={{
            marginTop: '4rem',
            padding: '3rem 2rem',
            background: 'var(--nav-bg)',
            borderTop: '1px solid var(--glass-border)',
            color: 'var(--text-dim)',
            fontSize: '0.9rem',
            transition: 'background-color 0.3s ease'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', textAlign: 'left' }}>

                {/* Info Institucional */}
                <div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>EEST Nro 5 José C. Paz</h3>
                    <p>Especialidad Energías Renovables</p>
                    <p style={{ marginTop: '1rem', fontStyle: 'italic' }}>"Formando los técnicos del futuro"</p>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h4 style={{ color: 'var(--text-main)', marginBottom: '0.5rem' }}>Contacto</h4>
                        <p style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
                            <span>📧</span> info@tecnica5jcp.edu.ar
                        </p>
                    </div>
                </div>


                {/* Ubicación (Google Maps) */}
                <div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>Ubicación</h3>
                    <p style={{ marginBottom: '0.5rem' }}><a href="https://maps.google.com/?q=-34.501659,-58.812553" target="_blank" rel="noopener noreferrer" style={{ color: 'white', textDecoration: 'none' }}>📍 Cuenca y Pampa, José C. Paz</a></p>
                    <div style={{ borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                        <iframe
                            title="Ubicacion EEST Nro 5"
                            src="https://maps.google.com/maps?q=-34.501659,-58.812553&t=&z=16&ie=UTF8&iwloc=&output=embed"
                            width="100%"
                            height="150"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>
                </div>

                {/* Redes */}
                <div>
                    <h3 style={{ color: 'var(--text-main)', marginBottom: '1rem' }}>¡Seguinos en nuestras redes!</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {/* Facebook */}
                        <a href="https://www.facebook.com/share/185mEVjiVV/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1877F2', textDecoration: 'none', fontWeight: 'bold' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                            Facebook
                        </a>

                        {/* Instagram */}
                        <a href="https://www.instagram.com/e.e.s.t.5?igsh=N2IzOGttMzlubmxh&utm_source=qr" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#E1306C', textDecoration: 'none', fontWeight: 'bold' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.204.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                            Instagram
                        </a>

                        {/* TikTok */}
                        <a href="https://www.tiktok.com/@tecnica.5.redes?_r=1&_t=ZS-94p4C4Y5H1E" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#00F2EA', textDecoration: 'none', fontWeight: 'bold' }}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                            </svg>
                            TikTok
                        </a>

                        {/* YouTube temporalmente oculto */}
                    </div>
                </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>
                    {"\u00a9 2026 EEST Nro 5 Jos\u00e9 C. Paz. Desarrollo Did\u00e1ctico."}
                    {" | desarrollado por "}
                    <a href="https://www.activsoft.com.ar" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 'bold' }}>
                        ActivSoft
                    </a>
                </p>
            </div>
        </footer >
    );
};

export default Footer;


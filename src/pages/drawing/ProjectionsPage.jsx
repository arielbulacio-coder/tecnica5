import React from 'react';
import './DrawingStyles.css';

const ProjectionsPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Método Monge y Proyecciones</h1>
                <p>El lenguaje universal de los planos industriales: vistas ortogonales.</p>
            </header>

            <div className="projections-intro">
                <section className="drawing-card">
                    <h2>Proyecciones Ortogonales</h2>
                    <p>
                        Consiste en proyectar un objeto sobre planos perpendiculares entre sí, logrando una representación de sus dimensiones reales en cada vista.
                    </p>
                    <div className="iso-systems-grid">
                        <div className="system-card">
                            <h3>ISO E (Método Europeo)</h3>
                            <p>Utilizado en Argentina (IRAM). El objeto está entre el observador y el plano. El símbolo es el tronco de cono con el círculo a la derecha.</p>
                            <svg viewBox="0 0 100 60" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                                {/* ISO E Symbol */}
                                <circle cx="75" cy="30" r="15" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <circle cx="75" cy="30" r="8" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="20" x2="10" y2="40" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="40" y1="15" x2="40" y2="45" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="20" x2="40" y2="15" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="10" y1="40" x2="40" y2="45" stroke="var(--primary-color)" strokeWidth="1" />
                                <line x1="5" y1="30" x2="95" y2="30" stroke="var(--text-dim)" strokeDasharray="5,2" />
                            </svg>
                        </div>
                        <div className="system-card">
                            <h3>ISO A (Método Americano)</h3>
                            <p>Utilizado en EEUU y otros países. El plano está entre el observador y el objeto. El símbolo tiene el círculo a la izquierda.</p>
                            <svg viewBox="0 0 100 60" width="200" style={{ margin: '1rem auto', display: 'block' }}>
                                {/* ISO A Symbol */}
                                <circle cx="25" cy="30" r="15" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                                <circle cx="25" cy="30" r="8" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                                <line x1="60" y1="20" x2="60" y2="40" stroke="var(--secondary-color)" strokeWidth="1" />
                                <line x1="90" y1="15" x2="90" y2="45" stroke="var(--secondary-color)" strokeWidth="1" />
                                <line x1="60" y1="20" x2="90" y2="15" stroke="var(--secondary-color)" strokeWidth="1" />
                                <line x1="60" y1="40" x2="90" y2="45" stroke="var(--secondary-color)" strokeWidth="1" />
                                <line x1="5" y1="30" x2="95" y2="30" stroke="var(--text-dim)" strokeDasharray="5,2" />
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Las Tres Vistas Principales</h2>
                    <ol>
                        <li><strong>Vista Anterior (Alzado):</strong> Es la vista de frente. Se elige la más representativa.</li>
                        <li><strong>Vista Superior (Planta):</strong> Ubicada debajo del alzado (Europeo).</li>
                        <li><strong>Vista Lateral Izquierda:</strong> Ubicada a la derecha del alzado (Europeo).</li>
                    </ol>
                    <div className="monge-diagram" style={{ background: '#000', padding: '1rem', border: '1px solid var(--primary-color)', textAlign: 'center' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px', maxWidth: '300px', margin: '0 auto' }}>
                            <div style={{ border: '1px solid #555', padding: '1rem' }}>FRENTE</div>
                            <div style={{ border: '1px solid #555', padding: '1rem' }}>L. IZQ</div>
                            <div style={{ border: '1px solid #555', padding: '1rem' }}>SUPERIOR</div>
                            <div style={{ border: '1px solid #555', padding: '1rem', visibility: 'hidden' }}></div>
                        </div>
                    </div>
                </section>
            </div>

            <section className="practical-exercise">
                <h3>Simulador de Monge (Próximamente)</h3>
                <p>Estamos trabajando en un simulador 3D donde podrás manipular un cubo y ver cómo se proyectan sus vistas en tiempo real.</p>
            </section>
        </div>
    );
};

export default ProjectionsPage;

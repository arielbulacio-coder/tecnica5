import React from 'react';
import './DrawingStyles.css';

const ProjectionsPage = () => {
    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Proyecciones Ortogonales (Método Monge)</h1>
                <p>Cómo "desarmar" un objeto 3D para comunicarlo en un plano 2D.</p>
            </header>

            <div className="drawing-grid">
                {/* LA CAJA DE CRISTAL */}
                <section className="drawing-card full-width visual-demo">
                    <div className="demo-content">
                        <div className="demo-canvas">
                            <svg viewBox="0 0 100 100" width="300" className="glass-box-svg">
                                {/* Cubo de cristal con transparencia */}
                                <rect x="20" y="20" width="60" height="60" fill="rgba(0, 242, 255, 0.05)" stroke="var(--primary-color)" strokeWidth="0.3" strokeDasharray="1,1" />
                                <path d="M20 20 L40 0 L100 0 L100 60 L80 80" fill="none" stroke="var(--primary-color)" strokeWidth="0.3" strokeDasharray="1,1" />
                                <line x1="80" y1="20" x2="100" y2="0" stroke="var(--primary-color)" strokeWidth="0.3" strokeDasharray="1,1" />

                                {/* Proyección en las caras */}
                                <rect x="30" y="30" width="40" height="40" fill="none" stroke="var(--primary-color)" strokeWidth="1" />
                                <text x="35" y="55" fill="#fff" fontSize="4" fontWeight="bold">FRENTE</text>

                                <path d="M85 30 L85 70" fill="none" stroke="var(--secondary-color)" strokeWidth="1" />
                                <text x="88" y="55" fill="var(--secondary-color)" fontSize="3" transform="rotate(90, 88, 55)">LATERAL</text>
                            </svg>
                        </div>
                        <div className="demo-text">
                            <h2>La "Caja de Cristal"</h2>
                            <p className="highlight-text">Imagina el objeto dentro de una caja de vidrio transparente.</p>
                            <p>Proyectar es mirar cada cara del objeto DESDE el infinito y dibujar su silueta sobre la pared de la caja.</p>
                            <div className="info-box">
                                <strong>ISO E:</strong> Normas IRAM. El objeto está ENTRE el observador y el plano.
                            </div>
                        </div>
                    </div>
                </section>

                {/* EL TRIUNVIRATO DE VISTAS */}
                <section className="drawing-card full-width">
                    <h2>Disposición de las 3 Vistas (ISO E)</h2>
                    <div className="vistas-graph">
                        <div className="vistas-main-grid">
                            <div className="vista-label">SUPERIOR</div>
                            <div className="vista-graph-item center">ALZADO (FRENTE)</div>
                            <div className="vista-label side">LATERAL IZQUIERDA</div>
                            <div className="vista-graph-item bottom">PLANTA (SUPERIOR)</div>
                            <div className="vista-graph-item right">LATERAL DERECHA</div>
                        </div>
                        <div className="vistas-explanation">
                            <p><strong>REGLA DE ORO:</strong> Las vistas deben estar ALINEADAS entre sí. No puedes dibujarlas en cualquier lugar de la hoja.</p>
                            <ul>
                                <li><strong>Correspondencia:</strong> El ancho del frente es el mismo que el de la planta.</li>
                                <li><strong>Altura:</strong> La altura del frente es la misma que la del lateral.</li>
                                <li><strong>Profundidad:</strong> La profundidad de la planta es la misma que el ancho del lateral.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Cortes y Secciones Gráficas</h2>
                    <p>Cuando el objeto tiene huecos interiores, lo "cortamos" virtualmente para ver su estructura.</p>
                    <div className="cut-demo">
                        <svg viewBox="0 0 100 40" width="200" style={{ marginTop: '1rem' }}>
                            <rect x="10" y="5" width="80" height="30" fill="none" stroke="#fff" />
                            <line x1="50" y1="0" x2="50" y2="40" stroke="var(--primary-color)" strokeWidth="1" strokeDasharray="5,2" />
                            <text x="52" y="10" fill="var(--primary-color)" fontSize="5">A-A</text>
                            <path d="M10 5 L90 5 L90 35 L10 35 Z" fill="url(#diagonal-stripe)" />
                        </svg>
                        <p className="small-text">El rayado a 45° indica la superficie material cortada (IRAM 4502).</p>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Acotación Progresiva</h2>
                    <p>En el plano, las cotas deben seguir el orden de fabricación: Medidas de posición y luego de tamaño.</p>
                </section>
            </div>

            <style>{`
                .vistas-graph { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-top: 2rem; }
                .vistas-main-grid { display: grid; grid-template-areas: ". superior ." "izq centro der" ". planta ."; gap: 10px; text-align: center; }
                .vista-graph-item { padding: 1.5rem; border: 2px solid var(--primary-color); background: rgba(0, 242, 255, 0.05); border-radius: 8px; font-weight: bold; font-size: 0.8rem; height: 100px; display: flex; align-items: center; justify-content: center; }
                .vista-graph-item.center { grid-area: centro; border-color: #fff; }
                .vista-graph-item.bottom { grid-area: planta; }
                .vista-graph-item.right { grid-area: der; }
                .vista-label { font-size: 0.7rem; color: var(--text-dim); }
                .cut-demo { background: rgba(0,0,0,0.3); padding: 1rem; border-radius: 8px; text-align: center; }
                @media (max-width: 800px) { .vistas-graph { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
};

export default ProjectionsPage;

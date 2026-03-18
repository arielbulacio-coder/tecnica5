import React, { useState } from 'react';
import './DrawingStyles.css';

const GeometricalConstructionsPage = () => {
    const [step, setStep] = useState(0);

    const hexagonSteps = [
        "Dibujar el eje central (Trazo y punto).",
        "Con el compás, trazar una circunferencia con radio R igual al lado del hexágono.",
        "Sin cambiar el radio, apoyá sobre un extremo del diámetro horizontal (A) y traza arcos arriba y abajo.",
        "Repetí operando desde el otro extremo (B).",
        "Uní los 6 puntos resultantes con trazo definitivo (Tipo A)."
    ];

    const nextStep = () => setStep((prev) => (prev < hexagonSteps.length - 1 ? prev + 1 : prev));
    const resetSteps = () => setStep(0);

    return (
        <div className="drawing-container">
            <header className="drawing-header">
                <h1>Construcciones Geométricas</h1>
                <p>Uso preciso de regla, compás y escuadras.</p>
            </header>

            <div className="drawing-grid">
                {/* Paso a paso dinámico - Hexágono */}
                <section className="drawing-card full-width">
                    <h2>Hexágono Regular (Dada la circunferencia)</h2>
                    <div className="step-by-step-module">
                        <div className="step-text">
                            <h3>Paso {step + 1}:</h3>
                            <p>{hexagonSteps[step]}</p>
                            <div className="step-controls">
                                <button className="step-btn" onClick={resetSteps}>Reiniciar</button>
                                <button className="step-btn next" onClick={nextStep}>Siguiente Paso</button>
                            </div>
                        </div>
                        <div className="step-viz">
                            <svg viewBox="0 0 100 100" width="300">
                                {/* Circunferencia base */}
                                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeDasharray={step > 0 ? "0" : "2,2"} />

                                {/* Ejes horizontales y verticales */}
                                <line x1="5" y1="50" x2="95" y2="50" stroke="#444" strokeDasharray="5,2,1,2" />
                                <line x1="50" y1="5" x2="50" y2="95" stroke="#444" strokeDasharray="5,2,1,2" />

                                {step >= 1 && <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary-color)" strokeWidth="0.5" />}

                                {step >= 2 && (
                                    <>
                                        <path d="M90 50 A 40 40 0 0 0 50 10" fill="none" stroke="rgba(0, 242, 255, 0.3)" />
                                        <path d="M90 50 A 40 40 0 0 1 50 90" fill="none" stroke="rgba(0, 242, 255, 0.3)" />
                                    </>
                                )}

                                {step >= 3 && (
                                    <>
                                        <path d="M10 50 A 40 40 0 0 0 50 90" fill="none" stroke="rgba(0, 242, 255, 0.3)" />
                                        <path d="M10 50 A 40 40 0 0 1 50 10" fill="none" stroke="rgba(0, 242, 255, 0.3)" />
                                    </>
                                )}

                                {step >= 4 && (
                                    <polygon points="90,50 70,84.6 30,84.6 10,50 30,15.4 70,15.4" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" />
                                )}
                            </svg>
                        </div>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Elipse (Óvalo por 4 centros)</h2>
                    <p>
                        Se utiliza para representar círculos en perspectiva isométrica. Los centros se obtienen cruzando medianas y diagonales del rombo isométrico.
                    </p>
                    <div className="isometric-ellipse-demo">
                        <svg viewBox="0 0 100 80" width="200" style={{ margin: '1rem auto' }}>
                            <path d="M50 10 L80 27.3 L50 44.6 L20 27.3 Z" fill="none" stroke="#444" strokeDasharray="2,1" />
                            <ellipse cx="50" cy="27.3" rx="28" ry="16" fill="none" stroke="var(--primary-color)" />
                        </svg>
                    </div>
                </section>

                <section className="drawing-card">
                    <h2>Construcción de Polígonos</h2>
                    <ul>
                        <li><strong>Pentágono:</strong> Basado en la bisección de radios y el segmento áureo.</li>
                        <li><strong>Heptágono:</strong> Basado en la mitad de la cuerda de 60°.</li>
                        <li><strong>Polígonos Cualquier número:</strong> Método de Bion.</li>
                    </ul>
                </section>
            </div>

            <style>{`
                .full-width { grid-column: 1 / -1; }
                .step-by-step-module { 
                    display: flex; gap: 2rem; align-items: center; justify-content: space-around;
                    background: rgba(0,0,0,0.3); padding: 2rem; border-radius: 12px;
                }
                .step-btn {
                    padding: 0.8rem 1.5rem; border-radius: 8px; border: 1px solid var(--primary-color);
                    background: transparent; color: var(--primary-color); cursor: pointer;
                    margin-right: 1rem; transition: background 0.3s;
                }
                .step-btn.next { background: var(--primary-color); color: #000; font-weight: bold; }
                .step-btn:hover { background: var(--primary-color); color: #000; }
                .step-text { flex: 1; }
                .step-viz { flex: 1; text-align: center; }
                @media (max-width: 600px) { .step-by-step-module { flex-direction: column; } }
            `}</style>
        </div>
    );
};

export default GeometricalConstructionsPage;

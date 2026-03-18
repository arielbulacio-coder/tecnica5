import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FileText, Video, Link as LinkIcon, PlusCircle, CheckSquare, GraduationCap, X, PlayCircle, Calendar, Trash2, Edit, BookOpen, Eye, EyeOff } from 'lucide-react';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const CourseDetail = () => {
    const { id } = useParams();
    const { user } = useAuth();
    const [curso, setCurso] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('contenidos');
    const [showUnitModal, setShowUnitModal] = useState(false);
    const [newUnitTitle, setNewUnitTitle] = useState('');
    const [unitEditing, setUnitEditing] = useState(null);

    const isInstructor = ['profesor', 'admin', 'director', 'regente', 'secretario'].includes(user?.role?.toLowerCase());

    useEffect(() => {
        fetchCurso();
    }, [id]);

    const fetchCurso = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/cursos/${id}`);
            setCurso(res.data);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    const handleSaveUnit = async (e) => {
        e.preventDefault();
        try {
            if (unitEditing) {
                await api.put(`/unidades/${unitEditing.id}`, { titulo: newUnitTitle });
            } else {
                await api.post('/unidades', { titulo: newUnitTitle, CursoId: id, orden: (curso.Unidads?.length || 0) + 1 });
            }
            setNewUnitTitle('');
            setUnitEditing(null);
            setShowUnitModal(false);
            fetchCurso();
        } catch (e) { alert('Error guardando unidad'); }
    };

    const handleDelete = async (type, itemId) => {
        if (!confirm('¿Eliminar elemento?')) return;
        try {
            await api.delete(`/${type}/${itemId}`);
            fetchCurso();
        } catch (e) { alert('Error eliminando'); }
    };

    if (loading) return <div className="app-container p-5 text-center">Cargando aula virtual...</div>;
    if (!curso) return <div className="app-container p-5 text-center alert alert-warning">Curso no encontrado.</div>;

    return (
        <div className="app-container animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Header */}
            <div className="glass-card p-0 mb-4 overflow-hidden position-relative" style={{ minHeight: '200px', display: 'flex', alignItems: 'flex-end' }}>
                <img src={curso.imagen || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} className="position-absolute w-100 h-100 object-fit-cover z-index-neg-1" alt="Cover" style={{ filter: 'brightness(0.4)' }} />
                <div className="p-4 w-100">
                    <span className="badge bg-primary mb-2 uppercase">Curso Técnico</span>
                    <h1 className="text-white m-0 d-block">{curso.nombre}</h1>
                    <p className="text-light m-0 opacity-75">{curso.descripcion}</p>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="d-flex border-bottom border-secondary mb-4">
                <button
                    onClick={() => setActiveTab('contenidos')}
                    className={`btn px-4 py-2 ${activeTab === 'contenidos' ? 'btn-primary border-bottom border-4 border-white' : 'btn-link text-white text-decoration-none'}`}
                >
                    <BookOpen className="w-4 h-4 me-2" /> Contenidos
                </button>
                {isInstructor && (
                    <button
                        onClick={() => setActiveTab('alumnos')}
                        className={`btn px-4 py-2 ${activeTab === 'alumnos' ? 'btn-primary border-bottom border-4 border-white' : 'btn-link text-white text-decoration-none'}`}
                    >
                        <Users className="w-4 h-4 me-2" /> Alumnos
                    </button>
                )}
            </div>

            {/* Main Area */}
            <div className="row g-4">
                <div className="col-lg-8">
                    {activeTab === 'contenidos' && (
                        <div className="space-y-4">
                            {isInstructor && (
                                <button onClick={() => setShowUnitModal(true)} className="btn btn-outline-primary mb-3">
                                    <PlusCircle className="w-4 h-4 me-2" /> Nueva Unidad
                                </button>
                            )}

                            {curso.Unidads?.map(unidad => (
                                <div key={unidad.id} className="glass-card mb-4 p-0 overflow-hidden">
                                    <div className="p-3 bg-secondary bg-opacity-25 d-flex justify-content-between align-items-center">
                                        <h3 className="m-0 h5">{unidad.titulo}</h3>
                                        {isInstructor && (
                                            <div className="d-flex gap-2">
                                                <button onClick={() => { setUnitEditing(unidad); setNewUnitTitle(unidad.titulo); setShowUnitModal(true); }} className="btn btn-sm btn-outline-light ring-0 border-0"><Edit className="w-4 h-4" /></button>
                                                <button onClick={() => handleDelete('unidades', unidad.id)} className="btn btn-sm btn-outline-danger ring-0 border-0"><Trash2 className="w-4 h-4" /></button>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-3">
                                        {/* Material List Placeholder */}
                                        {unidad.Materials?.length === 0 && <p className="text-muted small m-0 fst-italic">Sin contenidos publicados.</p>}
                                        <div className="list-group list-group-flush bg-transparent">
                                            {unidad.Materials?.map(mat => (
                                                <div key={mat.id} className="list-group-item bg-transparent border-secondary d-flex align-items-center gap-3 hover-glow cursor-pointer">
                                                    <div className="p-2 bg-dark rounded">
                                                        {mat.tipo === 'video' ? <Video className="text-purple-400" /> : <LinkIcon className="text-cyan-400" />}
                                                    </div>
                                                    <div className="flex-grow-1">
                                                        <div className="text-white fw-bold">{mat.titulo}</div>
                                                        <div className="text-muted small">{mat.descripcion}</div>
                                                    </div>
                                                    <PlayCircle className="text-primary opacity-50" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {activeTab === 'alumnos' && (
                        <div className="glass-card">
                            <h3>Gestión de Estudiantes</h3>
                            <p className="text-muted">Módulo en desarrollo para EEST Nro 5.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar */}
                <div className="col-lg-4">
                    <div className="glass-card mb-4">
                        <h4 className="text-primary h5 mb-3">Información</h4>
                        <ul className="list-unstyled space-y-2 mb-0">
                            <li className="d-flex justify-content-between"><span>Modalidad:</span> <span className="text-white">{curso.modalidad}</span></li>
                            <li className="d-flex justify-content-between"><span>Duración:</span> <span className="text-white">{curso.duracion_horas} hs</span></li>
                            <li className="d-flex justify-content-between"><span>ID Curso:</span> <span className="text-white">#{id}</span></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Unit Modal Overlay */}
            {showUnitModal && (
                <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.8)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="glass-card" style={{ width: '400px' }}>
                        <h4 className="mb-3">{unitEditing ? 'Editar Unidad' : 'Nueva Unidad'}</h4>
                        <form onSubmit={handleSaveUnit}>
                            <input className="form-control mb-3" placeholder="Título de la unidad" value={newUnitTitle} onChange={e => setNewUnitTitle(e.target.value)} required autoFocus />
                            <div className="d-flex gap-2">
                                <button type="button" onClick={() => setShowUnitModal(false)} className="btn btn-secondary flex-grow-1">Cancelar</button>
                                <button className="btn btn-primary flex-grow-1">Guardar</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CourseDetail;

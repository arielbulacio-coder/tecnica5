import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus, Users } from 'lucide-react';
import CursoModal from '../../components/LMS/CursoModal';
import api from '../../api';
import { useAuth } from '../../context/AuthContext';

const Cursos = () => {
    const { user } = useAuth();
    const [cursos, setCursos] = useState([]);
    const [staff, setStaff] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cursoToEdit, setCursoToEdit] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchStaff();
        fetchCursos();
    }, [user]);

    const fetchStaff = async () => {
        try {
            const res = await api.get('/users');
            const map = {};
            res.data.forEach(u => { map[u.id] = u.name; });
            setStaff(map);
        } catch (e) {
            console.error("Error fetching staff:", e);
        }
    };

    const fetchCursos = async () => {
        setLoading(true);
        setError(null);
        try {
            const params = {};
            if (user?.EscuelaId) params.EscuelaId = user.EscuelaId;
            if (user?.role === 'profesor') params.profesorId = user.id;

            const res = await api.get('/cursos', { params });
            setCursos(res.data);
        } catch (e) {
            console.error(e);
            setError("No se pudieron cargar los cursos.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        if (!confirm('¿Seguro que desea eliminar este curso?')) return;
        try {
            await api.delete(`/cursos/${id}`);
            fetchCursos();
        } catch (e) {
            alert('Error al eliminar el curso');
        }
    };

    const handleEdit = (e, curso) => {
        e.stopPropagation();
        setCursoToEdit(curso);
        setIsModalOpen(true);
    };

    const handleCreate = () => {
        setCursoToEdit(null);
        setIsModalOpen(true);
    };

    const canCreate = ['director', 'admin', 'regente', 'secretario'].includes(user?.role?.toLowerCase());

    return (
        <div className="app-container animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-4 d-flex justify-content-between align-items-center">
                <div>
                    <h2 className="text-gradient display-6 fw-bold m-0">Oferta Académica</h2>
                    <p className="text-muted">EEST Nro 5 José C. Paz - Plataforma Educativa</p>
                </div>

                {canCreate && (
                    <button onClick={handleCreate} className="btn btn-primary d-flex align-items-center gap-2">
                        <Plus className="w-5 h-5" /> Nuevo Curso
                    </button>
                )}
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            {loading ? (
                <div className="row g-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="col-md-4">
                            <div className="glass-card" style={{ height: '250px', opacity: 0.5 }}>Cargando...</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row g-4">
                    {cursos.map(curso => (
                        <div key={curso.id} className="col-md-4" onClick={() => navigate(`/lms/curso/${curso.id}`)}>
                            <div className="glass-card hover-glow h-100 p-0 overflow-hidden cursor-pointer position-relative">
                                {canCreate && (
                                    <div className="position-absolute top-0 end-0 p-2 z-index-1 d-flex gap-2">
                                        <button onClick={(e) => handleEdit(e, curso)} className="btn btn-sm btn-dark opacity-75"><Edit className="w-4 h-4" /></button>
                                        <button onClick={(e) => handleDelete(e, curso.id)} className="btn btn-sm btn-danger opacity-75"><Trash2 className="w-4 h-4" /></button>
                                    </div>
                                )}
                                <div style={{ height: '160px' }}>
                                    <img src={curso.imagen || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"} className="w-100 h-100 object-fit-cover" alt={curso.nombre} />
                                </div>
                                <div className="p-3">
                                    <h4 className="text-white mb-2">{curso.nombre}</h4>
                                    <p className="text-secondary small line-clamp-3">{curso.descripcion}</p>
                                    <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
                                        <div className="small text-muted d-flex align-items-center gap-1">
                                            <Users className="w-3 h-3" /> {staff[curso.profesorId] || 'Docente'}
                                        </div>
                                        <span className="text-primary small">Entrar →</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <CursoModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchCursos}
                user={user}
                initialData={cursoToEdit}
            />
        </div>
    );
};

export default Cursos;

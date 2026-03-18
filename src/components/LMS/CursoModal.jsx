import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../../api';

const CursoModal = ({ isOpen, onClose, onSuccess, user, initialData }) => {
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        imagen: '',
        duracion_horas: '',
        modalidad: 'presencial',
        profesorId: ''
    });
    const [loading, setLoading] = useState(false);
    const [profesores, setProfesores] = useState([]);

    useEffect(() => {
        if (isOpen) {
            fetchProfesores();
            if (initialData) {
                setFormData({
                    nombre: initialData.nombre || '',
                    descripcion: initialData.descripcion || '',
                    imagen: initialData.imagen || '',
                    duracion_horas: initialData.duracion_horas || '',
                    modalidad: initialData.modalidad || 'presencial',
                    profesorId: initialData.profesorId || ''
                });
            } else {
                setFormData({
                    nombre: '',
                    descripcion: '',
                    imagen: '',
                    duracion_horas: '',
                    modalidad: 'presencial',
                    profesorId: ''
                });
            }
        }
    }, [isOpen, initialData]);

    const fetchProfesores = async () => {
        try {
            const res = await api.get('/users');
            const filtered = res.data.filter(u => !['alumno', 'padre'].includes(u.role?.toLowerCase()));
            setProfesores(filtered);
        } catch (e) {
            console.error(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const data = {
                ...formData,
                profesorId: formData.profesorId ? parseInt(formData.profesorId) : null,
                duracion_horas: parseInt(formData.duracion_horas) || 0,
                EscuelaId: user?.EscuelaId
            };

            if (initialData?.id) {
                await api.put(`/cursos/${initialData.id}`, data);
            } else {
                await api.post('/cursos', data);
            }
            onSuccess();
            onClose();
        } catch (error) {
            console.error(error);
            alert('Error al guardar el curso');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" style={{ background: 'rgba(0,0,0,0.8)', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <div className="glass-card" style={{ maxWidth: '600px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="m-0">{initialData ? 'Editar Curso' : 'Nuevo Curso'}</h2>
                    <button onClick={onClose} className="btn btn-sm btn-outline-light"><X className="w-5 h-5" /></button>
                </div>

                <form onSubmit={handleSubmit} className="row g-3">
                    <div className="col-12">
                        <label className="form-label text-primary small fw-bold">Nombre del Curso</label>
                        <input className="form-control" value={formData.nombre} onChange={e => setFormData({ ...formData, nombre: e.target.value })} required />
                    </div>
                    <div className="col-12">
                        <label className="form-label text-primary small fw-bold">Descripción</label>
                        <textarea className="form-control" rows="3" value={formData.descripcion} onChange={e => setFormData({ ...formData, descripcion: e.target.value })} required />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-primary small fw-bold">Duración (hs)</label>
                        <input type="number" className="form-control" value={formData.duracion_horas} onChange={e => setFormData({ ...formData, duracion_horas: e.target.value })} />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label text-primary small fw-bold">Modalidad</label>
                        <select className="form-select" value={formData.modalidad} onChange={e => setFormData({ ...formData, modalidad: e.target.value })}>
                            <option value="presencial">Presencial</option>
                            <option value="virtual">Virtual</option>
                            <option value="hibrida">Híbrida</option>
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="form-label text-primary small fw-bold">Profesor a Cargo</label>
                        <select className="form-select" value={formData.profesorId} onChange={e => setFormData({ ...formData, profesorId: e.target.value })}>
                            <option value="">Seleccionar...</option>
                            {profesores.map(p => <option key={p.id} value={p.id}>{p.name} ({p.role})</option>)}
                        </select>
                    </div>
                    <div className="col-12">
                        <label className="form-label text-primary small fw-bold">URL Imagen de Portada</label>
                        <input className="form-control" value={formData.imagen} onChange={e => setFormData({ ...formData, imagen: e.target.value })} placeholder="https://..." />
                    </div>
                    <div className="col-12 d-flex gap-2 mt-4">
                        <button type="button" onClick={onClose} className="btn btn-secondary flex-grow-1">Cancelar</button>
                        <button type="submit" disabled={loading} className="btn btn-primary flex-grow-1">{loading ? 'Guardando...' : 'Guardar'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CursoModal;

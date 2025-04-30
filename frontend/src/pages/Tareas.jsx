import React, { useState, useEffect } from 'react';
import "../styles/Tareas.css";

const API_URL = import.meta.env.VITE_API_URL + "/task";

const Tareas = () => {
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', fecha: '' });

    useEffect(() => {
        obtenerTareas();
    }, []);

    const obtenerTareas = async () => {
        try {
            const id = localStorage.getItem('id');
            const url = `${API_URL}/user/${id}`;

            console.log("URL de la API:", url);

            const response = await fetch(url);

            const data = await response.json();

            if (data.payload == null) {
                console.log("No hay tareas disponibles.");
                return;
            }
            setTareas(data.payload);
        } catch (error) {
            console.error("Error al obtener las tareas:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNuevaTarea({ ...nuevaTarea, [name]: value });
    };

    const agregarTarea = async () => {
        if (nuevaTarea.titulo && nuevaTarea.descripcion) {
            try {
                // usuario_id, titulo, descripcion
                const id = localStorage.getItem('id');
                const response = await fetch(`${API_URL}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ usuario_id: id, titulo: nuevaTarea.titulo, descripcion: nuevaTarea.descripcion, completada: false }),
                });
                const data = await response.json();

                console.log("Tarea agregada:", data);

                setTareas([...tareas, data.payload.task]);
                setNuevaTarea({ titulo: '', descripcion: '', fecha: '' });
            } catch (error) {
                console.error("Error al agregar la tarea:", error);
            }
        }
    };

    const editarTarea = async (id, campo, valor) => {
        try {
            const tareaActualizada = tareas.find((tarea) => tarea.id === id);
            const actualizada = { ...tareaActualizada, [campo]: valor };
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actualizada),
            });
            setTareas(tareas.map((tarea) => (tarea.id === id ? actualizada : tarea)));
        } catch (error) {
            console.error("Error al editar la tarea:", error);
        }
    };

    const marcarCompletada = async (id) => {
        try {
            const tarea = tareas.find((tarea) => tarea.id === id);
            const actualizada = { ...tarea, completada: !tarea.completada };
            await fetch(`${API_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(actualizada),
            });
            setTareas(tareas.map((tarea) => (tarea.id === id ? actualizada : tarea)));
        } catch (error) {
            console.error("Error al marcar como completada:", error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            setTareas(tareas.filter((tarea) => tarea.id !== id));
        } catch (error) {
            console.error("Error al eliminar la tarea:", error);
        }
    };

    const formatearFecha = (fecha) => {
        const date = fecha ? new Date(fecha) : new Date();
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const anio = date.getFullYear();
        return `${dia}/${mes}/${anio}`;
    }; 

    return (
        <div className="tareas-container">
            <h1>Lista de Tareas</h1>
            <div className="tarea-form">
                <input
                    type="text"
                    name="titulo"
                    placeholder="Título de la tarea"
                    value={nuevaTarea.titulo}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="descripcion"
                    placeholder="Descripción de la tarea"
                    value={nuevaTarea.descripcion}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="fecha"
                    value={nuevaTarea.fecha}
                    onChange={handleInputChange}
                />
                <button onClick={agregarTarea}>Agregar Tarea</button>
            </div>
            <ul className="tareas-list">
                {tareas.map((tarea) => (                    
                    <li key={tarea.id} className={tarea.completada ? 'completed' : ''}>
                        <div className="tarea-text">
                            <h3>{tarea.titulo}</h3>
                            <p>{tarea.descripcion}</p>
                            <p>Fecha: {formatearFecha(tarea.fecha_creacion) }</p>
                        </div>
                        <div className="tarea-actions">
                            <button className="completar" onClick={() => marcarCompletada(tarea.id)}>
                                {tarea.completada ? 'Desmarcar' : 'Completar'}
                            </button>
                            <button onClick={() => eliminarTarea(tarea.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Tareas;
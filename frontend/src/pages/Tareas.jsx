import { useState, useEffect, useRef } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { es } from "date-fns/locale";
import "../styles/Tareas.css";

const locales = { es };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });

const API_URL = import.meta.env.VITE_API_URL + "/task";

const Tareas = () => {
    const [tareas, setTareas] = useState([
        { id: 1, titulo: "Tarea 1", descripcion: "Descripción de la tarea 1", fecha: "2025-04-01", completada: false },
        { id: 2, titulo: "Tarea 2", descripcion: "Descripción de la tarea 2", fecha: "2025-04-01", completada: false },
        { id: 3, titulo: "Tarea 3", descripcion: "Descripción de la tarea 3", fecha: "2025-04-02", completada: false },
        { id: 4, titulo: "Tarea 4", descripcion: "Descripción de la tarea 4", fecha: "2025-04-03", completada: false },
        { id: 5, titulo: "Tarea 5", descripcion: "Descripción de la tarea 5", fecha: "2025-04-04", completada: false },
        { id: 6, titulo: "Tarea 6", descripcion: "Descripción de la tarea 6", fecha: "2025-04-05", completada: false },
    ]);
    const [nuevaTarea, setNuevaTarea] = useState({ titulo: "", descripcion: "", fecha: "" });
    const [mostrarFormulario, setMostrarFormulario] = useState(false);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const formRef = useRef(null);

    useEffect(() => {
        obtenerTareas();
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleClickOutside = (event) => {
        if (formRef.current && !formRef.current.contains(event.target)) {
            setMostrarFormulario(false);
        }
    };

    const obtenerTareas = async () => {
        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`${API_URL}/user/${id}`);
            const data = await response.json();
            if (data.payload) setTareas(data.payload);
        } catch (error) {
            console.error("Error al obtener tareas:", error);
        }
    };

    const agregarTarea = async () => {
        if (nuevaTarea.titulo && nuevaTarea.descripcion) {
            try {
                const id = localStorage.getItem("id");
                const response = await fetch(`${API_URL}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        usuario_id: id,
                        titulo: nuevaTarea.titulo,
                        descripcion: nuevaTarea.descripcion,
                        completada: false,
                        fecha: nuevaTarea.fecha,
                    }),
                });
                const data = await response.json();
                setTareas([...tareas, data.payload.task]);
                setNuevaTarea({ titulo: "", descripcion: "", fecha: "" });
                setMostrarFormulario(false);
            } catch (error) {
                console.error("Error al agregar tarea:", error);
            }
        }
    };

    const editarTarea = async (id, campo, valor) => {
        try {
            const tareaActualizada = tareas.find((t) => t.id === id);
            const actualizada = { ...tareaActualizada, [campo]: valor };
            await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(actualizada),
            });
            setTareas(tareas.map((t) => (t.id === id ? actualizada : t)));
        } catch (error) {
            console.error("Error al editar tarea:", error);
        }
    };

    const eliminarTarea = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: "DELETE" });
            setTareas(tareas.filter((t) => t.id !== id));
        } catch (error) {
            console.error("Error al eliminar tarea:", error);
        }
    };

    const marcarCompletada = async (id) => {
        const tarea = tareas.find((t) => t.id === id);
        const actualizada = { ...tarea, completada: !tarea.completada };
        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(actualizada),
        });
        setTareas(tareas.map((t) => (t.id === id ? actualizada : t)));
    };

    const fechaConHoraLocal = (fechaISO) => {
        const [a, m, d] = fechaISO.split("-");
        return new Date(Number(a), Number(m) - 1, Number(d), 12);
    };

    const eventos = tareas.map((t) => {
        const fecha = t.fecha || t.fecha_creacion;
        const fechaEvento = fechaConHoraLocal(fecha);
        return {
            id: t.id,
            title: t.titulo,
            descripcion: t.descripcion,
            start: fechaEvento,
            end: fechaEvento,
            allDay: true,
        };
    });

    const formatearFecha = (fecha) => {
        const date = fecha ? new Date(fecha + "T00:00:00") : new Date();
        return `${String(date.getUTCDate()).padStart(2, '0')}/${String(date.getUTCMonth() + 1).padStart(2, '0')}/${date.getUTCFullYear()}`;
    };

    const handleSelectSlot = (slotInfo) => {
        const fechaISO = slotInfo.start.toISOString().split("T")[0];
        setNuevaTarea({ ...nuevaTarea, fecha: fechaISO });
        setMostrarFormulario(true);
    };

    const handleSelectEvent = (evento) => {
        const tarea = tareas.find((t) => t.id === evento.id);
        setTareaSeleccionada(tarea);
    };

    const cerrarModal = () => setTareaSeleccionada(null);

    const enviarSES = async (to, subject, body) => {
        try {
            const response = await fetch(`${API_URL}/aws/send-email/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ to, subject, body }),
            });
            if (!response.ok) {
                throw new Error("Error al enviar el correo");
            }
            const data = await response.json();
            console.log("Correo enviado exitosamente:", data);
        } catch (error) {
            console.error("Error al enviar el correo:", error);
        }
    };

    return (
        <div className="tareas-container">
            <h2>Calendario de Tareas</h2>

            <Calendar
                localizer={localizer}
                events={eventos}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                selectable
                onSelectSlot={handleSelectSlot}
                onSelectEvent={handleSelectEvent}
                tooltipAccessor={(event) => event.descripcion}
                eventPropGetter={(event) => {
                    const tarea = tareas.find(t => t.id === event.id);
                    return {
                        style: {
                            backgroundColor: tarea?.completada ? "#2d6a4f" : "#ff9f43",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                        },
                    };
                }}
            />

            {mostrarFormulario && (
                <form className="tarea-form" ref={formRef} onSubmit={(e) => { e.preventDefault(); agregarTarea(); }}>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={nuevaTarea.titulo}
                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, titulo: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        name="descripcion"
                        placeholder="Descripción"
                        value={nuevaTarea.descripcion}
                        onChange={(e) => setNuevaTarea({ ...nuevaTarea, descripcion: e.target.value })}
                        required
                    />
                    <p><strong>Fecha seleccionada:</strong> {nuevaTarea.fecha}</p>
                    <button onClick={enviarSES} type="submit">Agregar Tarea</button>
                </form>
            )}

            {tareaSeleccionada && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>{tareaSeleccionada.titulo}</h3>
                        <p><strong>Descripción:</strong> {tareaSeleccionada.descripcion}</p>
                        <p><strong>Fecha:</strong> {formatearFecha(tareaSeleccionada.fecha || tareaSeleccionada.fecha_creacion)}</p>
                        <p><strong>Estado:</strong> {tareaSeleccionada.completada ? "Completada" : "Pendiente"}</p>

                        <div className="tarea-actions">
                            <button className="completar" onClick={() => { marcarCompletada(tareaSeleccionada.id); cerrarModal(); }}>
                                {tareaSeleccionada.completada ? "Desmarcar" : "Completar"}
                            </button>
                            <button onClick={() => { if (confirm("¿Seguro que deseas eliminar esta tarea?")) { eliminarTarea(tareaSeleccionada.id); cerrarModal(); } }}>Eliminar</button>
                            <button className="editar" onClick={() => { const nuevo = prompt("Nuevo título:", tareaSeleccionada.titulo); if (nuevo) editarTarea(tareaSeleccionada.id, "titulo", nuevo); cerrarModal(); }}>Editar Título</button>
                            <button className="editar" onClick={() => { const nuevo = prompt("Nueva descripción:", tareaSeleccionada.descripcion); if (nuevo) editarTarea(tareaSeleccionada.id, "descripcion", nuevo); cerrarModal(); }}>Editar Descripción</button>
                            <button className="editar" onClick={() => { const nuevaFecha = prompt("Nueva fecha (YYYY-MM-DD):", tareaSeleccionada.fecha); if (nuevaFecha) editarTarea(tareaSeleccionada.id, "fecha", nuevaFecha); cerrarModal(); }}>Editar Fecha</button>
                            <br />
                            <button onClick={cerrarModal}>Cerrar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tareas;

import { useState } from "react";
import "../styles/Traductor.css";
const API_URL = import.meta.env.VITE_API_URL;

const Traductor = () => {
  const [archivo, setArchivo] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [textoOriginal, setTextoOriginal] = useState("");
  const [textoTraducido, setTextoTraducido] = useState("");
  const [audioDisponible, setAudioDisponible] = useState(false);
  const [cargando, setCargando] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type === "application/pdf") {
      setArchivo(file);
      setMensaje("");
    } else {
      setArchivo(null);
      setMensaje("Solo se permiten archivos PDF.");
    }
  };

  const traducirYLeer = async () => {
    if (!archivo) {
      setMensaje("Selecciona un archivo PDF primero.");
      return;
    }

    setCargando(true);
    setTextoOriginal("");
    setTextoTraducido("");
    setAudioDisponible(false);

    const formData = new FormData();
    formData.append("documento", archivo);

    try {
      const response = await fetch(`${API_URL}/traducir`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      setTextoOriginal(data.texto_original);
      setTextoTraducido(data.texto_traducido);
      setAudioDisponible(true);
    } catch (error) {
      console.error("Error al traducir:", error);
      setMensaje("Ocurrió un error al procesar el archivo.");
    }

    setCargando(false);
  };

  return (
    <div className="traductor-container">
      <h2>Traducir y Escuchar Documentos</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={traducirYLeer} disabled={cargando}>
        {cargando ? "Procesando..." : "Traducir y Leer"}
      </button>

      {mensaje && <p className="error-message">{mensaje}</p>}

      {textoOriginal && (
        <>
          <h3>Texto Original (Español)</h3>
          <p className="texto">{textoOriginal}</p>
        </>
      )}

      {textoTraducido && (
        <>
          <h3>Texto Traducido (Inglés)</h3>
          <p className="texto">{textoTraducido}</p>
        </>
      )}

      {audioDisponible && (
        <>
          <h3>Reproducir Audio</h3>
          <audio controls src={`${API_URL}/audio`} />
        </>
      )}
    </div>
  );
};

export default Traductor;

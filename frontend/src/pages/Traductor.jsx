import { useState } from "react";
import "../styles/Traductor.css";
const API_URL = import.meta.env.VITE_API_URL;

const Traductor = () => {
  const [texto, setTexto] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [textoTraducido, setTextoTraducido] = useState("");
  const [audioDisponible, setAudioDisponible] = useState(false);
  const [cargando, setCargando] = useState(false);

  const traducirYLeer = async () => {
    if (!texto.trim()) {
      setMensaje("Escribe un texto para traducir.");
      return;
    }

    setCargando(true);
    setTextoTraducido("");
    setAudioDisponible(false);
    setMensaje("");

    try {
      const response = await fetch(`${API_URL}/traducir`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ texto }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();
      setTextoTraducido(data.texto_traducido);
      setAudioDisponible(true);
    } catch (error) {
      console.error("Error al traducir:", error);
      setMensaje("Ocurrió un error al procesar el texto.");
    }

    setCargando(false);
  };

  return (
    <div className="traductor-container">
      <h2>Traducir y Escuchar Texto</h2>
      <textarea className="textarea"
        cols="105"
        rows="5"
        placeholder="Escribe el texto aquí..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      <button onClick={traducirYLeer} disabled={cargando}>
        {cargando ? "Procesando..." : "Traducir y Leer"}
      </button>

      {mensaje && <p className="error-message">{mensaje}</p>}

      {textoTraducido && (
        <>
          <h3>Texto Traducido (Inglés)</h3>
          <p className="texto">{textoTraducido}</p>
        </>
      )}

      {audioDisponible && (
        <>
          <h3>Reproducir Texto en Audio</h3>
          <audio controls src={`${API_URL}/audio`} />
        </>
      )}
    </div>
  );
};

export default Traductor;

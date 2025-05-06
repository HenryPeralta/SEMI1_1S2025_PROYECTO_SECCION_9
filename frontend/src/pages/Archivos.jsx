import { useState, useEffect } from "react";
import "../styles/Archivos.css";
import { jwtDecode } from "jwt-decode";
const API_URL = import.meta.env.VITE_API_URL;

const Archivos = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewFile, setPreviewFile] = useState(null);
  const [profilePic, setProfilePic] = useState("");
  const [message, setMessage] = useState("");
  const [id, setId] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const userData = jwtDecode(token);
        setId(userData.id);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
        setMessage("Token inválido o expirado.");
      }
    } else {
      setMessage("No se ha encontrado el token.");
    }
  }, []);

  useEffect(() => {
    if (id) {
      fetch(`${API_URL}/file/all/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setFiles(data.payload);
        })
        .catch((error) => {
          console.error("Error al obtener los archivos:", error);
          setMessage("No se pudo cargar los archivos.");
        });
    }
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result !== null) {
        const base64String = reader.result.toString().split(",")[1];
        setProfilePic(base64String);

        const newFile = {
          name: file.name,
          type: file.type,
        };

        setSelectedFile(newFile);
        setMessage("");
      }
    };

    reader.readAsDataURL(file);
  };

  const handleUploadToAPI = async () => {
    if (!selectedFile) {
      setMessage("¡Selecciona un archivo antes de cargar!");
      return;
    }

    const mimeType = selectedFile.type;
    const fileName = selectedFile.name;

    if (
      mimeType !== "text/plain" &&
      mimeType !== "application/pdf" &&
      !mimeType.startsWith("image/")
    ) {
      setMessage("Tipo de archivo incorrecto. Solo texto, PDF o imágenes.");
      return;
    }

    const fileContentBase64 = profilePic;

    if (mimeType === "text/plain" || mimeType === "application/pdf") {
      try {
        const response = await fetch("https://3sqpcxdhn2.execute-api.us-east-1.amazonaws.com/cargar_archivo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName,
            mimeType,
            fileContent: fileContentBase64,
          }),
        });

        const data = await response.json();
        if (data.url) {
          const saveResponse = await fetch(`${API_URL}/file/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              usuario_id: id,
              nombre_archivo: fileName,
              tipo_archivo: mimeType,
              url_archivo: data.url,
            }),
          });

          const saveData = await saveResponse.json();
          if (saveData.stringCode === "FILE_CREATED") {
            alert("Archivo subido correctamente");
            if (id) {
              fetch(`${API_URL}/file/all/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  setFiles(data.payload);
                })
                .catch((error) => {
                  console.error("Error al obtener los archivos:", error);
                  setMessage("No se pudo cargar los archivos.");
                });
            }
          }
        }
      } catch (error) {
        console.error("Error subiendo el archivo:", error);
      }
    } else if (mimeType.startsWith("image/")) {
      try {
        const response = await fetch("https://ijws8hewm2.execute-api.us-east-1.amazonaws.com/cargar_imagen", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName,
            mimeType,
            fileContent: fileContentBase64,
          }),
        });

        const data = await response.json();
        if (data.url) {
          const saveResponse = await fetch(`${API_URL}/file/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              usuario_id: id,
              nombre_archivo: fileName,
              tipo_archivo: mimeType,
              url_archivo: data.url,
            }),
          });

          const saveData = await saveResponse.json();
          if (saveData.stringCode === "FILE_CREATED") {
            alert("Imagen subida correctamente");
            if (id) {
              fetch(`${API_URL}/file/all/${id}`, {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              })
                .then((res) => res.json())
                .then((data) => {
                  setFiles(data.payload);
                })
                .catch((error) => {
                  console.error("Error al obtener los archivos:", error);
                  setMessage("No se pudo cargar los archivos.");
                });
            }
          }
        }
      } catch (error) {
        console.error("Error subiendo la imagen:", error);
      }
    }
  };

  return (
    <div className="archivos-container">
      <h1>Gestor de Archivos</h1>

      <section className="archivo-subida">
        <h2>Subir nuevo archivo</h2>
        <div className="archivo-form">
          <input type="file" onChange={handleFileChange} />
          <button className="cargar-btn" onClick={handleUploadToAPI}>
            Cargar Archivo
          </button>
        </div>
        {message && <p className="error-message">{message}</p>}
      </section>

      <section className="archivo-vista">
        <h2>Mis archivos</h2>
        <div className="archivos-grid">
          {files.map((file) => (
            <div
              key={file.id}
              className="archivo-item"
              onClick={() => setPreviewFile(file)}
            >
              <p>{file.nombre_archivo}</p>
              {file.tipo_archivo.startsWith("image/") ? (
                <img
                  src={file.url_archivo}
                  alt={file.nombre_archivo}
                  className="archivo-thumbnail"
                />
              ) : file.tipo_archivo.includes("pdf") ? (
                <div className="archivo-placeholder">📄 PDF</div>
              ) : file.tipo_archivo === "text/plain" ? (
                <div className="archivo-placeholder">📝 TXT</div>
              ) : (
                <div className="archivo-placeholder">📁 Archivo</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {previewFile && (
        <div className="modal-overlay" onClick={() => setPreviewFile(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setPreviewFile(null)}>✖</button>
            <h3>{previewFile.nombre_archivo}</h3>
            {previewFile.tipo_archivo.startsWith("image/") ? (
              <img
                src={previewFile.url_archivo}
                alt={previewFile.nombre_archivo}
                className="archivo-imagen"
              />
            ) : previewFile.tipo_archivo === "text/plain" ? (
              <iframe src={previewFile.url_archivo} className="archivo-texto" />
            ) : previewFile.tipo_archivo.includes("pdf") ? (
              <iframe src={previewFile.url_archivo} className="archivo-pdf" />
            ) : (
              <p>No se puede previsualizar este tipo de archivo</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Archivos;

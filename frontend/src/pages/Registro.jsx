import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Registro.css";
const API_URL = import.meta.env.VITE_API_URL;

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePic, setProfilePic] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
    
        const reader = new FileReader();
    
        reader.onload = () => {
            if (reader.result !== null) {
                const base64String = reader.result.toString().split(',')[1];
                setProfilePic(base64String);
            }
        };
    
        reader.readAsDataURL(file);
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Las contraseñas no coinciden.");
            return;
        }

        const formDataToSend = {
            nombre_usuario: nombre,
            correo: email,
            contrasena: password,
            confirmar_contrasena: confirmPassword,
            imagen_perfil_url: "imagenPrueba",
        }

        try {
            const response = await fetch(`${API_URL}/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formDataToSend)
            });

            const data = await response.json();

            if (response.ok) {
                navigate("/");
            } else {
                setError(data.message || "Error en el registro");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="registro-container">
            <h2>Registro</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre de usuario:</label>
                <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />

                <label>Correo Electrónico:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <label>Confirmar Contraseña:</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <label>Foto de Perfil:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} />

                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? <a href="/">Inicia sesión aquí</a>
            </p>
        </div>
    );
};

export default Registro;

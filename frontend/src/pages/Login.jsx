import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch(`${API_URL}/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nombre_usuario: username, contrasena: password }),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.payload.token);
                localStorage.setItem("id", data.payload.id);

                console.log(data.payload);

                if (data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/dashboard");
                }
            } else {
                setError(data.message || "Credenciales incorrectas");
            }
        } catch (error) {
            setError("Error de conexión con el servidor");
        }
    };

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre de usuario:</label>
                <input
                    type="test"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <label>Contraseña:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button type="submit">Iniciar Sesión</button>
            </form>
            <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </div>
    );
};

export default Login;

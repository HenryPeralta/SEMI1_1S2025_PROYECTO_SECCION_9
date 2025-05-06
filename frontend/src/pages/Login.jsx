import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Webcam from "react-webcam";
import "../styles/Login.css";
const API_URL = import.meta.env.VITE_API_URL;

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showFaceLogin, setShowFaceLogin] = useState(false);
    const [captured, setCaptured] = useState(null);
    const [loading, setLoading] = useState(false);
    const webcamRef = useRef(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

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
        } finally {
            setLoading(false);
        }
    };

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        setCaptured(imageSrc);
    };

    const handleFaceLogin = async () => {
        setError("");
        if (!captured) {
            setError("Captura una imagen primero");
            return;
        }
        setLoading(true);
    
        try {
            const response = await fetch("https://y8xug60fd5.execute-api.us-east-1.amazonaws.com/face_id", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageBase64: captured
                }),
            });
    
            const data = await response.json();
    
            if (data.url) {
                const usersResponse = await fetch(`${API_URL}/user/all`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                });
                const usersData = await usersResponse.json();
    
                const matchedUser = usersData.payload.find(user => user.imagen_perfil_url === data.url);
    
                if (matchedUser) {

                    const response = await fetch(`${API_URL}/auth/loginFaceId`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nombre_usuario: matchedUser.nombre_usuario }),
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
                } else {
                    setError("No se encontró un usuario que coincida con la imagen.");
                }
            } else {
                setError(data.message || "No se pudo verificar la identidad");
            }
        } catch (error) {
            console.error(error);
            setError("Error de conexión con el servidor");
        } finally {
            setLoading(false);
            setCaptured(null);
            setShowFaceLogin(false);
        }
    };    

    return (
        <div className="login-container">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleSubmit}>
                <label>Nombre de usuario:</label>
                <input
                    type="text"
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

                <button type="submit" disabled={loading}>
                    {loading ? "Iniciando..." : "Iniciar Sesión"}
                </button>
            </form>

            <div className="face-login">
                {!showFaceLogin ? (
                    <button className="buttonID" onClick={() => setShowFaceLogin(true)}>Iniciar sesión con Face ID</button>
                ) : (
                    <div className="webcam-section">
                        {!captured ? (
                            <>
                                <Webcam
                                    audio={false}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    className="webcam"
                                />
                                <button onClick={capture}>Capturar rostro</button>
                            </>
                        ) : (
                            <>
                                <img src={captured} alt="Captura previa" className="preview" />
                                <button onClick={handleFaceLogin} disabled={loading}>
                                    {loading ? "Verificando..." : "Enviar para login"}
                                </button>
                                <button onClick={() => setCaptured(null)}>Reintentar</button>
                            </>
                        )}
                        <button onClick={() => { setShowFaceLogin(false); setCaptured(null); }}>
                            Cancelar
                        </button>
                    </div>
                )}
            </div>

            <p>¿No tienes cuenta? <a href="/registro">Regístrate aquí</a></p>
        </div>
    );
};

export default Login;

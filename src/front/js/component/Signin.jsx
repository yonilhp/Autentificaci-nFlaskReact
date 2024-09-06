import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Context } from "../store/appContext"; // Importa el contexto de Flux

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);  // Accede al contexto
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Llamar a la acción login
        const success = await actions.login(email, password);

        // Verifica si el login fue exitoso
        if (success) {
            // Verifica si el token está en el localStorage
            // console.log('Token almacenado en localStorage:', localStorage.getItem('token'));

            navigate("/dashboard"); // Redirige al Dashboard después del login
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-secondary p-5 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 text-white">Login</h2>
                {store.loginError && <Alert variant="danger">{store.loginError}</Alert>} {/* Muestra el error de login si ocurre */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Iniciar sesión
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Button variant="link" className="text-white" onClick={() => navigate("/forgot-password")}>
                        Olvidé mi contraseña
                    </Button>
                </div>

                <div className="text-center mt-3">
                    <span className="text-white">Eres nuevo? </span>
                    <Button variant="link" className="text-white font-weight-bold" onClick={() => navigate("/signup")}>
                        Registrate aquí
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Signin;

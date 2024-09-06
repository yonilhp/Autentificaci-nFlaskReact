import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { Context } from "../store/appContext.js"; // Asegúrate de importar el contexto adecuado

const Signup = () => {
    const { store, actions } = useContext(Context); // Acceder a store y actions desde Flux
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let estado= await actions.signup(firstName, lastName, email, password, confirmPassword);
        if(estado){
            await new Promise((resolve) => setTimeout(resolve, 3000));
            actions.cleanBanner()
            navigate("/signin");
        }else{

        }
    };

    const handleLoginRedirect = () => {
        navigate("/signin");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-secondary p-5 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 text-white">Registro de usuarios</h2>
                {store.signupError && <Alert variant="danger">{store.signupError}</Alert>}
                {store.signupSuccess && <Alert variant="success">{store.signupSuccess}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>Nombres</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Apellidos</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>

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
                            autocomplete="new-password"
                        />
                    </Form.Group>

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            autocomplete="new-password"
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100" >
                        Registrar
                    </Button>
                </Form>
                <div className="text-center mt-3">
                    <Button variant="link" onClick={handleLoginRedirect} className="text-white">
                        ¿Ya tienes cuenta? <strong>Iniciar sesión</strong>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Signup;

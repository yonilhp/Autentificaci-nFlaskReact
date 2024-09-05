import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const Signin = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(process.env.BACKEND_URL + "/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        if (response.ok) {
            navigate("/dashboard"); // O la página a la que desees redirigir después del inicio de sesión
        } else {
            const data = await response.json();
            setError(data.error || "An error occurred during login");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-secondary p-5 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 text-white">Login</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100">
                        Login
                    </Button>
                </Form>

                <div className="text-center mt-3">
                    <Button variant="link" className="text-white" onClick={() => navigate("/forgot-password")}>
                        Forgot your password?
                    </Button>
                </div>

                <div className="text-center mt-3">
                    <span className="text-white">New here? </span>
                    <Button variant="link" className="text-white font-weight-bold" onClick={() => navigate("/signup")}>
                        Sign Up
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Signin;

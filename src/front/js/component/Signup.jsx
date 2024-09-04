import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password,
                confirm_password: confirmPassword,
            }),
        });

        if (response.ok) {
            navigate("/login");
        } else {
            const data = await response.json();
            setError(data.error || "An error occurred during registration");
        }
    };

    const handleLoginRedirect = () => {
        navigate("/login");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
            <div className="bg-secondary p-5 rounded shadow" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center mb-4 text-white">Register</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </Form.Group>

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

                    <Form.Group controlId="confirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="mt-3 w-100">
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

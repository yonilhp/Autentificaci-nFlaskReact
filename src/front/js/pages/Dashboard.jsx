import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token del localStorage
        localStorage.removeItem('token');
        // Redirige al usuario al inicio de sesión
        navigate("/signin");
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
            <h1>Bienvenido al Dashboard</h1>
            <Button variant="primary" onClick={handleLogout}>Cerrar sesión</Button>
        </div>
    );
};

export default Dashboard;

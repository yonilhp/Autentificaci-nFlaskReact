import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Alert } from "react-bootstrap";
import { Context } from "../store/appContext";

const Dashboard = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getUsers();
    }, [actions]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate("/signin");
    };


    return (
        <div className="d-flex flex-column align-items-center vh-100 bg-light">
            <div className="text-center mt-4">

                <Button variant="primary" onClick={handleLogout} className="mt-2">Cerrar sesión</Button>
                <h1>Bienvenido al Dashboard</h1>
                
            </div>

            {store.usersError && <Alert variant="danger" className="mt-3">{store.usersError}</Alert>}
            
            <div className="mt-4 w-75">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Apellido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {store.users.length > 0 ? (
                            store.users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.first_name}</td>
                                    <td>{user.last_name}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="2" className="text-center">No hay usuarios registrados</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default Dashboard;

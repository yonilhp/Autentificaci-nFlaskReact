import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Table, Alert } from "react-bootstrap";
import { Context } from "../store/appContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

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
        <div className="d-flex flex-column align-items-center vh-100 bg-light position-relative">
            <Button 
                variant="danger" 
                onClick={handleLogout} 
                className="position-absolute top-0 end-0 m-3"
                style={{
                    width: '50px',
                    height: '50px',
                    padding: '0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#ff4d4d', // Color rojo
                    border: 'none'
                }}
            >
                <FontAwesomeIcon icon={faSignOutAlt} color="white" />
            </Button>
            <div className="text-center mt-4">
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

import React from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import Signup from "./component/Signup.jsx";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";
import Signin from "./component/Signin.jsx";
import Dashboard from "./pages/Dashboard.jsx"; // Importa el componente PrivateRoute
import PrivateRoute from "./component/PrivateRoute.jsx"; // Importa el componente PrivateRoute

// Definir la lógica de autenticación (esto es solo un ejemplo)
const useAuth = () => {
    // Aquí deberías poner la lógica real para comprobar si el usuario está autenticado.
    const token = localStorage.getItem('token');
    return !!token; // Devuelve true si hay un token, false si no.
};

const Layout = () => {
    const basename = process.env.BASENAME || "";
    const isAuthenticated = useAuth(); // Llama a la función para verificar la autenticación.

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL === "") return <BackendURL />;

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Routes>
                        <Route path="/" element={<Navigate to="/signin" />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route
                            path="/dashboard"
                            element={
                                <PrivateRoute isAuthenticated={isAuthenticated}>
                                    <Dashboard />
                                </PrivateRoute>
                            }
                        />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/demo" element={<Demo />} />
                        <Route path="/single/:theid" element={<Single />} />
                        <Route path="*" element={<h1>Not found!</h1>} />
                    </Routes>
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
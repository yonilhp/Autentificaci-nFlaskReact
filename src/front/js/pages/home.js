import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate("/signin");
    }, [navigate]);

    return null; // No renderiza nada ya que redirige inmediatamente
};

export default Home;

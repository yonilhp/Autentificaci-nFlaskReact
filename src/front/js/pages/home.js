import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Signup from '../component/Signup.jsx';
import "../../styles/home.css";
import Login from "../component/Login.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			
			<Login/>
		</div>
	);
};

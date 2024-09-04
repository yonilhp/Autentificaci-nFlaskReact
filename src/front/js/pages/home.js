import React, { useContext } from "react";
import { Context } from "../store/appContext";
import Signup from '../component/Signup.jsx';
import "../../styles/home.css";
import Signin from "../component/Signin.jsx";

export const Home = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className="text-center mt-5">
			
			<Signin/>
		</div>
	);
};

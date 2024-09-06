const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            user: null, // Estado para almacenar los datos del usuario
            signupError: null,
            signupSuccess: null,
            users: [],
            usersError: null,
            loginError: null,  // Almacena el error en caso de que el login falle
        },
        actions: {
            // Acción para registrar un nuevo usuario
            cleanBanner:()=>{
                let store=getStore()
                setStore({...store,signupError: null,signupSuccess: null})
            },

            login: async (email, password) => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signin", {
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
                        const data = await response.json();
                        // Almacena el token JWT en localStorage o en el store
                        localStorage.setItem('token', data.token);
                        setStore({ user: data.token, loginError: null });
                        return true;  // Éxito
                    } else {
                        const data = await response.json();
                        setStore({ loginError: data.error || "Error al iniciar sesión" });
                        return false;  // Error en login
                    }
                } catch (error) {
                    setStore({ loginError: "Error en la conexión con el servidor" });
                    return false;  // Error en conexión
                }
            },

            signup: async (firstName, lastName, email, password, confirmPassword) => {
                const store = getStore();

                // Reseteamos posibles errores y mensajes de éxito previos
                setStore({
                    signupError: null,
                    signupSuccess: null
                });

                if (password !== confirmPassword) {
                    setStore({ signupError: "Las contraseñas no coinciden" });
                    return;
                }

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/signup", {
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

                    if (!response.ok) {
                        const data = await response.json();
                        setStore({ ...getStore(), signupError: data.error || "Error al registrarse" });
                        return false;
                    }

                    setStore({  ...getStore(), signupSuccess: "Usuario registrado exitosamente" });
                    return true;
                } catch (error) {
                    setStore({  ...getStore(), signupError: "Error en la conexión con el servidor" });
                    return false;
                }
            },
            getUsers: async () => {
                const store = getStore();

                try {
                    const response = await fetch(process.env.BACKEND_URL + "/api/users");
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ users: data });
                    } else {
                        const data = await response.json();
                        setStore({ usersError: data.error || "Error al obtener usuarios" });
                    }
                } catch (error) {
                    setStore({ usersError: "Error en la conexión con el servidor" });
                }
            },

            // Acción para obtener un mensaje
            getMessage: async () => {
                try {
                    const response = await fetch(process.env.BACKEND_URL + "/message");
                    if (response.ok) {
                        const data = await response.json();
                        setStore({ message: data.message });
                    } else {
                        setStore({ message: "Error obteniendo el mensaje" });
                    }
                } catch (error) {
                    setStore({ message: "Error de conexión con el servidor" });
                }
            },
        }
    };
};

export default getState;

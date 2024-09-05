const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            message: null,
            user: null, // Estado para almacenar los datos del usuario
            signupError: null,
            signupSuccess: null,
            users: [],
            usersError: null,
        },
        actions: {
            // Acción para registrar un nuevo usuario
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
                        setStore({ signupError: data.error || "Error al registrarse" });
                        return;
                    }

                    setStore({ signupSuccess: "Usuario registrado exitosamente" });
                } catch (error) {
                    setStore({ signupError: "Error en la conexión con el servidor" });
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

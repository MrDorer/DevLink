import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoM from "../Assets/LogoM.png";
import { useNavigate } from "react-router-dom";

function Register() {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [registrationError, setRegistrationError] = useState(null); // Estado para el mensaje de error
    const navigate = useNavigate(); // Usa useNavigate para acceder a la navegación

    // eslint-disable-next-line
    const handleRegister = async (e) => {
        // ... código de manejo de registro
        e.preventDefault(); // Evitar que el formulario se envíe automáticamente

        // Validaciones de nombre, usuario, email y contraseña
        if (name.trim() === "") {
            setRegistrationError("Por favor, ingresa tu nombre.");
            return;
        }

        if (username.trim() === "") {
            setRegistrationError("Por favor, ingresa un nombre de usuario.");
            return;
        }

        if (!emailIsValid(email)) {
            setRegistrationError("Ingresa un Email válido");
            return;
        }

        if (!passwordIsValid(password)) {
            setRegistrationError("Ingresa una contraseña válida (al menos 6 caracteres)");
            return;
        }

        // Crear un objeto con los datos del usuario
        const userData = {
            name,
            username,
            email,
            password,
        };

        try {
            const response = await fetch("http://localhost:8082/Register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });
    
            if (response.status === 200) {
                alert("Usuario registrado con éxito");
                navigate("/Login");
            } else {
                const errorText = await response.text();
                setRegistrationError(errorText);
            }
        } catch (error) {
            console.error("Error al registrar el usuario:", error);
            setRegistrationError("Error al registrar el usuario");
        }
    };

    const emailIsValid = (email) => {
        // Esta es una validación simple de email, puedes agregar una validación más robusta si es necesario
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };

    const passwordIsValid = (password) => {
        // Puedes agregar tus propias reglas de validación de contraseña aquí
        return password.length >= 6; // Ejemplo: al menos 6 caracteres
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-28 w-auto"
                        src={LogoM}
                        alt="DevLink"
                    />
                    <h1 className="text-center text-3xl font-serif">DevLink</h1>
                    <h2 className="mt-4 text-center text-2xl font-semibold leading-9 tracking-tight text-gray-900">
                        Sign up for DevLink
                    </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleRegister}>
                        {/* Alerta para errores de registro */}
                        {registrationError && (
                            <p className="mt-2 text-center text-red-600">{registrationError}</p>
                        )}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    autoComplete="username"
                                    required
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit" // Cambia el tipo de botón a "submit" para que el formulario se envíe como POST
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Sign up
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Do you already have an account?{" "}
                        <Link to="/Login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign in here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Register;

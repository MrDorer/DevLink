import React, { useState } from "react";
import { Link } from "react-router-dom";
import LogoM from "../Assets/LogoM.png";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState(null);

    const navigate = useNavigate(); // Usa useNavigate para acceder a la navegación
//gabo

    const handleLogin = async (e) => {
        e.preventDefault();

        // Validaciones de email y contraseña
        if (!emailIsValid(email)) {
            setLoginError("Ingresa un Email válido");
            return;
        }

        if (!passwordIsValid(password)) {
            setLoginError("Ingresa una contraseña válida");
            return;
        }

        try {
            const response = await fetch("http://localhost:8082/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.status === 200) {
                // Inicio de sesión exitoso
                alert("Inicio de sesión exitoso");
                // Redirige al usuario a la página principal
                navigate("/");
            } else {
                // Credenciales inválidas
                setLoginError("Credenciales inválidas");
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            setLoginError("Error al iniciar sesión");
        }
    }

    const emailIsValid = (email) => {
        // Esta es una validación simple de email, puedes agregar una validación más robusta si es necesario
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zAZ0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    }

    const passwordIsValid = (password) => {
        // Puedes agregar tus propias reglas de validación de contraseña aquí
        return password.length >= 6; // Ejemplo: al menos 6 caracteres
    }

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
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
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
                            <div className="flex items-center justify between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign in
                            </button>
                        </div>
                        {loginError && (
                            <p className="mt-2 text-center text-red-600">{loginError}</p>
                        )}
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        You do not have an account?{" "}
                        <Link to="/Register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}

export default Login;

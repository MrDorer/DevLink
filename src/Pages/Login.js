import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import LogoM from "../Assets/LogoM.png";
import Swal from 'sweetalert2';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay información del usuario almacenada en la sesión
    const storedUser = JSON.parse(sessionStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

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
      const response = await fetch("http://localhost:8082/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.status === 200) {
        // Inicio de sesión exitoso
        Swal.fire({
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: true,
          timer: 1200,
        });
        // Almacena la información del usuario en el estado y en sessionStorage
        setUser(data);
        sessionStorage.setItem('user', JSON.stringify(data));
        // Redirige al usuario a la página principal
        navigate("/home");
      } else {
        // Credenciales inválidas
        setLoginError("Credenciales inválidas");
      }
      console.log(response.data[0])
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      
      setLoginError("Error al iniciar sesión");
    }
  };

  const emailIsValid = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const passwordIsValid = (password) => {
    return password.trim().length >= 8;
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
            Inicia sesión en tu cuenta
          </h2>
        </div>

        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Cuenta de correo
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
                  Contraseña
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
                Iniciar sesión
              </button>
            </div>
            {loginError && (
              <p className="mt-2 text-center text-red-600">{loginError}</p>
            )}
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            ¿No tienes una cuenta?{" "}
            <Link to="/Register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
      {user && (
        <p className="mt-2 text-center text-green-600">{`Bienvenido, ${user.name}!`}</p>
      )}
    </>
  );
}


export default Login;

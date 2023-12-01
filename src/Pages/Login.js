import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Github from "../Assets/github.svg"
import LogoM from "../Assets/LogoM.png";
import Swal from 'sweetalert2';
import axios from 'axios'

const CLIENT_ID = 'eb65046c0d5c4f4b9c06'

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(null);

  const navigate = useNavigate();

  const [rerender, setRerender] = useState(false)
  const [itsAllGood, setItsAllGood] = useState(false)
  const [ghUser, setGhUser] = useState('')

  const [userId, setUserId] = useState('')

  async function getUserData(){
    console.log('Its been triggered')
    await fetch("http://localhost:8082/getUserData", {
        method: "GET",
        headers: {
            "Authorization" : "Bearer " + localStorage.getItem("accessToken") 
        }
    }).then((response) => {
        return response.json()
    }).then(async (data) => {
        console.log(data.login)
        setGhUser(data.login)
    })
    
}

function loginGH(){
    window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=ghUser:email")
  }

  useEffect(() => {
    
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam)

    if(sessionStorage.getItem("user")){
      console
      setUserId(JSON.parse(sessionStorage.getItem("user")).id)
    }

    if((localStorage.getItem("accessToken") !== null) && itsAllGood === false){
      localStorage.clear()
    }

    if(codeParam && (localStorage.getItem("accessToken") === null)){
         async function getAccessToken(){
            await fetch("http://localhost:8082/getAccessToken?code=" + codeParam, {
                method: "GET"
            }).then((response) => {
                return response.json()
            }).then((data) => {
                console.log(data)
                if(data.access_token){
                    localStorage.setItem("accessToken", data.access_token)
                    setRerender(!rerender)
                    setItsAllGood(true)
                    
                }
            })
         }
         getAccessToken()
    }
    if(itsAllGood === true){
        console.log("Everything is all right")
        getUserData()
    }
    if(ghUser.length > 0){
      console.log(sessionStorage.getItem("loggedIn"))

      if(sessionStorage.getItem("loggedIn")){
        axios.post(`http://localhost:8082/add/github/${userId}`, {ghUser})
        .then((response) => {
          console.log(response.data)
          sessionStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home')
        })
      }
      else{
        axios.post('http://localhost:8082/register/github', {ghUser})
        .then((response) => {
          console.log(response.data)
          sessionStorage.setItem('user', JSON.stringify(response.data));
          navigate('/home')
        })
      }
        
    }  
  }, [rerender, ghUser]);



  const handleLogin = async (e) => {
    e.preventDefault();
    const finalEmail = email.toLowerCase()
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
        body: JSON.stringify({ finalEmail, password }),
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

  const emailIsValid = (finalEmail) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(finalEmail);
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button type="submit" className="mb-2 flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Iniciar sesión
              </button>
              <button onClick={loginGH} type="button" className="bg-black text-white rounded-md px-4 py-1 w-full flex flex-wrap justify-center">
              <img src={Github} className="mx-2"></img>
                Iniciar sesion con Github
              </button>
            </div>
            {loginError && (
              <p className="mt-2 text-center text-red-600">{loginError}</p>
            )}
          </form>

          <p className="mt-8 text-center text-sm text-gray-500">
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

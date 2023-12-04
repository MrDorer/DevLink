import React, { useState, useEffect } from 'react';

import LogoGris from '../Assets/LogoGris.png';
import IconoBuscar from '../Assets/IconoBuscar.png';
import Iconoperfil from '../Assets/Iconoperfil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

function Header() {
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state && location.state.user;

  const [mostrarBarraBusqueda, setMostrarBarraBusqueda] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    // Verificar si hay información del usuario almacenada en el estado o la sesión
    if (user) {
      setLoggedInUser(user);
    } else {
      // Si no hay información de usuario, intentar obtenerla de la sesión (puedes adaptar esto según tu lógica de manejo de sesiones)
      const storedUser = JSON.parse(sessionStorage.getItem('user'));
      if (storedUser) {
        setLoggedInUser(storedUser);
      }
    }
  }, [user]);

  const handleBuscarClick = () => {
    setMostrarBarraBusqueda(!mostrarBarraBusqueda);
  };

  const handleLogout = () => {
    // Puedes agregar lógica de cierre de sesión aquí si es necesario
    // Por ejemplo, limpiar la información del usuario en el estado y la sesión
    setLoggedInUser(null);
    sessionStorage.clear();
    localStorage.clear()
    // Muestra la alerta de cierre de sesión exitoso
    enqueueSnackbar('Sesión cerrada con exito!!!', { variant: 'success' });

    // Redirigir a la página de inicio o a donde sea apropiado después de cerrar sesión
    navigate("/");
  };

  return (
    <header className="bg-purple-500 p-4 flex items-center justify-between w-full fixed top-0 z-10" style={{ backgroundColor: 'rgb(93, 48, 193)' }}>
      <div className="container mx-auto flex items-center">
        <Link to="/Home">
          <img src={LogoGris} alt="Logo" className="h-20" />
        </Link>

        <div><h1 className="text-white text-4xl font-serif font-extrabold ml-4">DevLink</h1></div>
        <FontAwesomeIcon icon={['fas', 'layer-group']} className="text-white ml-2" />
      </div>

      <div className="container mx-auto flex justify-end items-center relative">
        {loggedInUser ? (
          <div className="flex items-center">
          
            <p className="text-white font-bold text-lg mr-2">{loggedInUser.username} </p>
            <button onClick={handleLogout} className="text-black bg-white rounded-md mx-2 py-2 px-3 shadow-md border cursor-pointer font-extrabold  font-serif focus:outline-none hover:bg-slate-200">Logout</button>
          </div>
        ) : (
          <Link to="/Login">
            <img src={Iconoperfil} alt="Perfil" className="h-12 cursor-pointer ml-2" />
          </Link>
        )}
        <input
          type="text"
          placeholder="Buscar..."
          className={`h-10 p-2 rounded-md ${mostrarBarraBusqueda ? 'w-40' : 'w-0'} transition-all duration-500`}
          style={{ opacity: mostrarBarraBusqueda ? 1 : 0 }}
        />

        <img
          src={IconoBuscar}
          alt="Buscar"
          className={`h-12 cursor-pointer rounded-md ${mostrarBarraBusqueda ? 'w-0' : 'w-12'} transition-all duration-500`}
          onClick={handleBuscarClick}
        />

      </div>
    </header>
  );
}

export default Header;

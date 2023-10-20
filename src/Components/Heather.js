import React, { useState } from 'react';
import LogoGris from '../Assets/LogoGris.png';
import IconoBuscar from '../Assets/IconoBuscar.png';
import Iconoperfil from '../Assets/Iconoperfil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom'; // Importa Link de React Router

function Header() {
  const [mostrarBarraBusqueda, setMostrarBarraBusqueda] = useState(false);

  const handleBuscarClick = () => {
    setMostrarBarraBusqueda(!mostrarBarraBusqueda);
  };

  return (
    <header className="bg-purple-500 p-4 flex items-center justify-between w-full fixed top-0 z-50" style={{ backgroundColor: 'rgb(93, 48, 193)' }}>
      <div className="container mx-auto flex items-center">
        <img src={LogoGris} alt="Logo" className="h-20" />
        <div><h1 className="text-white text-4xl font-serif font-extrabold ml-4">DevLink</h1></div>
        <FontAwesomeIcon icon={['fas', 'layer-group']} className="text-white ml-2" />
      </div>

      <div className="container mx-auto flex justify-end items-center relative">
        <input
          type="text"
          placeholder="Buscar..."
          className={`h-10 p-2 rounded-md ${mostrarBarraBusqueda ? 'w-40' : 'w-0'} transition-all duration-500 ml-2`}
          style={{ opacity: mostrarBarraBusqueda ? 1 : 0 }}
        />

        <img
          src={IconoBuscar}
          alt="Buscar"
          className={`h-12 cursor-pointer rounded-md ${mostrarBarraBusqueda ? 'w-0' : 'w-12'} transition-all duration-500`}
          onClick={handleBuscarClick}
        />

        {/* Usamos Link para redirigir al usuario a la página de inicio de sesión */}
        <Link to="/Login">
          <img src={Iconoperfil} alt="Perfil" className="h-12 cursor-pointer ml-2" />
        </Link>
      </div>
    </header>
  );
}

export default Header;

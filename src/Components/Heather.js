import React, { useState } from 'react';
import LogoGris from '../Assets/LogoGris.png';
import IconoBuscar from '../Assets/IconoBuscar.png';
import Iconoperfil from '../Assets/Iconoperfil.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Header() {
  const [mostrarBarraBusqueda, setMostrarBarraBusqueda] = useState(false);

  const handleBuscarClick = () => {
    setMostrarBarraBusqueda(!mostrarBarraBusqueda);
  };

  const handleRedireccion = () => {
    // Aquí debes colocar la URL a la que deseas redirigir al usuario.
    const urlRedireccion = '#';
    window.location.href = urlRedireccion;
  };

  return (
    <header className="bg-purple-500 p-4 flex items-center justify-between w-full fixed top-0 z-50" style={{ backgroundColor: 'rgb(93, 48, 193)' }}>
      <div className="container mx-auto flex items-center">
        <img src={LogoGris} alt="Logo" className="h-20" />
        <div><h1 className="text-white text-4xl font-serif font-extrabold ml-4">DevLink</h1></div>
        <FontAwesomeIcon icon={['fas', 'layer-group']} className="text-white ml-2" />
      </div>

      <div className="container mx-auto flex justify-end items-center">
        {mostrarBarraBusqueda ? (
          <input
            type="text"
            placeholder="Buscar..."
            className="h-10 p-2 mr-2 rounded"
          />
        ) : null}

        <img
          src={IconoBuscar}
          alt="Buscar"
          className="h-12 cursor-pointer"
          onClick={handleBuscarClick}
        />

        <img
          src={Iconoperfil}
          alt="Perfil"
          className="h-12 cursor-pointer ml-2"
          onClick={handleRedireccion}
        />
      </div>
    </header>
  );
}

export default Header;

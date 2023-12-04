import React from "react";
import { Link } from "react-router-dom";

function CRUDSidebar() {
  return (
    <div className="flex h-screen">
      <div className="text-white w-64 bg-dark-purple flex flex-col justify-between">
        <div>
          <h2 className="text-2xl py-4 font-bold text-center text-white">Panel de Administrador</h2>
          <div className="flex flex-col items-center">
            <Link to="/CRUDUser">
              <button className="w-full py-2 px-4 mb-2 text-white rounded hover:bg-purple-600 font-semibold">
                Usuarios
              </button>
            </Link>
            <Link to="/CRUDComment">
              <button className="w-full py-2 px-4 mb-2 text-white rounded hover:bg-purple-600 font-semibold">
                Comentarios
              </button>
            </Link>
            <Link to="/CRUDPost">
              <button className="w-full py-2 px-4 mb-2 text-white rounded hover:bg-purple-600 font-semibold">
                Publicaciones
              </button>
            </Link>
          </div>
        </div>
        <div>
          <div className="flex flex-col pb-12 items-center">
            <Link to="/">
              <button className="w-full py-2 px-4 mb-8 bg-red-600 hover:bg-red-500 text-white rounded font-semibold">
                Cerrar sesión
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CRUDSidebar;

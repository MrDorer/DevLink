import React from "react";
import { Link } from "react-router-dom";


function CRUDSidebar() {
  return (
    <div className="flex h-screen w-auto" style={{ width: "100%" }}>
      <div className="text-white p-4 flex flex-col" style={{backgroundColor: "#351778"}}>
        <h2 className="text-2xl py-4 font-bold text-center text-black">Panel de Administrador.</h2>
        <div className="mb-8 flex-col flex grow items-center">
          <Link to="/CRUDUser">
            <button className="font-bold hover:bg-purple-600 px-6 py-2 mb-2 rounded" style={{ width: "100%" }}>
              Usuario
            </button>
          </Link>
          <Link to="/CRUDComment">
            <button className="font-bold hover:bg-purple-600 px-6 py-2 mb-2 rounded" style={{ width: "100%" }}>
              Comentarios
            </button>
          </Link>
          <Link to="/CRUDPost">
            <button className="font-bold hover:bg-purple-600 px-6 py-2 mb-2 rounded" style={{ width: "100%" }}>
              Publicaciones
            </button>
          </Link>
        </div>
        <div>
        <Link to="/">
        <button className="bg-red-600 hover:bg-red-400 text-white py-2 rounded" style={{ width: "100%" }}>
          Logout
        </button>
        </Link>
        </div>
      </div>
    </div>
  );
}

export default CRUDSidebar;

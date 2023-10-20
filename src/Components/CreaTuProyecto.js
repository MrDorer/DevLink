import React from "react";
import CrearPost from "../Assets/Icono Crear Post.png";

function CreaTuProyecto() {
  return (
    <div className="bg-gray-200 h-full w-2/3 p-4 flex flex-col items-center mt-3">
      <h1 className="text-2xl font-bold mb-4 w-full h-20">Crear Proyecto</h1>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 mb-4 md:pr-4">
          <div className="mb-4">
            <input
              type="text"
              id="titulo"
              className="w-full h-10 border rounded p-2"
              placeholder="Título"
            />
          </div>
          <div className="mb-4">
            <textarea
              id="descripcion"
              className="w-full h-40 border rounded p-2"
              placeholder="Escribe"
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="repositorio"
              className="w-full h-10 border rounded p-2"
              placeholder="Link del Repositorio"
            />
          </div>
        </div>
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <div className="w-full h-48 md:h-full border rounded p-2 py-2 bg-slate-300 flex justify-center items-center">
            <img src={CrearPost} className="w-32 h-32" alt="Insertar Imagen" />
          </div>
        </div>
      </div>
      <button className="bg-purple-500 text-white py-2 px-4 rounded mt-4">
        Crear Proyecto
      </button>
    </div>
  );
}
export default CreaTuProyecto;

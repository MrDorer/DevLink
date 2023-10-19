import React from "react";
import Footer from "../Components/Footer";

function HomeVisit() {
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 py-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 px-4">
            {/* Logo */}
            <img src="../Assets/logoMorado.png" />
            {/* Nombre de la plataforma */}
            <div>
              <h1 className="text-xl font-semibold">Nombre de la Plataforma</h1>
              <p className="text-xs text-gray-500">-Insertar eslogan-</p>
            </div>
          </div>
          {/* Botones de registro e inicio de sesión */}
          <ul className="flex items-center space-x-4">
            {/* Botón de Iniciar Sesión */}
            <li>
              <button className="bg-white hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
                Iniciar Sesión
              </button>
            </li>
            {/* Boton de Registrarse */}
            <li>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-2 py-1 rounded-full flex items-center">
                <span className="mr-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    />
                  </svg>
                </span>
                Registrarse
              </button>
            </li>
          </ul>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="w-1/3 p-4">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Usuarios Populares</h2>
            <ul>
              {/* Futura lista de usuarios populares */}
            </ul>
          </div>
        </div>

        <div className="w-2/3 p-4">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">Posts Mas Populares</h2>
            <p className="text-gray-500">Los posts mas populares van aquí</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomeVisit;

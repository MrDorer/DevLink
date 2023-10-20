import React from "react";
import Footer from "../Components/Footer";
import userIcon from "../Assets/Iconoperfil.png";
import logoMorado from "../Assets/Logomorado.png";

function HomeVisit() {
  const userList = [
    { id: 1, name: "ProgramaPro", avatar: userIcon },
    { id: 2, name: "CodeMaster", avatar: userIcon },
    { id: 3, name: "DevGenius", avatar: userIcon },
    { id: 4, name: "CodingNinja", avatar: userIcon },
    { id: 5, name: "CodeExplorer", avatar: userIcon },
    { id: 6, name: "BitWiz", avatar: userIcon },
    { id: 7, name: "CodeSavvy", avatar: userIcon },
    { id: 8, name: "DevGuru", avatar: userIcon },
    { id: 9, name: "CodeEnthusiast", avatar: userIcon },
    { id: 10, name: "ScriptingPro", avatar: userIcon },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-100 py-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 px-4">
            {/* Logo */}
            <img src={logoMorado} alt="Logo" className="w-14" />
            {/* Nombre de la plataforma */}
            <div>
              <h1 className="text-xl font-semibold">DevLink</h1>
              <p className="text-xs text-gray-500">
                Donde el código encuentra su comunidad
              </p>
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
        <div className="w-1/4 h-full p-4">
          <div className="p-4 border-r-2 border-gray-600">
            <h2 className="text-lg font-semibold mb-2">Usuarios Populares</h2>
            <ul className="space-y-2">
              {userList.map((user) => (
                <li key={user.id} className="flex items-center">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-3/4 p-4">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Posts Mas Populares</h2>
            {/*Inicio del post*/}
            <div
              className="flex w-2/3 bg-white mx-12 rounded-md p-7 mb-6 flex-wrap"
              style={{ height: "26rem" }}
            >
              <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4"></div>
              <div className="text-left">
                <h2 className="text-lg">Usuario</h2>
                <p className="text-md">@Usuario</p>
              </div>
              <div className="w-full">
                <p className="text-lg">Texto del Usuario</p>
              </div>
              <div className="w-full h-[68%] bg-[#724DC5] rounded-sm self-end"></div>
            </div>
            {/*Final del post*/}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default HomeVisit;

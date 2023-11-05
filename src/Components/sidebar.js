import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link
import hamburguesa from "../Assets/hamburguesa.png";
import Group from "../Assets/Group.png";
import { Link } from 'react-router-dom'

const App = () => {
  const [open, setOpen] = useState(true);
  const [animationDelay, setAnimationDelay] = useState(open ? 0 : 1000);
  const Menus = [
    { title: "Home", path: "/", gap: true }, // Agrega las rutas
    { title: "Perfiles", path: "/perfil", gap: true },
    { title: "Proyectos", path: "/perfil", gap: true },
    { title: "Explorar", path: "/", gap: true },
  ];

  useEffect(() => {
    setAnimationDelay(open ? 0 : 200);
  }, [open]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="mt-28 fixed flex min-h-screen">
      <div
        className={`${
          open ? "w-40" : "w-16"
        } bg-dark-purple p-5 pt-6 relative duration-500 flex-shrink-0`}
      >
        <div className="flex gap-x-4 items-center">
          <button className="lg:text-white" onClick={toggleSidebar}>
            <img src={hamburguesa} alt="Hamburguesa" className="w-6 h-6 duration-200" />
          </button>
          <h1 className={`${open ? "text-white origin-left font-medium text-xl duration-200": "hidden"}`}>Menu</h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex flex-col items-center rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm transform ${
                Menu.gap ? "mt-12" : "mt-2"
              } ${index === 0 && "bg-light-white"}`}
              style={{
                transform: open ? "translateX(0)" : "translateX(-100%)",
                opacity: open ? 1 : 0,
                transitionDuration: open
                  ? "400ms"
                  : index === 0
                  ? "1000ms"
                  : "50ms",
                transitionProperty: "transform, opacity",
                transitionDelay: `${animationDelay + index * 100}ms`,
              }}
            >
              <Link to={Menu.path} className={`${open ? "origin-left duration-100" : "hidden"}`}>
                {Menu.title}
              </Link>
              <div
                className={`w-1/2 mt-5 border-t border-gray-500 ${
                  open ? "block" : "hidden"
                }`}
              ></div>
            </li>
          ))}
          <Link to="/config">
            <img src={Group} alt="Group" className={`absolute mt-auto right-5 w-6 h-6 duration-200 ${open ? 'visible' : 'hidden '}`} />
          </Link>
        </ul>

      </div>
    </div>
  );
};

export default App;

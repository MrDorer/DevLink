import React, { useState, useEffect } from "react";
import hamburguesa from "../Assets/hamburguesa.png";
import Group from "../Assets/Group.png";

const App = () => {
  const [open, setOpen] = useState(true);
  const [animationDelay, setAnimationDelay] = useState(open ? 0 : 1000);
  const Menus = [
    { title: "Home", gap: true },
    { title: "Perfiles", gap: true },
    { title: "Proyectos", gap: true },
    { title: "Explorar", gap: true },
  ];

  useEffect(() => {
    setAnimationDelay(open ? 0 : 200);
  }, [open]);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="mt-28 fixed flex min-h-screen"> {/* Ajusta el valor de mt-10 para separar más */}
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
                Menu.gap ? "mt-12" : "mt-2" // Ajusta el valor de mt-12 para separar más el elemento "Home"
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
              <span
                className={`${
                  open ? "origin-left duration-100" : "hidden"
                }`}
              >
                {Menu.title}
              </span>
              <div
                className={`w-1/2 mt-5 border-t border-gray-500 ${
                  open ? "block" : "hidden"
                }`}
              ></div>
            </li>
          ))}
          <img src={Group} alt="Group" className={`absolute mt-auto right-5 w-6 h-6 duration-200 ${open ? 'visible' : 'hidden'}`} />

        </ul>  
       
      </div>
    </div>
  );
};

export default App;

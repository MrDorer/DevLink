import { useState } from "react";
import hamburguesa from "../Assets/hamburguesa.png";

const App = () => {
  const [open, setOpen] = useState(true);
  const Menus = [
    { title: "Home", gap: true },
    { title: "Perfiles", gap: true },
    { title: "Proyectos", gap: true },
    { title: "Explorar", gap: true },
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="flex">
      <div
        className={`${
          open ? "w-60" : "w-20 "
        } bg-dark-purple h-screen p-5  pt-6 relative duration-300`}
      >
        <div className="flex gap-x-4 items-center">
          <button
            className="lg:text-white"
            onClick={toggleSidebar}
          >
            <img src={hamburguesa} alt="Hamburguesa" className="w-6 h-6" />
          </button>
          <h1
            className={`${
              open
                ? " text-white origin-left font-medium text-xl duration-200"
                : "hidden"
            }`}
          >
            Menu
          </h1>
        </div>
        <ul className="pt-6">
          {Menus.map((Menu, index) => (
            <li
              key={index}
              className={`flex flex-col items-center rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm 
              ${Menu.gap ? "mt-9" : "mt-2"} ${
                index === 0 && "bg-light-white"
              } `}
            >
              <span
                className={`${
                  open ? "origin-left duration-200" : "hidden"
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
        </ul>
      </div>
    </div>
  );
};

export default App;

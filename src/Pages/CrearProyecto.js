import React from "react";
import Footer from "../Components/Footer";
import Heather from "../Components/Heather";
import Sidebar from "../Components/sidebar";
import CreaTuProyecto from "../Components/CreaTuProyecto";

export default function CrearProyecto() {
  return (
    <>
      <div className="flex flex-col justify-between h-screen">
        <Heather />
        <div className="flex">
          <Sidebar />
          <div className="flex mt-28 flex-grow justify-center">
            <CreaTuProyecto />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

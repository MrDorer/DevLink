import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Perfil from './Pages/Perfil';
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil" element={<Perfil />} />
      </Routes>
    </>
  );
}

export default AppRouter;

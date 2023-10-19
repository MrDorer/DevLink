import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default AppRouter;

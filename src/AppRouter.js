import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Config from './Pages/Config'
import Comentarios from './Pages/Comentarios'
import Perfil from './Pages/Perfil';
import HomeVisit from './Pages/HomeVisit';
import JIT from './Pages/JIT';

function AppRouter() {
  return (
    <>
      <Routes>
        <Route path ="/home" element={<Inicio />} />
        <Route path ="/login" element={<Login />} />
        <Route path ="/register" element={<Register />} />
        <Route path ="/perfil/:user" element={<Perfil />} />
        <Route path ='/config' element={<Config/>}/>
        <Route path ='/comentar' element={<Comentarios/>}/>
        <Route path ='/' element={<HomeVisit/>}/>
        <Route path ='/jit' element={<JIT/>}/>
      </Routes>
    </>
  );
}

export default AppRouter

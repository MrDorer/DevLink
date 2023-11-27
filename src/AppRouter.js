import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Home from './Pages/Home';  //Obsoleto
import Login from './Pages/Login';
import Register from './Pages/Register';
import Config from './Pages/Config'
import Comentarios from './Pages/Comentarios'
import Perfil from './Pages/Perfil';
import HomeVisit from './Pages/HomeVisit';
function AppRouter() {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Inicio />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/perfil/:user" element={<Perfil />} />
        <Route path ='/config' element={<Config/>}/>
        <Route path ='/comentar' element={<Comentarios/>}/>
        <Route path ='/' element={<HomeVisit/>}/>

      </Routes>
    </>
  );
}

export default AppRouter

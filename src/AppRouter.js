import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Config from './Pages/Config'
import Comentarios from './Pages/Comentarios'
import Perfil from './Pages/Perfil';
import HomeVisit from './Pages/HomeVisit';
import CRUDUser from './Pages/CRUDUser';
import CRUDComment from './Pages/CRUDComment';
import CRUDPost from './Pages/CRUDPost';
import Map from './Components/Map';
import { TriggerContextProvider } from './context/TriggerContext';

function AppRouter() {
  return (
    <>
      <TriggerContextProvider>
        <Routes>
          <Route path ="/home" element={<Inicio />} />
          <Route path ="/login" element={<Login />} />
          <Route path ="/register" element={<Register />} />
          <Route path ="/perfil/:user" element={<Perfil />} />
          <Route path ='/config' element={<Config/>}/>
          <Route path ='/comentar' element={<Comentarios/>}/>
          <Route path ='/' element={<HomeVisit/>}/>
          <Route path ='/cruduser' element={<CRUDUser/>}/>
          <Route path ='/crudcomment' element={<CRUDComment/>}/>
          <Route path ='/crudpost' element={<CRUDPost/>}/>

          <Route path ='/jit' element={<Map/>}/>
        </Routes>
      </TriggerContextProvider>
    </>
  );
}

export default AppRouter

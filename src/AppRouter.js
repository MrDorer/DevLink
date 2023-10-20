import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';
import Config from './Pages/Config'
import Comentarios from './Pages/Comentarios'

function AppRouter() {
    return (
        <>
        <Routes>
            <Route path ='/' element={<Inicio/>}/>
            <Route path ='/config' element={<Config/>}/>
            <Route path ='/comentar' element={<Comentarios/>}/>
        </Routes>
        </>
    )
}

export default AppRouter

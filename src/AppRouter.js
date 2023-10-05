import { Routes, Route } from 'react-router-dom';
import Inicio from './Pages/Inicio';

function AppRouter() {
    return (
        <>
        <Routes>
            <Route path ='/' element={<Inicio/>}/>
        </Routes>
        </>
    )
}

export default AppRouter

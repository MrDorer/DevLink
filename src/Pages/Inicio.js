import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Home from './Home';

function Inicio() {
    return (
        <>
        
        
            <div className='flex flex-col justify-between h-screen'>
                <Header />
                <Home/>
                <Footer />
            </div>
        </>
    )
}

export default Inicio
import Footer from '../Components/Footer';
import Heather from '../Components/Heather';
import Home from './Home';

function Inicio() {
    return (
        <>
        
        
            <div className='flex flex-col justify-between h-screen'>
                <Heather />
                <Home/>
                <Footer />
            </div>
        </>
    )
}

export default Inicio
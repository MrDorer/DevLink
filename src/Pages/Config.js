import Footer from '../Components/Footer';
import Heather from '../Components/Heather';
import ConfUser from '../Components/ConfUser';

function Inicio() {
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
                <Heather />
                <ConfUser/>
                <Footer />
            </div>
        </>
    )
}

export default Inicio
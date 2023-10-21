import Footer from '../Components/Footer';
import Header from '../Components/Header';
import ConfUser from '../Components/ConfUser';

function Config(){
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
                <Header />
                <ConfUser/>
                <Footer />
            </div>
        </>
    )
}

export default Config
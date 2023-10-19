import Footer from '../Components/Footer';
import Heather from '../Components/Heather';
import Post from '../Components/Post'

function Inicio() {
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
                <Heather />
                <Post/>
                <Footer />
            </div>
        </>
    )
}

export default Inicio
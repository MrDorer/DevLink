import Footer from '../Components/Footer';
import Header from '../Components/Header';
import Post from '../Components/Post'

function Comentarios() {
    return (
        <>
            <div className='flex flex-col justify-between h-screen'>
                <Header />
                <Post/>
                <Footer />
            </div>
        </>
    )
}

export default Comentarios
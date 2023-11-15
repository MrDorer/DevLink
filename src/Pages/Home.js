import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../Components/sidebar';
import { Link } from 'react-router-dom';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Donitas from '../Assets/donitas.jpg';

const Home = () => {
  const [news, setNews] = useState([]);
  const [publicaciones,setPublicaciones] = useState([])

  const getPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8082/publicaciones');
      console.log(response.data);
      setPublicaciones(response.data)
    } catch (error) {
      console.error('Error fetching publicaciones:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=apple&from=2023-11-12&to=2023-11-12&sortBy=popularity',
          {
            headers: {
              'X-Api-Key': '0ab8e04dbe1944d79178f1f971919ec0',
            },
          }
        );

        // Establecer los datos en el estado
        setNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    getPublicaciones()
    fetchData();
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente

  return (
    <div className="flex">
    <Sidebar />
    {/* Sección a la izquierda */}
    <div className="flex mt-0 flex-grow justify-center">
      <div className=' p-10 w-full ml-36 mt-20'>


          {/*Inicio del post*/}

          
          {publicaciones ? (
          publicaciones.map((publicacion, index) => (
            <>
              <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
            <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
              <img
                src="https://www.infobae.com/new-resizer/X28aHlsLoDl3i749c00aiQki6oc=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UGGM3NC5C5CVPJ7BCNSG6ALLBE.jpg"
                className="object-cover w-full h-full rounded-full"
                alt="profile"
              />
            </div>
            <div className='text-left flex justify-between w-[88.5%] items-center'>
              <div>
                <h2 className='text-md'>{publicacion.usuario}</h2>
                <p className='text-sm'>{publicacion.correo}</p>
              </div>

              <div >
                <button><FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#ff0066", }} /> </button>
                <button><FontAwesomeIcon className='mx-2' icon={faStar} size="lg" style={{ color: "#eeff00", }} /></button>
                <button><FontAwesomeIcon icon={faBookmark} size="lg" style={{ color: "#00ff7b", }} /></button>
              </div>
            </div>
            <div className='w-full'>
              <p className='text-lg py-2'>{ publicacion.img ? (publicacion.titulo) : (publicacion.contenido) }</p>
            </div>
            
              { publicacion.img && (
                <div className='w-full h-96 bg-[#724DC5] rounded-md self-end'>
                  <img src={publicacion.img} className="object-cover w-full h-full rounded-md" alt="content"></img>
                </div>
             )}
            
            <div className='w-full'>
              <input className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm' placeholder='Comentar...'></input>
              <Link to="/comentar">
                <button>
                  <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                </button>
              </Link>
              <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='pl-1' size="lg" style={{ color: "#5D30C1", }} /></button>
            </div>
          </div>
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}

          {/*Final del post*/}



</div>
  {/* Sección a la derecha */}
  <div className="flex">
        <div className="flex mt-28 flex-grow justify-center">
          <div className='flex flex-wrap w-7/12 min-w-6/12 bg-[#F2F2F2] justify-center p-10 '>
         
              <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-4">Noticias de Apple</h1>
                <ul>
                  {news.map((article) => (
                    <li key={article.url} className="mb-4">
                      <h2 className="text-xl font-bold">{article.title}</h2>
                      {article.urlToImage && (
                        <img src={article.urlToImage} alt="Noticia" className="rounded-md my-2 w-full h-48 object-cover" />
                      )}
                      <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className=" bg-blue-300 rounded-md py-1 px-2 text-white hover:bg-blue-400"
                      >
                        ver más
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>



      </div>
    </div>
  );
};

export default Home;

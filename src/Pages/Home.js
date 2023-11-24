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
  const [datos,setDatos] = useState({
    titulo: '',
    contenido: '',
    id_usuario: '',
    likes_publicacion:0,
    img:''
  })

  const [comentarios, setComentarios] = useState([]);

  const getPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8082/publicaciones');
      setPublicaciones(response.data)
    } catch (error) {
      console.error('Error fetching publicaciones:', error);
    }
  };

  const handleChange = (e) => {
    const {name, value} = e.target
    setDatos({...datos, [name]:value})
  }

 const handleChangeCom = (e, id) => {
  e.preventDefault();
  const { name, value } = e.target;
  // Encuentra el comentario correspondiente por su id y actualiza solo ese comentario
  setComentarios((prevComentarios) => [
    ...prevComentarios,
    { id_publicacion: id, id_usuario: datos.id_usuario, comentario: value },
  ]);
};

  const handleSubmitPublicaciones = async (e) => {
      e.preventDefault()    
      
    axios.post('http://localhost:8082/agregarPublicaciones',datos)
      .then( response => {
        console.log(response.data)
      })
  };

  const handleSubmitComentarios = async (e) => {
    e.preventDefault();
  
    // Iterar sobre los comentarios y enviar cada uno
    comentarios.forEach((comentario) => {
      axios.post('http://localhost:8082/agregarComentarios', comentario).then((response) => {
        console.log(response.data);
      });
    });
    e.target.reset();
    setComentarios([]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://newsapi.org/v2/everything?q=software&pageSize=6&sortBy=popularity',
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
      const user = JSON.parse(sessionStorage.getItem('user'));
      setDatos({ ...datos, id_usuario: user.id });
      setComentarios([]); // Initialize comentarios as an empty array
    };
  
    getPublicaciones();
    fetchData();
  }, []); // La dependencia vacía asegura que se ejecute solo una vez al montar el componente
  

  return (
    <div className="flex flex-wrap">
    <Sidebar />
    {/* Sección a la izquierda */}
    <div className="flex mt-0 flex-grow justify-center">
      <div className=' p-10 w-full ml-36 mt-20'>


          {/*Inicio del post*/}

          
          {publicaciones ? (
          publicaciones.map((publicacion) => (
            <>
              <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' key={publicacion.id}>
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
              <form onSubmit= {(e) => handleSubmitComentarios(e)} >

                <input 
                className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm'
                name='comentario' 
                placeholder='Comentar...'
                value={comentarios.comentario}
                onChange={(e) => handleChangeCom(e, publicacion.id)}
                
                ></input>


                <Link to="/comentar">
                  <button>
                    <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                  </button>
                </Link>
                <button type='submit'>submit</button>
              </form>
            </div>
            
            
          </div>
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}

          {/*Final del post*/}


      <div className='w-full flex flex-wrap'>
        <form onSubmit={handleSubmitPublicaciones}>
        
        <input 
        placeholder='titulo?'
        name='titulo'
        className='border border-black rounded-md px-2'
        value={datos.titulo}
        onChange={handleChange}
        />

        <input 
        placeholder='contenido?'
        name='contenido'
        className='border border-black rounded-md px-2'
        value={datos.contenido}
        onChange={handleChange}
        />

        <input 
        placeholder='imagen?'
        name='img'
        className='border border-black rounded-md px-2'
        value={datos.img}
        onChange={handleChange}
        />


        <button type="submit">Publicar</button>
        </form>
        
      </div>
</div>







  {/* Sección a la derecha  NO COLOCAR NADA PASADO ESTO*/}
  <div className="flex">
        <div className="flex mt-28 flex-grow justify-center">
          <div className='flex flex-wrap w-full min-w-6/12 bg-[#F2F2F2] justify-center py-8 px-4'>
         
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Noticias de tecnologia</h1>
                <ul>
                  {news.map((article) => (
                    <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  
                  >
                    <li key={article.url} className="mb-2 bg-[#FAFAFA] p-2 rounded-md">
                      <h2 className="text-lg font-semibold">{article.title}</h2>
                      {article.urlToImage && (
                        <img src={article.urlToImage} alt="Noticia" className="rounded-md my-2 w-full h-48 object-cover" />
                      )}
                        </li>
                      </a>
                    
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

  {/* Fin Sección a la derecha  NO COLOCAR NADA PASADO ESTO*/}

      </div>
    </div>
  );
};

export default Home;

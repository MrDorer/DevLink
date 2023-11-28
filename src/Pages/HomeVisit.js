import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import userIcon from "../Assets/Iconoperfil.png";
import logoMorado from "../Assets/Logomorado.png";
import axios from 'axios';

const HomeVisit = () => {
  const backendBaseUrl = 'http://localhost:8082';
  const [publicaciones,setPublicaciones] = useState([])
  const [userList, setUserList] = useState([]);
  const [news, setNews] = useState([]);
  const [currentNews, setCurrentNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const newsPerPage = 6;

  const getPublicaciones = async () => {
    try {
      const response = await axios.get('http://localhost:8082/publicaciones');
      setPublicaciones(response.data);
    } catch (error) {
      console.error('Error fetching publicaciones:', error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:8082/users');
        const users = await response.json();
        setUserList(users);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    getPublicaciones();
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=software&pageSize=${newsPerPage}&page=${currentPage}&sortBy=popularity`,
          {
            headers: {
              'X-Api-Key': '0ab8e04dbe1944d79178f1f971919ec0',
            },
          }
        );
        setCurrentNews(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const showNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const showPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col">

<header className="bg-gray-100 py-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-4 px-4">
            <img src={logoMorado} alt="Logo" className="w-14" />
            <div>
              <h1 className="text-xl font-semibold">DevLink</h1>
              <p className="text-xs text-gray-500">
                Donde el código encuentra su comunidad
              </p>
            </div>
          </div>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/login">
                <button className="bg-white border hover:bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                  Iniciar Sesión
                </button>
              </Link>
            </li>
            <li>
              <Link to="/register">
                <button className="bg-purple-500 border hover:bg-purple-600 text-white px-2 py-1 rounded-full flex items-center">
                  <span className="mr-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </span>
                  Registrarse
                </button>
              </Link>
            </li>
          </ul>
        </div>
      </header>

      <main className="flex flex-1">
        <div className="w-1/4 h-full p-4">
          <div className="p-4 border-r-2  border-b-2 border-gray-600 rounded-2xl bg-slate-100 mb-2 py-4">
            <h2 className="text-lg font-semibold mb-4 border-b-2 border-gray-600">Usuarios Populares</h2>
            <ul className="space-y-2 max-h-96 overflow-y-auto">
              {userList.map((user) => (
                <li key={user.id} className="flex items-center mb-2">
                  <img
                    src={userIcon}
                    alt={user.name}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  {user.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-3/4 p-4">
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-2">Posts Mas Populares</h2>


            
            {publicaciones ? (
            publicaciones.map((publicacion) => (
              <>
                <div
                  className="flex w-full bg-gray-100 mx-12 rounded-md p-7 mb-6 flex-wrap h-fit"
                  key={publicacion.id}
                  style={{
                    boxShadow:
                      "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                  }}
                >
                  <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
                    <img
                      src="https://www.infobae.com/new-resizer/X28aHlsLoDl3i749c00aiQki6oc=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UGGM3NC5C5CVPJ7BCNSG6ALLBE.jpg"
                      className="object-cover w-full h-full rounded-full"
                      alt="profile"
                    />
                  </div>
                  <div className="text-left flex justify-between w-[88.5%] items-center">
                    <div>
                      <h2 className="text-md">{publicacion.usuario}</h2>
                      <p className="text-sm">{publicacion.correo}</p>
                    </div>

                    <div>

                    </div>
                  </div>
                  <div className='w-full'>
                    <p className='text-lg py-2'>{publicacion.contenido}</p>
                  </div>

                  {publicacion.img && (
                    <div className='w-full h-96 bg-[#724DC5] rounded-md self-end'>
                      <img src={`${backendBaseUrl}/${publicacion.img}`} className="object-cover w-full h-full rounded-md" alt="content"></img>
                    </div>
                  )}

                </div>
              </>
            ))
          ) : (
            <p>Loading...</p>
          )}


          </div>
        </div>
      </main>



      <div className="container mx-auto p-4 bg-gray-200">
        <h1 className="text-3xl font-bold mt-4 mb-8 text-center">Noticias de tecnología</h1>
        <ul className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {currentNews.map((article) => (
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-md shadow-md overflow-hidden"
              key={article.url}
            >
              <div className="h-48 overflow-hidden">
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt="Noticia"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">
                  {article.title}
                </h2>
                <p className="text-sm text-gray-600">
                  {article.description}
                </p>
              </div>
            </a>
          ))}
        </ul>
      </div>      
      {/* Botones de navegación entre noticias */}
      <div className="flex justify-center my-6 bg-slate">
      <div>
        <button
          onClick={showPreviousPage}
          className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none mr-2"
        >
          Anterior
        </button>
        <button
          onClick={showNextPage}
          className="bg-gray-200 px-3 py-1 rounded-md focus:outline-none"
        >
          Siguiente
        </button>
      </div>
    </div>
    <Footer />
  </div>
  );
};

export default HomeVisit;
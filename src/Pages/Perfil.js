import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Sidebar from "../Components/sidebar";
import Followers from "../Assets/Followers.png";
import crearpost from "../Assets/crearpost.png";
import Puntofoll from "../Assets/Puntofoll.png";
import wordpress from "../Assets/wordpress.png";
import shopyfy from "../Assets/shopify.png";
import nasa from "../Assets/nasa.png";
import axios from "axios";
import MyMap from "../Components/Map";
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Perfil() {
  const params = useParams();
  const backendBaseUrl = 'http://localhost:8082';

  const [array] = useState([
    { titulo: "WordPress", imagen: wordpress },
    { titulo: "Shopyfy", imagen: shopyfy },
    { titulo: "Nasa", imagen: nasa },
    { titulo: "WordPress", imagen: wordpress },
    { titulo: "Shopyfy", imagen: shopyfy },
    { titulo: "Nasa", imagen: nasa },
  ]);
  const [open, setOpen] = useState(true);
  const [seccionActiva, setSeccionActiva] = useState('proyectos');
  const [github, setGithub] = useState([]);
  const [perfil, setPerfil] = useState([]);
  const [user, setUser] = useState();

  const [datos, setDatos] = useState({
    titulo: '',
    contenido: '',
    id_usuario: '',
    likes_publicacion: 0,
  });

  const [publicaciones, setPublicaciones] = useState();
  const [comentarios, setComentarios] = useState();
  const [comentarios2, setComentarios2] = useState({});
  const [mapCenter, setMapCenter] = useState('');
  const [hasPublications, setHasPublications] = useState(false);
  const [hasComments, setHasComments] = useState(false);
  

  const zoom = 14;



  const toggleSidebar = () => {
    setOpen(!open);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(success, error);
  };

  const renderUsuario = () => {
    axios
      .get(`http://localhost:8082/perfil/${params.user}`)
      .then((response) => {
        setUser(response.data[0].username);
        setPerfil(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const renderRepositorios = (user) => {
    axios
      .get(`https://api.github.com/users/${user}/repos`)
      .then((response) => {
        setGithub(response.data);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const renderPublicaciones = (user) => {
    axios
      .get(`http://localhost:8082/publicaciones/${user}`)
      .then((response) => {
        setPublicaciones(response.data);
        setHasPublications(response.data.length > 0);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const renderComentarios = (user) => {
    axios
      .get(`http://localhost:8082/comentariosRender/${user}`)
      .then((response) => {
        console.log(response.data)
        setComentarios(response.data);
        setHasComments(response.data.length > 0);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });

  };


  useEffect(() => {
    const fetchData = async () => {
      renderUsuario();
      renderRepositorios(user);
      renderPublicaciones(user);
      renderComentarios(user);
      getLocation();
    };

    fetchData()

    if (perfil.length > 0) {
      const userLat = perfil[0].lat;
      const userLng = perfil[0].lng;

      if (userLat !== null && userLng !== null) {
        const lat = parseFloat(userLat);
        const lng = parseFloat(userLng);
        setMapCenter({ lat, lng });
      }
    }

    const userId = JSON.parse(sessionStorage.getItem('user'));
    setDatos({ ...datos, id_usuario: userId.id });

    console.log('Centro: ', mapCenter)
  }, [user]);



  const success = (position) => {
    console.log(position);
  };

  const error = (err) => {
    console.error(err.message);
  };


  const handleChangeCom = (e, id) => {
    e.preventDefault();
    const { name, value } = e.target;
    setComentarios2((prevComentarios) => ({
      ...prevComentarios,
      [id]: {
        id_publicacion: id,
        id_usuario: datos.id_usuario,
        comentario: value,
      },
    }));
  };

  const handleSubmitComentarios = async (e) => {
    e.preventDefault();

    // Iterate through the comentarios object and send each comment
    Object.values(comentarios2).forEach((comentario) => {
      axios.post('http://localhost:8082/agregarComentarios', comentario)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error al enviar comentario:', error);
        });
    });

    e.target.reset();
    setComentarios2({});
  };

  return perfil.map((usuario, index) => {
    const isUserProfile = usuario.id == datos.id_usuario;
    const githubLoad = usuario.origen !== "DevLink"
    console.log(githubLoad)
    console.log(isUserProfile)
    return (
      <div className="flex flex-wrap flex-col" key={index}>
        <Header />
        <Sidebar />

        <div className="mt-28 ml-20 text-center flex">

          {/* perfil sidebar */}
          <div className="flex self-start justify-center items-center mx-4 ml-24 w-1/4">
            <div className="fixed mt-96">
              <div
                className={`flex ${open ? "flex-col justify-center items-center mt-10" : "hidden"
                  }`}
              >
                <img
                  alt="Perfil"
                  className="flex object-cover items-center justify-center w-40 h-40 overflow-hidden float-left rounded-full"
                  src={`${backendBaseUrl}/${usuario.img}`}
                />
                <div className="">
                  <div className="text-black text-3xl text-center">
                    {usuario.username}
                  </div>
                </div>
              </div>
              {
                isUserProfile && (
                  <div className="flex justify-center items-center mt-5">
                    <a
                      href="/config"
                      className="bg-violet-950 flex flex-col basis-auto  px-6 rounded-xl" // Ajustando el padding horizontal
                    >
                      <div className="text-white text-l leading-[206.67%] self-center">
                        Edit perfil
                      </div>
                    </a>
                  </div>
                )
              }

              <div>
                <div class="flex flex-col w-[315px] max-w-full items-center mx-5 justify-center gap-1 mt-4">
                  <img
                    src={Followers}
                    alt="Followers"
                    class="aspect-square object-cover object-center w-[30px] overflow-hidden shrink-0"
                  />
                  <div class="flex flex-col">
                    <div class="text-zinc-400 text-1xl">Followers</div>

                  </div>
                  <img
                    src={Puntofoll}
                    alt="Perfil"
                    class="aspect-square object-cover object-center w-2 fill-zinc-300 overflow-hidden self-center shrink-0 my-auto"
                  />
                  <div class="flex flex-col">
                    <div class="text-zinc-400 text-1xl">Following</div>

                  </div>
                </div>
                <p className="flex justify-center items-center text-center object-cover object-center my-3 px-10 stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px">
                  {usuario.description}
                </p>


                {/*Inicio mapa*/}


                {
                  mapCenter && (
                    <LoadScript
                      googleMapsApiKey="AIzaSyB9UpVf1nGiO7BMAYZTt6-e1LqahO12XFE"

                    >
                      <GoogleMap
                        mapContainerStyle={{ height: '40vh', width: '40vh' }}
                        center={mapCenter}
                        zoom={zoom}
                      >

                      </GoogleMap>
                    </LoadScript>
                  )
                }


                {/*Fin mapa*/}


              </div>
            </div>
          </div>

          {/* Contenido */}


          <div className="flex flex-col pt-5 w-2/3 bg-gray-200 min-h-[calc(100vh-200px)]">
            <div className="w-full py-3 flex justify-center items-center bg-gray-200 sticky top-28">
              <button
                onClick={() => setSeccionActiva('proyectos')}
                className={`mx-4 px-3 py-1 bg-white rounded-md border-2 border-purple-800 hover:bg-purple-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-black ${seccionActiva === 'proyectos' && 'bg-purple-50'}`}
              >
                Proyectos
              </button>
              <button
                onClick={() => setSeccionActiva('publicaciones')}
                className={`mx-4 px-3 py-1 bg-white rounded-md border-2 border-purple-800 hover:bg-purple-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-black ${seccionActiva === 'publicaciones' && 'bg-purple-50'}`}
              >
                Publicaciones
              </button>
              <button
                onClick={() => setSeccionActiva('comentarios')}
                className={`mx-4 px-3 py-1 bg-white rounded-md border-2 border-purple-800 hover:bg-purple-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg text-black ${seccionActiva === 'comentarios' && 'bg-purple-50'}`}
              >
                Comentarios
              </button>
            </div>

            {seccionActiva === 'proyectos' && (
              <div className="p-5">
                <p className="font-bold text-center text-4xl mb-12">Proyectos</p>
                    {githubLoad ? (
                      github.map((repositorio, index) => (
                        <a
                          key={repositorio.id}
                          href={repositorio.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="bg-white rounded-md border-2 border-purple-500 hover:bg-purple-50 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg">
                            <div className="p-4">
                              <h2 className="text-lg font-semibold">{repositorio.name}</h2>
                            </div>
                          </div>
                        </a>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <p className="text-gray-500 text-xl">No se ha vinculado una cuenta de GitHub</p>
                      </div>
                    )}
              </div>
            )}



            {seccionActiva === 'publicaciones' && (
              <div className="p-5">
                {/*Inicio del post*/}
                <p className="font-bold text-center text-4xl mb-5">Publicaciones</p>
                {publicaciones.length !== 0 ? (
                  publicaciones.map((publicacion) => (
                    <div className="flex justify-center p-2 items-center">
                      <div
                        className="flex w-[80%] bg-white rounded-md p-7 flex-wrap"
                        style={{
                          boxShadow:
                            "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                          height: "fit-content", // Ajuste de altura para las tarjetas
                        }}
                        key={publicacion.id}
                      >
                        <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
                          <img
                            src={`${backendBaseUrl}/${publicacion.imgUser}`}
                            className="object-cover w-full h-full rounded-full"
                            alt="profile"
                          />
                        </div>
                        <div className="mt-2 text-left flex justify-between w-[88.5%] items-center">
                          <div>
                            <h2 className="text-md">{publicacion.usuario}</h2>
                            <p className="text-sm">{publicacion.correo}</p>
                          </div>

                        {/*
                          <div>
                            <button>
                              <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                style={{ color: "#ff0066" }}
                              />{" "}
                            </button>
                          </div>
                        */}
                        </div>
                        <div className='w-full'>
                          <p className='text-lg py-2'>{publicacion.contenido}</p>
                        </div>

                        {publicacion.img && (
                          <div className='w-full h-96 bg-slate-50 rounded-md self-end'>
                            <img src={`${backendBaseUrl}/${publicacion.img}`} className="object-cover w-full h-full rounded-md" alt="content"></img>
                          </div>
                        )}

                        <div className="w-full">
                          {/*
                          <form onSubmit={(e) => handleSubmitComentarios(e)}>
                            <input
                              className="border-2 rounded-md w-[96%] mt-2 py-2 px-2 text-sm"
                              name='comentario'
                              placeholder='Comentar...'
                              value={comentarios2.comentario}
                              onChange={(e) => handleChangeCom(e, publicacion.id)}
                            ></input>

                            <button type="submit">
                              <FontAwesomeIcon
                                icon={faPaperPlane}
                                className="pl-1"
                                size="lg"
                                style={{ color: "#5D30C1" }}
                              />
                            </button>
                          </form>
                          */}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-500 text-xl">Nada que ver aquí aún</p>
                  </div>
                )}

              </div>


)
}
adaptar


            {/*Final del Publicacion*/}
            {seccionActiva === 'comentarios' && (
  <div className="p-5 w-[80%] ml-24">
    <p className="font-bold text-center text-4xl mb-5">Comentarios</p>
    <div className="flex flex-col items-center">
      {hasComments ? (
        comentarios.map((comentario) => (
          <div
            className="w-full bg-white mx-12 rounded-md p-7 mb-6 flex flex-col"
            style={{
              boxShadow:
                "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
              height: "fit-content", // Ajuste de altura para las tarjetas
            }}
            key={comentario.id}
          >
            <div className="flex items-center">
              <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
                <img
                  src={`${backendBaseUrl}/${comentario.img}`}
                  className="object-cover w-full h-full rounded-full"
                  alt="profile"
                />
              </div>
              <div className="text-left flex justify-between w-[88.5%] items-center">
                <div>
                  <h2 className="text-md">{comentario.usuario}</h2>
                  <p className="text-sm">{comentario.correo}</p>
                </div>

                <div>
                  {/* Display additional actions if needed */}
                </div>
              </div>
            </div>
            <div className="w-full">
              <p
                className="text-lg py-2 bg-gray-100 mt-2 rounded-md"
                style={{
                  boxShadow:
                    '-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)',
                }}
              >
                {comentario.comentario}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-500 text-xl ">Nada que ver aquí aún</p>
        </div>
      )}
    </div>
  </div>
)}

          </div>    </div >
        <Footer />
      </div>

    );
  });
}
export default Perfil;
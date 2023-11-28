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

  const [mapCenter, setMapCenter] = useState('');

  const zoom = 14;


  const [comentarios2, setComentarios2] = useState({});

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
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };

  const renderComentarios = (user) => {
    axios
      .get(`http://localhost:8082/comentarios/${user}`)
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => {
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
    setDatos({ ...datos, id_usuario: userId.id});

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
    return (
      <div className="flex flex-wrap flex-col" key={index}>
        <Header />
        <Sidebar />
        <div className="mt-28 ml-20 text-center flex">

          {/* perfil sidebar */}
          <div className="flex self-start justify-center items-center mx-4 ml-24 w-1/4">
            <div className="">
              <div
                className={`flex ${open ? "flex-col justify-center items-center mt-10" : "hidden"
                  }`}
              >
                <img
                  alt="Perfil"
                  className="flex object-cover items-center justify-center w-40 h-40 overflow-hidden float-left rounded-full"
                  src="https://www.infobae.com/new-resizer/X28aHlsLoDl3i749c00aiQki6oc=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UGGM3NC5C5CVPJ7BCNSG6ALLBE.jpg"
                />
                <div className="">
                  <div className="text-black text-3xl text-center">
                    {usuario.username}
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center mt-5">
                <a
                  href="/config"
                  className="bg-violet-950 flex w-[175px] max-w-full flex-col basis-auto pt-1 pb-1 px-3 rounded-xl" // Ajustando el padding horizontal
                >
                  <div className="text-white text-2xl leading-[206.67%] self-center">
                    Edit perfil
                  </div>
                </a>
              </div>

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
                    mapContainerStyle={{ height: '35vh', width: '100%' }}
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
          <div className="flex flex-col pt-5 w-2/3 bg-gray-200">
            <div class="text-black text-4xl leading-[155%] self-center ml-0 mb-5 w-[180px]">
              Proyects
            </div>
            <div>
              <div className="flex justify-center mb-5">
                <div class="grid-cols-3 grid gap-8">
                  {github.map((repositorio, index) => {
                    return (
                      <a
                        key={repositorio.id}
                        href={repositorio.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div
                          className="bg-white rounded-md w-60 h-14 border-2 font-mono flex flex-wrap p-2 text-center"
                          style={{
                            boxShadow:
                              "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                          }}
                        >
                          <h2 className=" text-xl w-full">
                            {repositorio.name}
                          </h2>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
              <div className="">
                {/*Inicio del post*/}
                <p className="font-bold text-center text-2xl mb-5">Publicaciones</p>
                {publicaciones ? (
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
                            src="https://www.infobae.com/new-resizer/X28aHlsLoDl3i749c00aiQki6oc=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UGGM3NC5C5CVPJ7BCNSG6ALLBE.jpg"
                            className="object-cover w-full h-full rounded-full"
                            alt="profile"
                          />
                        </div>
                        <div className="mt-2 text-left flex justify-between w-[88.5%] items-center">
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

                        <div className="w-full">
                          <form onSubmit= {(e) => handleSubmitComentarios(e)}>
                            <input
                              className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm'
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
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
              {/*Final del Publicacion*/}
            </div>
            <p className="font-bold text-center text-2xl mt-5 mb-5">Comentarios</p>
            <div className="flex justify-center p-2 items-center">
              <div className="flex w-[80%] rounded-md p-7 flex-wrap">
                {comentarios ? (
                  comentarios.map((comentario) => (
                    <>
                      <div
                        className="flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap"
                        style={{
                          boxShadow:
                            "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                          height: "fit-content", // Ajuste de altura para las tarjetas
                        }}
                        key={comentario.id}
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
                            <h2 className="text-md">{comentario.usuario}</h2>
                            <p className="text-sm">{comentario.correo}</p>
                          </div>

                          <div>
                            <button>
                              <FontAwesomeIcon
                                icon={faHeart}
                                size="lg"
                                style={{ color: "#ff0066" }}
                              />{" "}
                            </button>
                          </div>
                        </div>
                        <div className="w-full">
                          <p className="text-lg py-2 bg-gray-100 mt-2 rounded-md"
                            style={{
                              boxShadow: '-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)',
                            }}>
                            {comentario.img
                              ? comentario.comentario
                              : comentario.comentario}
                          </p>
                        </div>

                        {comentario.img && (
                          <div className="w-full h-96 bg-[#724DC5] rounded-md self-end">
                            <img
                              src={comentario.img}
                              className="object-cover w-full h-full rounded-md"
                              alt="content"
                            ></img>
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

            {/*Final del comentario*/}
          </div>

        </div>
        <Footer />
      </div>
    );
  });
}

export default Perfil;
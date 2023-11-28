import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Followers from "../Assets/Followers.png";
import crearpost from "../Assets/crearpost.png";
import Puntofoll from "../Assets/Puntofoll.png";
import wordpress from "../Assets/wordpress.png";
import shopyfy from "../Assets/shopify.png";
import nasa from "../Assets/nasa.png";
import axios from "axios";
import MyMap from "../Components/Map";

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";

function Perfil() {
  const params = useParams();

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

  const [publicaciones, setPublicaciones] = useState();
  const [comentarios, setComentarios] = useState();

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
        console.log(response.data);
        setUser(response.data[0].username);
        console.log(response.data.username);
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
        console.log("Repositorios:", response.data);
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
        console.log("Publicaciones:", response.data);
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
        console.log("Comentarios:", response.data);
        setComentarios(response.data);
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

    fetchData();
  }, [user]);

  const success = (position) => {
    console.log(position);
  };

  const error = (err) => {
    console.error(err.message);
  };

  return perfil.map((usuario, index) => {
    return (
      <>
        <Header />

        <div className="mt-28 text-center flex w-full">
          {/* perfil sidebar */}
          <div className="flex self-start justify-center items-center mr-14 ml-10 w-1/4">
            <div className="">
              <div
                className={`flex ${
                  open ? "flex-col justify-center items-center mt-10" : "hidden"
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
                  className="bg-violet-950 flex w-[175px] max-w-full flex-col grow shrink-0 basis-auto pt-1 pb-1.5 px-5 rounded-xl"
                >
                  <div className="text-white text-2xl leading-[206.67%] self-center">
                    Edit perfil
                  </div>
                </a>
              </div>
              <div>
                <div class="flex flex-col w-[315px] max-w-full items-center justify-center gap-1 mt-4">
                  <img
                    src={Followers}
                    alt="Followers"
                    class="aspect-square object-cover object-center w-[30px] overflow-hidden shrink-0"
                  />
                  <div class="flex flex-col">
                    <div class="text-zinc-400 text-1xl">Followers</div>
                    <img
                      loading="lazy"
                      srcset="..."
                      class="aspect-[123] object-cover object-center w-[75px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px mb-2"
                      alt="Seguidores"
                    />
                  </div>
                  <img
                    src={Puntofoll}
                    alt="Perfil"
                    class="aspect-square object-cover object-center w-2 fill-zinc-300 overflow-hidden self-center shrink-0 my-auto"
                  />
                  <div class="flex flex-col">
                    <div class="text-zinc-400 text-1xl">Following</div>
                    <img
                      loading="lazy"
                      srcset="..."
                      class="aspect-[123] object-cover object-center w-[75px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px"
                      alt="Siguiendo"
                    />
                  </div>
                </div>
                <p className="flex justify-center items-center text-center object-cover object-center my-3 stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px">
                  {usuario.description}
                </p>
                <MyMap />
              </div>
            </div>
          </div>

          {/* Contenido */}
          <div class="flex flex-col pt-5 w-2/3 bg-gray-200">
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
              <p className="font-bold text-center text-2xl mb-5">
                Publicaciones
              </p>
              {publicaciones ? (
                publicaciones.map((publicacion) => (
                  <div className="flex justify-center p-2 items-center">
                    <div
                      className="flex w-[80%] bg-white rounded-md p-7 flex-wrap h-fit"
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
                        <p className="text-lg py-2">
                          {publicacion.img
                            ? publicacion.titulo
                            : publicacion.contenido}
                        </p>
                      </div>

                      {publicacion.img && (
                        <div className="w-full h-96 bg-[#724DC5] rounded-md self-end">
                          <img
                            src={publicacion.img}
                            className="object-cover w-full h-full rounded-md"
                            alt="content"
                          ></img>
                        </div>
                      )}

                      <div className="w-full">
                        <form>
                          <input
                            className="border-2 rounded-md w-[91%] mt-2 px-2 text-sm"
                            name="comentario"
                            placeholder="Comentar..."
                          ></input>

                          <Link to="/comentar">
                            <button>
                              <FontAwesomeIcon
                                icon={faComment}
                                className="pl-1"
                                size="lg"
                                style={{ color: "#5D30C1" }}
                              />
                            </button>
                          </Link>
                          <div className="pt-4">
                          <button type="submit" className="border-black rounded-md bg-dark-purple text-white py-2 px-4">Subir</button>
                          </div>
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
            <p className="font-bold text-center text-2xl mb-5">
                Comentarios
            </p>
            <div className="w-[90%] grid py-2">
            {comentarios ? (
              comentarios.map((comentario) => (
                <>
                  <div
                    className="flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit"
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
                      <p className="text-lg py-2">
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

                    <div className="w-full">
                      <form>
                        <input
                          className="border-2 rounded-md w-[91%] mt-2 px-2 text-sm"
                          name="comentario"
                          placeholder="Comentar..."
                        ></input>

                        <Link to="/comentar">
                          <button>
                            <FontAwesomeIcon
                              icon={faComment}
                              className="pl-1"
                              size="lg"
                              style={{ color: "#5D30C1" }}
                            />
                          </button>
                        </Link>
                        <button type="submit">submit</button>
                      </form>
                    </div>
                  </div>
                </>
              ))
            ) : (
              <p>Loading...</p>
            )}
            </div>
            {/*Final del comentario*/}
          </div>
        </div>
        <Footer />
      </>
    );
  });
}

export default Perfil;
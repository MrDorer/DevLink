import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../Components/sidebar";
import { Link } from "react-router-dom";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import { faBookmark } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-regular-svg-icons";
import Donitas from "../Assets/donitas.jpg";
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Swal from "sweetalert2";
import Modal from 'react-modal';
const Home = () => {
  const [news, setNews] = useState([]);
  const [publicaciones, setPublicaciones] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [publicacionError, setPublicacionError] = useState(null);
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [modalOpen, setModalOpen] = useState({});

  const handleOpenModal = (publication) => {
    setSelectedPublication(publication);
    setModalOpen({ ...modalOpen, [publication.id]: true });
  };

  const handleCloseModal = (publicationId) => {
    setModalOpen({ ...modalOpen, [publicationId]: false });
    setIsModalOpen(false); // Establece el estado del fondo oscurecido
    if (selectedPublication && selectedPublication.id === publicationId) {
      setSelectedPublication(null);
    }
  };


  const [datos, setDatos] = useState({
    titulo: "",
    contenido: "",

    likes_publicacion: 0,
    img: "",
  });

  const [comentarios, setComentarios] = useState({});

  const [imagen, setImagen] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const allowedImageTypes = ["image/jpeg", "image/png"]; // Tipos de archivo permitidos (JPEG y PNG)

  const handleImagenChange = (e) => {
    const file = e.target.files[0];

    if (file && allowedImageTypes.includes(file.type)) {
      setImagen(file);
      setImageUrl(URL.createObjectURL(file));
    } else {
      // Archivo no válido, puedes mostrar un mensaje al usuario o realizar alguna acción
      console.error(
        "Tipo de archivo no admitido. Por favor, selecciona una imagen válida (JPEG, PNG)."
      );
    }
  };
  const handleChangeCom = (e, id) => {
    e.preventDefault();
    const { name, value } = e.target;
    setComentarios((prevComentarios) => ({
      ...prevComentarios,
      [id]: {
        id_publicacion: id,
        id_usuario: datos.id_usuario,
        comentario: value,
      },
    }));
  };

  const backendBaseUrl = "http://localhost:8082";

  const getPublicaciones = async () => {
    try {
      const response = await axios.get("http://localhost:8082/publicaciones");
      setPublicaciones(response.data);
    } catch (error) {
      console.error("Error fetching publicaciones:", error);
    }
  };

  const handleSubmitPublicaciones = async (e) => {
    e.preventDefault();
    if (!datos.contenido) {
      // Mostrar alerta de error con SweetAlert si el campo está vacío
      Swal.fire({
        icon: "error",
        title: "Campo incompleto",
        text: "Por favor, completa el campo para publicar.",
      });
      return;
    }

    try {
      const formData = new FormData();
      formData.append("titulo", datos.titulo);
      formData.append("contenido", datos.contenido);
      formData.append("id_usuario", datos.id_usuario);
      formData.append("likes_publicacion", datos.likes_publicacion);
      formData.append("img", imagen);

      const response = await axios.post(
        "http://localhost:8082/agregarPublicaciones",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Mostrar la alerta de publicación exitosa con SweetAlert
      Swal.fire({
        icon: "success",
        title: "Publicado correctamente",
        showConfirmButton: false,
        timer: 1500,
      });

      setPublicacionError(null);

      setDatos({
        titulo: "",
        contenido: "",
        id_usuario: datos.id_usuario,
        likes_publicacion: 0,
        img: "",
      });

      setImageUrl(null);
      getPublicaciones();
    } catch (error) {
      console.error("Error al publicar:", error);
      setPublicacionError("Error al publicar la publicación.");
    }
  };

  const handleSubmitComentarios = async (e) => {
    e.preventDefault();

    // Verificar si no hay comentarios para enviar
    if (Object.keys(comentarios).length === 0) {
      // Mostrar alerta de error con SweetAlert si no hay comentarios
      Swal.fire({
        icon: "error",
        title: "Ingresa un comentario",
        text: "Por favor, ingresa un comentario antes de enviar.",
      });
      return;
    }

    try {
      // Enviar cada comentario del objeto 'comentarios'
      await Promise.all(
        Object.values(comentarios).map((comentario) =>
          axios.post("http://localhost:8082/agregarComentarios", comentario)
        )
      );

      // Mostrar la alerta de comentario enviado después de enviar todos los comentarios
      Swal.fire({
        icon: "success",
        title: "Comentario enviado",
        showConfirmButton: false,
        timer: 1000,
        e,
      });

      e.target.reset();
      setComentarios({});
    } catch (error) {
      console.error("Error al enviar comentario:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://newsapi.org/v2/everything?q=software&pageSize=20&sortBy=popularity",
          {
            headers: {
              "X-Api-Key": "0ab8e04dbe1944d79178f1f971919ec0",
            },
          }
        );
        setNews(response.data.articles);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      const user = JSON.parse(sessionStorage.getItem("user"));
      setDatos({ ...datos, id_usuario: user.id });
    };

    getPublicaciones();
    fetchData();
  }, []);

  const fetchLikes = async (postId) => {
    try {
      const response = await fetch(`http://localhost:8082/likes/${postId}`);
      const data = await response.json();
      setLikes((prevLikes) => ({ ...prevLikes, [postId]: data.likesCount }));
    } catch (error) {
      console.error("Error al obtener likes:", error);
    }
  };

  useEffect(() => {

    const fetchPublicaciones = async () => {
      try {
        const response = await axios.get("http://localhost:8082/publicaciones");
        setPublicaciones(response.data);

        response.data.forEach((publicacion) => {
          fetchLikes(publicacion.id);
          setLiked((prevLiked) => ({ ...prevLiked, [publicacion.id]: false }));
        });
      } catch (error) {
        console.error("Error al obtener publicaciones:", error);
      }
    };

    fetchPublicaciones();
  }, []);

  const handleLike = async (postId) => {
    try {
      // Obtener el ID del usuario del sessionStorage
      const user = JSON.parse(sessionStorage.getItem("user"));
      const userId = user.id;

      const response = await axios.post("http://localhost:8082/like", {
        postId,
        userId,
      });

      console.log(response.data);

      fetchLikes(postId);

      setLiked((prevLiked) => ({ ...prevLiked, [postId]: !prevLiked[postId] }));
    } catch (error) {
      console.error("Error al manejar el like:", error);
    }
  };

  return (
    <div className="flex flex-wrap">
      <Sidebar />
      <div className="flex mt-0 flex-grow justify-center">
        <div className="p-10 w-full ml-36 mt-20">
          <div
            className="w-full flex flex-wrap mx-12 rounded-md p-4 pb-2 h-fit bg-gray-100 mb-4 mt-2"
            style={{
              boxShadow:
                "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
            }}
          >
            <h1 className="mb-1 font-semibold">¿Qué estás codeando?</h1>

            <form
              onSubmit={handleSubmitPublicaciones}
              className="w-full flex flex-wrap items-start"
            >
              <div className="w-full flex flex-wrap items-start mb-2">
                <input
                  placeholder="¿Qué estás codeando?"
                  name="contenido"
                  value={datos.contenido}
                  onChange={(e) =>
                    setDatos({ ...datos, contenido: e.target.value })
                  }
                  className="border border-gray-300 rounded-md w-full px-3 py-2 mr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label className="relative overflow-hidden">
                  <span className="block py-2 px-2 rounded-md bg-gray-200 cursor-pointer mt-2 mr-4">
                    Seleccionar archivo
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    name="img"
                    value={datos.img}
                    onChange={handleImagenChange}
                    className="absolute inset-0 opacity-0 cursor-pointer "
                  />
                  {imageUrl && (
                    <div className="mt-2">
                      <img
                        src={imageUrl}
                        alt="Selected"
                        className="max-w-full h-auto mr-4"
                      />{" "}
                      {/* Clases para la imagen */}
                    </div>
                  )}
                </label>
              </div>

              {publicacionError && (
                <p className="w-full text-red-600">{publicacionError}</p>
              )}

              <button
                type="submit"
                className="ml-auto mt-auto bg-indigo-500 hover:bg-indigo-700 text-white rounded-md px-8 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-300"
              >
                Publicar
              </button>
            </form>
          </div>
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
                  <div className="h-14 w-14 bg-white rounded-full mr-4">
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
                      <button
                        onClick={() => handleLike(publicacion.id)}
                        style={{
                          color: liked[publicacion.id] ? "#ff0066" : "black",
                        }}
                      >
                        <FontAwesomeIcon icon={faHeart} size="lg" />
                      </button>
                      <span>{likes[publicacion.id] || 0} Likes</span>
                    </div>
                  </div>
                  <div className="w-full">
                    <p className="text-lg py-2">{publicacion.contenido}</p>
                  </div>

                  {publicacion.img && (
                    <div className="w-full h-96 bg-white rounded-md self-end">
                      <img
                        src={`${backendBaseUrl}/${publicacion.img}`}
                        className="object-cover w-full h-full rounded-md"
                        alt="content"
                      ></img>
                    </div>
                  )}
                  <button className="mt-6 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors duration-300"
                    onClick={() => handleOpenModal(publicacion)}>Abrir publicacion</button>
                  <Modal
                    isOpen={modalOpen[publicacion.id]}
                    onRequestClose={() => handleCloseModal(publicacion.id)}
                    contentLabel="publicaciones Modal"
                    className={`fixed inset-0 flex items-center justify-center z-50 mt-24 -ml-44 overflow-y-auto ${isModalOpen ? 'overflow-hidden' : ''
                      }`}
                    overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-20 bg-gray-800"
                  >
                    <div>
                      {selectedPublication && (
                        <div className="flex  mt-10 bg-gray-100 w-full rounded-md p-7 mb-6 flex-wrap mx-28 justify-end"
                          style={{
                            boxShadow:
                              "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                          }}
                        >

                          <button
                            onClick={() => {
                              handleCloseModal(publicacion.id);
                              setSelectedPublication(null);
                            }}
                            className="bg-gray-200 text-gray-800 py-1 px-2 rounded-md hover:bg-purple-300 transition-colors duration-300 mb-2 -mt-4 ml-auto"
                          >
                            <FontAwesomeIcon icon={faTimes} style={{ color: "#351778" }} />
                          </button>


                          <div className="border border-gray-400 bg-white p-6 rounded-lg w-full max-w-3xl relative shadow-lg">

                            <div className="flex items-center mb-4">
                              <div className="h-14 w-14 bg-white rounded-full mr-4">
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
                                  <button
                                    onClick={() => handleLike(publicacion.id)}
                                    style={{
                                      color: liked[publicacion.id] ? "#ff0066" : "black",
                                    }}
                                  >
                                    <FontAwesomeIcon icon={faHeart} size="lg" />
                                  </button>
                                  <span>{likes[publicacion.id] || 0} Likes</span>
                                </div>
                              </div>
                            </div>

                            {selectedPublication && (
                              <>
                                <p className="text-base text-gray-700 mt-4">
                                  {selectedPublication.contenido}
                                </p>
                                {selectedPublication.img && (
                                  <div className="w-full h-72 mt-4 rounded-md overflow-hidden">
                                    <img
                                      src={`${backendBaseUrl}/${selectedPublication.img}`}
                                      className="object-cover w-full h-full"
                                      alt="content"
                                    />
                                  </div>
                                )}
                              </>
                            )}

                            <div className="w-full">
                              <form onSubmit={(e) => handleSubmitComentarios(e)}>
                                <input
                                  className="border-2 rounded-md w-[94%] mt-2 py-2 px-2 text-sm"
                                  name="comentario"
                                  placeholder="Comentar..."
                                  value={comentarios.comentario}
                                  onChange={(e) => handleChangeCom(e, publicacion.id)}
                                ></input>

                                <button>
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
                      )}
                    </div>
                  </Modal>


                  <div className="w-full">
                    <form onSubmit={(e) => handleSubmitComentarios(e)}>
                      <input
                        className="border-2 rounded-md w-[96%] mt-2 py-2 px-2 text-sm"
                        name="comentario"
                        placeholder="Comentar..."
                        value={comentarios.comentario}
                        onChange={(e) => handleChangeCom(e, publicacion.id)}
                      ></input>

                      <button>
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
              </>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>

        {/*Noticias*/}
        <div className="flex">
          <div className="flex mt-20 flex-grow justify-center">
            <div className="flex flex-wrap w-full min-w-6/12 justify-center py-8 px-4">
              <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4 text-center bg-gray-100 px-2 py-2 rounded-md shadow-md">
                  Noticias de tecnologia
                </h1>
                <ul>
                  {news.map((article, index) => (
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={index}
                    >
                      <li
                        key={article.url}
                        className="mb-2 bg-gray-100 p-2 rounded-md"
                        style={{
                          boxShadow:
                            "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                        }}
                      >
                        <h2 className="text-lg font-semibold">
                          {article.title}
                        </h2>
                        {article.urlToImage && (
                          <img
                            src={article.urlToImage}
                            alt="Noticia"
                            className="rounded-md my-2 w-full h-48 object-cover"
                          />
                        )}
                      </li>
                    </a>
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

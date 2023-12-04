import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from 'react-modal';
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import CommentForm from "./CommentForm";

function Post() {

  const [postComments, setPostComments] = useState({});
  const [publicaciones, setPublicaciones] = useState([]);
  const [likes, setLikes] = useState({});
  const [liked, setLiked] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [modalOpen, setModalOpen] = useState({});
  const [comments, setComments] = useState([]);

  const handlePostClick = (publicacion) => {
    if (modalOpen[publicacion.id]) {
      handleCloseModal(publicacion.id);
      setSelectedPublication(null);
    } else {
      handleOpenModal(publicacion);
    }
  };

  const handleOpenModal = async (publicacion) => {
    setSelectedPublication(publicacion);
    setModalOpen((prevModalOpen) => ({
      ...prevModalOpen,
      [publicacion.id]: true,
    }));
    setIsModalOpen(true);

    // Fetch comments for the selected post
    try {
      const response = await axios.get(`http://localhost:8082/comment/${publicacion.id}`);
      setPostComments((prevComments) => ({
        ...prevComments,
        [publicacion.id]: response.data,
      }));
    } catch (error) {
      console.error("Error fetching comments for post:", error);
    }
  };
  const handleCloseModal = (postId) => {
    setModalOpen((prevModalOpen) => ({
      ...prevModalOpen,
      [postId]: false,
    }));
    setIsModalOpen(false);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation(); // Prevent modal from opening when clicking on the comment textbox
  };

  const [datos, setDatos] = useState({
    id_usuario: 0,
    titulo: "",
    contenido: "",
    likes_publicacion: 0,
    img: "",
  });



  const backendBaseUrl = "http://localhost:8082";

  const getPublicaciones = async (userId) => {
    try {
      const response = await axios.get("http://localhost:8082/publicaciones");
      setPublicaciones(response.data);

      const commentsPromises = response.data.map((publicacion) =>
        fetchComments(publicacion.id, userId)
      );
      await Promise.all(commentsPromises);
    } catch (error) {
      console.error("Error fetching publicaciones:", error);
    }
  };


  const fetchComments = async (postId, userId) => {
    console.log(postId)
    try {
      const response = await axios.get(`http://localhost:8082/comment/${postId}/${userId}`);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: response.data,
      }));
      console.log('Updated comments state:', comments);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };



  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setDatos({ ...datos, id_usuario: user.id });
    getPublicaciones(user.id);
    console.log(datos.id_usuario)
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

  const handleLike = async (postId, e) => {
    try {
      e.stopPropagation();
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
    <>
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
              onClick={() => handlePostClick(publicacion)}
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
                  <h2 className="text-md">{publicacion.username}</h2>
                  <p className="text-sm">{publicacion.correo}</p>
                </div>

                <div>
                  <button
                    onClick={(e) => handleLike(publicacion.id, e)}
                    style={{
                      color: liked[publicacion.id] ? "#ff0066" : "black",
                    }}
                  >
                    <FontAwesomeIcon icon={faHeart} size="lg" />
                  </button>

                  <span className="ml-1">{likes[publicacion.id] || 0}</span>
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
              <CommentForm userId={datos.id_usuario} publicacionId={publicacion.id} />





              <Modal
                isOpen={modalOpen[publicacion.id]}
                onRequestClose={() => handleCloseModal(publicacion.id)}
                contentLabel="publicaciones Modal"
                className="fixed inset-0 flex items-center justify-center z-10 "
                overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-20 bg-gray-800"
              >
                <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg max-h-[80vh] overflow-y-auto mt-36 mb-10">
                  {selectedPublication && (
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
                          <h2 className="text-md">{publicacion.username}</h2>
                          <p className="text-sm">{publicacion.correo}</p>
                        </div>
                        <div>
                          <button
                            onClick={() => handleLike(publicacion.id)}
                            className={liked[publicacion.id] ? "text-red-500" : "text-black"}
                          >
                            <FontAwesomeIcon icon={faHeart} size="lg" />
                          </button>
                          <span className="ml-1">{likes[publicacion.id] || 0}</span>
                        </div>
                      </div>
                    </div>
                  )}

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
                  <CommentForm onClick={(e) => handleCommentClick} userId={datos.id_usuario} publicacionId={publicacion.id} />

                  {postComments[publicacion.id] && postComments[publicacion.id].map((comment) => (
                    <div
                      className="flex w-full border border-gray-300 bg-white rounded-md p-7 mt-4 flex-wrap"
                      key={comment.id}
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
                          <h2 className="text-md">{comment.username}</h2>
                          <p className="text-sm">{comment.correo}</p>
                        </div>
                        <div>
                          <button>
                            <FontAwesomeIcon icon={faHeart} size="lg" style={{ color: "#ff0066" }} />
                          </button>
                        </div>
                      </div>
                      <div className="w-full">
                        <p className="text-lg py-2 bg-gray-100 mt-2 rounded-md px-2">
                          {comment.comentario}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Modal>



              {comments[publicacion.id] && comments[publicacion.id].map((comment) => (
                <div
                  className="flex w-full bg-white rounded-md p-7 mt-4 flex-wrap"
                  style={{
                    boxShadow:
                      "-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)",
                    height: "fit-content", // Ajuste de altura para las tarjetas
                  }}
                  key={comment.id}
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
                      <h2 className="text-md">{comment.username}</h2>
                      <p className="text-sm">{comment.correo}</p>
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
                    <p className="text-lg py-2 bg-gray-100 mt-2 rounded-md px-2"
                      style={{
                        boxShadow: '-5px 0 5px -5px rgba(0, 0, 0, 0.3), 5px 0 5px -5px rgba(0, 0, 0, 0.3), 0 5px 5px -5px rgba(0, 0, 0, 0.5)',
                      }}>

                      {comment.comentario}
                    </p>
                  </div>



                </div>
              ))}

            </div>




          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </>
  )
}

export default Post

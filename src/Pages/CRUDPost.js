import React, { useEffect, useState } from "react";
import axios from "axios";
import CRUDSidebar from "../Components/CRUDSidebar";

const PopupModal = ({ post, onClose, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:8082/publicaciones/${postId}`);
      console.log(`Publicación con ID ${postId} eliminada con éxito`);

      closeModal();
      onDelete(postId);
    } catch (error) {
      console.error("Error al eliminar la publicación:", error);
      // Manejar errores aquí
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        data-modal-target="popup-modal"
        data-modal-toggle="popup-modal"
        className="block text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
        type="button"
      >
        Eliminar
      </button>

      {/* Popup modal */}
      {isModalOpen && (
        <div
          id="popup-modal"
          tabIndex="-1"
          className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
        >
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow-md">
              <button
                onClick={closeModal}
                type="button"
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Cerrar modal</span>
              </button>
              <div className="p-4 md:p-5 text-center bg-gray-100 border border-gray-600 rounded-lg">
                <svg
                  className="mx-auto mb-4 w-12 h-12 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal">
                  ¿Estás seguro de Eliminar esta publicacion?
                </h3>
                <button
                  onClick={() => {
                    closeModal();
                    handleDelete(post.id);
                  }}
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2 shadow-md"
                >
                  Eliminar
                </button>

                <button
                  onClick={closeModal}
                  type="button"
                  className="text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2 shadow-md"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const CRUDPost = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get("http://localhost:8082/publicaciones");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleDelete = (postId) => {
    // Actualiza el estado eliminando la publicación con el postId
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  return (
    <div className="flex h-screen">
      <div className="h-screen">
        <CRUDSidebar />
      </div>

      <div className="flex flex-col pl-8 pt-10 ml-96 mt-16">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Usuario</th>
                <th className="border border-gray-300 px-4 py-2">
                  Descripcion
                </th>
                <th className="border border-gray-300 px-4 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.id_usuario}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {post.contenido}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <PopupModal post={post} onDelete={handleDelete} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CRUDPost;

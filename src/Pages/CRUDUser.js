import React, { useEffect, useState } from "react";
import CRUDSidebar from "../Components/CRUDSidebar";
import { SnackbarProvider, useSnackbar } from "notistack";
import axios from "axios";

const CrudModal = ({ user, onClose, onDelete, onEdit }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username || "",
    email: user.email || "",
    description: user.description || "",
  });

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEdit = async (userId) => {
    try {
      await axios.put(`http://localhost:8082/users/:id`, formData);
      console.log("Usuario editado con éxito");
      enqueueSnackbar("Usuario editado con éxito", { variant: "success" });
      closeModal();
      onEdit(userId, formData); // Llamada a la función de actualización en el componente padre
    } catch (error) {
      console.error("Error al editar el usuario:", error);
      enqueueSnackbar("Error al editar el usuario", { variant: "error" });
      // Manejar errores aquí
    }
  };

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <button
          onClick={toggleModal}
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          type="button"
        >
          Editar
        </button>
        {isModalOpen && (
          <div
            id="crud-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-screen"
          >
            <div className="relative p-4 w-full max-w-md max-h-full">
              {/* Modal content */}
              <div className="relative rounded-lg shadow-md border bg-gray-100 border-gray-800">
                {/* Modal header */}
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 ">
                    Editar Usuario
                  </h3>
                  <button
                    onClick={() => {
                      closeModal();
                    }}
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-toggle="crud-modal"
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
                </div>
                <form className="p-4 md:p-5">
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Nombre de usuario
                      </label>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 shadow-md"
                        placeholder="Nombre de usuario"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Correo electronico
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-white dark:border-gray-500 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500 shadow-md"
                        placeholder="Correo electrónico"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        htmlFor="description"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Descripcion
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        rows="4"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="block p-2.5 w-full text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 bg-white dark:border-gray-500 dark:focus:ring-blue-500 dark:focus:border-blue-500 shadow-md"
                        placeholder="Escribe o edita la descripcion aqui"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      closeModal();
                      handleEdit(user.id);
                    }}
                    type="submit"
                    className="text-white inline-flex items-center bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 shadow-md"
                  >
                    <svg
                      className="me-1 -ms-1 w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    Aceptar Cambios
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </SnackbarProvider>
    </>
  );
};

const PopupModal = ({ user, onClose, onDelete }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleDelete = async (userId) => {
    try {
      // Enviar una solicitud DELETE al backend para eliminar el usuario
      await axios.delete(`http://localhost:8082/eliminar/usuario/:id`);

      // Muestra una notificación de éxito
      enqueueSnackbar(`Usuario con ID ${userId} eliminado con éxito`, {
        variant: "success",
      });

      // Cierra el modal después de la eliminación exitosa
      closeModal();

      // Actualiza la lista de usuarios después de la eliminación
      onDelete(userId);
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);

      // Muestra una notificación de error
      enqueueSnackbar("Error al eliminar el usuario", { variant: "error" });

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
                  ¿Estás seguro de Eliminar este usuario? (se borrarán cualquier
                  contenido relacionado con el usuario, como publicaciones y
                  comentarios)
                </h3>
                <button
                  onClick={() => {
                    closeModal();
                    handleDelete(user.id);
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
const CRUDUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8082/eliminar/usuario/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleEditUser = (userId, updatedData) => {
    // Actualizar el estado con los datos editados
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, ...updatedData } : user
      )
    );
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8082/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return (
    <div className="flex h-screen">
      <div className="h-screen">
        <CRUDSidebar />
      </div>
      <div className="flex flex-col pl-8 pt-10 ml-32 mt-16">
        <div className="overflow-x-auto">
          <table className="table-auto min-w-full border-collapse border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">
                  Nombre de Usuario
                </th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">
                  Descripción
                </th>
                <th className="border border-gray-300 px-4 py-2">Empresa</th>
                <th className="border border-gray-300 px-4 py-2">Opciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="border border-gray-300 px-4 py-2">
                    {user.username}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.description}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.origen}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 flex gap-2">
                    <CrudModal user={user} onEdit={handleEditUser} />
                    <PopupModal
                      user={user}
                      onDelete={() => handleDeleteUser(user.id)}
                    />
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

export default CRUDUser;

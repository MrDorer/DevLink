import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTrigger } from "../context/TriggerContext";
import { useSnackbar } from 'notistack';

function PostForm({userId}) {
const { enqueueSnackbar } = useSnackbar()
const {trigger, setTrigger} = useTrigger()

const [publicacionError, setPublicacionError] = useState(null);
const [errorMessage, setErrorMessage] = useState("");

const allowedImageTypes = ["image/jpeg", "image/png"]; // Tipos de archivo permitidos (JPEG y PNG)
const [imagen, setImagen] = useState(null);
const [imageUrl, setImageUrl] = useState(null);

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

      const handleSubmitPublicaciones = async (e) => {
        e.preventDefault();
      
        if (!datos.contenido.trim()) {
          // Mostrar alerta de error con SweetAlert si el campo está vacío
          enqueueSnackbar('Por favor rellena los campos', { variant: 'warning' });
          return;
        }
      
        try {
          const formData = new FormData();
          formData.append("titulo", datos.titulo);
          formData.append("contenido", datos.contenido);
          formData.append("id_usuario", userId);
          formData.append("likes_publicacion", datos.likes_publicacion);
      
          // Check if imagen is present before appending to formData
          if (imagen) {
            formData.append("img", imagen);
          }
      
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
          enqueueSnackbar('Publicado correctamente', { variant: 'success' });
      
          setPublicacionError(null);
      
          setDatos({
            titulo: "",
            contenido: "",
            id_usuario: userId,
            likes_publicacion: 0,
            img: "",
          });
      
          setImageUrl(null);
        } catch (error) {
          console.error("Error al publicar:", error);
          setPublicacionError("Error al publicar la publicación.");
        }
        setImagen(null)
        setTrigger(!trigger)
      };
      

    const [datos, setDatos] = useState({
        titulo: "",
        contenido: "",
        likes_publicacion: 0,
        img: "",
      });

      
  return (
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
  )
}

export default PostForm

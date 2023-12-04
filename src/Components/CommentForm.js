import React, {useState} from 'react'
import axios from 'axios'
import Swal from "sweetalert2";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function CommentForm({userId, publicacionId}) {

    const [comentarios, setComentarios] = useState({});

    const handleChangeCom = (e, id) => {
      e.preventDefault();
      const { name, value } = e.target;
      setComentarios((prevComentarios) => ({
        ...prevComentarios,
        [id]: {
          id_publicacion: id,
          id_usuario: userId,
          comentario: value,
        },
      }));
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



  return (
    <div className="w-full">
    <form onSubmit={(e) => handleSubmitComentarios(e)}>
      <input
        className="border-2 rounded-md w-[96%] mt-2 py-2 px-2 text-sm"
        name="comentario"
        placeholder="Comentar..."
        value={comentarios.comentario}
        onChange={(e) => handleChangeCom(e, publicacionId)}
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
  )
}

export default CommentForm

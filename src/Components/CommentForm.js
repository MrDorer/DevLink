import React, {useState} from 'react'
import axios from 'axios'

import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTrigger } from '../context/TriggerContext';
import { useSnackbar } from 'notistack';


function CommentForm({ userId, publicacionId, onClick, onSubmit }) {
    const {enqueueSnackbar} = useSnackbar()
    const [comentarios, setComentarios] = useState({});
    const {trigger, setTrigger} = useTrigger()
  
    const handleChangeCom = (e, id) => {
        e.preventDefault();
        const { name, value } = e.target;
        // Trim the input value and check if it's not empty after trimming
        if (value.trim() !== "") {
          setComentarios((prevComentarios) => ({
            ...prevComentarios,
            [id]: {
              id_publicacion: id,
              id_usuario: userId,
              comentario: value,
            },
          }));
        }
      };
  
      const handleSubmitComentarios = async (e) => {
        e.preventDefault();
    
        // Verificar si no hay comentarios para enviar
        if (Object.keys(comentarios).length === 0) {
          // Mostrar alerta de error con SweetAlert si no hay comentarios
          enqueueSnackbar('Por favor, comenta antes de intentar enviar', { variant: 'warning' });
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
          enqueueSnackbar('Comentario enviado', { variant: 'success' });
    
          e.target.reset();
          setComentarios({});
          setTrigger(!trigger);
        } catch (error) {
          console.error("Error al enviar comentario:", error);
        }
      };
  
    const handleFormClick = (e) => {
      e.stopPropagation();
      if (onClick) onClick(e);
    };
  
    return (
      <div className="w-full">
        <form onClick={handleFormClick} onSubmit={(e) => handleSubmitComentarios(e)}>
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
    );
  }
  
  export default CommentForm;
  
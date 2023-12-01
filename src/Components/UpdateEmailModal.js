import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import { useSnackbar } from 'notistack';

const UpdateEmailModal = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('')

  const cerrar = () => {
    setEmail('')
    onClose()
  }

  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem('user')).id)
    // Al abrir el modal, aplicar estilos al body para ocultar la scrollbar y fijar la posición
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      // Al cerrar el modal, restaurar los estilos originales del body
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }

    return () => {
      // Restaurar los estilos del body cuando el componente se desmonte
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalEmail = email.toLowerCase().trim()
  try {
        const response = await axios.put(`http://localhost:8082/editar/email/${id}`, {finalEmail});
        if(response.status === 200){
          enqueueSnackbar('Cambiado correctamente a: ' + finalEmail, { variant: 'success' });
        } else{
          enqueueSnackbar('Email ya registrado', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error cambiando el correo:', error);
        enqueueSnackbar('Fallo al cambiar correo', { variant: 'error' });
      }
    
    
    cerrar();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Actualizar Correo"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Actualizar Correo Electrónico</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nuevo Correo:</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Actualizar
          </button>
        </form>
        <button
          onClick={cerrar}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default UpdateEmailModal;

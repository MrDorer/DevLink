import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import { useSnackbar } from 'notistack';

const EditProfileDescriptionModal = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [id, setId] = useState('')
  const [newDescription, setNewDescription] = useState('');

  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem('user')).id)
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
    } else {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    }

    return () => {
      document.body.style.overflow = 'auto';
      document.body.style.position = 'static';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const description = newDescription.trim()

    try {
      const response = await axios.put(`http://localhost:8082/editar/description/${id}`, {description});
      if(response.status === 200){
        enqueueSnackbar('Descripción cambiada correctamente', { variant: 'success' });
      } else{
        enqueueSnackbar('Algo salio mal', { variant: 'error' });
      }
    } catch (error) {
      enqueueSnackbar('Algo salio mal', { variant: 'error' });
    }

    cerrar();
  };
  const cerrar = () => {
    setNewDescription('')
    onClose()
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Descripción del Perfil"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Editar Descripción del Perfil</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nueva Descripción:</span>
            <textarea
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3 h-24 resize-none"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Actualizar Descripción del Perfil
          </button>
        </form>
        <button
          onClick={cerrar}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileDescriptionModal;

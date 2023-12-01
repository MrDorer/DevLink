import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Modal from 'react-modal';
import axios from 'axios'
import { useSnackbar } from 'notistack';

const DeactivateAccountModal = ({ isOpen, onClose }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [confirmText, setConfirmText] = useState('');
  const [id, setId] = useState('')

  const navigate = useNavigate()

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

  const handleDeactivate = async() => {
    try {
      const response = await axios.put(`http://localhost:8082/eliminar/usuario/${id}`);
      if(response.status === 200){
        enqueueSnackbar('Eliminado correctamente, fue un gusto conocerlo', { variant: 'success' });
        sessionStorage.clear()
        navigate('/')
      } else{
        enqueueSnackbar('Fallo al eliminar usuario', { variant: 'error' });
      }
    } catch (error) {
      console.error('Fallo al eliminar el usuario:', error);
      enqueueSnackbar('Fallo al eliminar usuario', { variant: 'error' });
    }
    onClose();
  };

  const cerrar = () => {
    onClose()
    setConfirmText('')
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Desactivar Cuenta"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Desactivar Cuenta</h2>
        <p className="mb-4">¿Estás seguro de que deseas desactivar tu cuenta?</p>
        <p className="mb-4">
          Esta acción eliminará todas tus publicaciones y no se podrán recuperar.
          Por favor, escribe "<strong>CONFIRMAR</strong>" para confirmar.
        </p>
        <input
          type="text"
          value={confirmText}
          onChange={(e) => setConfirmText(e.target.value)}
          className="border border-gray-300 rounded-md py-1 px-3 mb-4"
          required
        />
        <div className='h-fit flex justify-between'>        
        <button
          onClick={handleDeactivate}
          disabled={confirmText !== 'CONFIRMAR'}
          className={`bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 ${
            confirmText !== 'CONFIRMAR' && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Desactivar Cuenta
        </button>
        <button
          onClick={cerrar}
          className=" bg-gray-300 text-gray-700 py-1 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Cancelar
        </button></div>
      </div>
    </Modal>
  );
};

export default DeactivateAccountModal;

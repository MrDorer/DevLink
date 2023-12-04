import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import { useSnackbar } from 'notistack';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [id, setId] = useState('')
  const { enqueueSnackbar } = useSnackbar();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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

  const cerrar = () => {
    setNewPassword('')
    setConfirmPassword('')

    onClose()
  }

  const handleSubmit = async (e) => {
    const trimmed = newPassword.trim()
    e.preventDefault();
    if (newPassword.trim().length < 8 ) {
      enqueueSnackbar('Las contraseñas no tienen al menos 8 caracteres', { variant: 'warning' });
      return;
    }

    if (newPassword !== confirmPassword) {
      enqueueSnackbar('Las contraseñas no coinciden', { variant: 'warning' });
      return;
    }
    try {
      
      const response = await axios.put(`http://localhost:8082/editar/password/${id}`, {trimmed});
      if(response.status === 200){
        enqueueSnackbar('Contraseña cambiada correctamente', { variant: 'success' });
      } else{
        enqueueSnackbar('Fallo al cambiar contraseña', { variant: 'error' });
      }
    } catch (error) {
      console.error('Fallo al cambiar contraseña:', error);
      enqueueSnackbar('Fallo al cambiar contraseña', { variant: 'error' });
    }


    cerrar();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Cambiar Contraseña"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Cambiar Contraseña</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">

          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nueva Contraseña:</span>
            <input
              placeholder='Contraseña'
              type='password'
              name='password'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
              autoComplete="new-password"
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Confirmar Nueva Contraseña:</span>
            <input
              placeholder='Contraseña (De nuevo)'
              name='confirmPassword'
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
              autoComplete="new-password"
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Cambiar Contraseña
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

export default ChangePasswordModal;

import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      console.log("Las contraseñas no coinciden");
      return;
    }
    console.log('Contraseña actual:', currentPassword);
    console.log('Nueva contraseña:', newPassword);
    onClose();
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
            <span className="text-sm font-semibold mb-1">Contraseña Actual:</span>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nueva Contraseña:</span>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </label>
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Confirmar Nueva Contraseña:</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
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
          onClick={onClose}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Cerrar
        </button>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;

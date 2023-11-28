import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const EditGitHubUsernameModal = ({ isOpen, onClose }) => {
  const [newUsername, setNewUsername] = useState('');

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
    // Simulando el cambio de nombre de usuario en GitHub
    console.log('Nombre de usuario actualizado:', newUsername);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Nombre de Usuario en GitHub"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Editar Nombre de Usuario en GitHub</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nuevo Nombre de Usuario:</span>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border border-gray-300 rounded-md py-2 px-3"
              required
            />
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Actualizar Nombre de Usuario
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default EditGitHubUsernameModal;
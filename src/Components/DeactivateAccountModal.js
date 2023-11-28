import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const DeactivateAccountModal = ({ isOpen, onClose }) => {
  const [confirmText, setConfirmText] = useState('');

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

  const handleDeactivate = () => {
    // Lógica para desactivar la cuenta y eliminar publicaciones
    // Aquí podrías ejecutar llamadas a tu backend para realizar las operaciones necesarias
    // Por ejemplo: eliminar publicaciones asociadas a la cuenta, desactivar la cuenta, etc.
    
    // Una vez realizadas las operaciones necesarias, puedes cerrar el modal
    onClose();
  };

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
          className="border border-gray-300 rounded-md py-2 px-3 mb-4"
          required
        />
        <button
          onClick={handleDeactivate}
          disabled={confirmText !== 'CONFIRMAR'}
          className={`bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-300 ${
            confirmText !== 'CONFIRMAR' && 'opacity-50 cursor-not-allowed'
          }`}
        >
          Desactivar Cuenta
        </button>
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

export default DeactivateAccountModal;

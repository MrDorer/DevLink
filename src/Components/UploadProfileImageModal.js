import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const UploadProfileImageModal = ({ isOpen, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes enviar la imagen a un servidor, almacenarla y actualizar el perfil del usuario
    console.log('Imagen subida:', selectedImage);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Subir Imagen de Perfil"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Subir Imagen de Perfil</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label className="relative overflow-hidden">
            <span className="block py-2 px-2 rounded-md bg-gray-200 cursor-pointer mt-2 mr-4">
              Seleccionar archivo
            </span>
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {imageUrl && (
              <div className="mt-2">
                <img src={imageUrl} alt="Selected" className="max-w-full h-auto mr-4" />
              </div>
            )}
          </label>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          >
            Subir Imagen
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

export default UploadProfileImageModal;

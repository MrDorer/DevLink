import React, { useState } from 'react';

const ImageUploader = () => {
  const [imagen, setImagen] = useState(null);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
  };



  return (
    <div>
      
      
      
      <input
        type="file"
        accept="image/*"
        onChange={handleImagenChange}
      />

      
      {imagen && (
        <div>
          <img
            src={URL.createObjectURL(imagen)}
            alt="Vista previa"
            style={{ maxWidth: '300px', maxHeight: '300px' }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;

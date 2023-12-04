import React, { useEffect } from 'react';
import logoMorado from '../Assets/Logomorado.png'; // Importa la imagen

const RedirectionMessage = () => {
  useEffect(() => {
    const redirectionTimer = setTimeout(() => {
      // Simulación de redirección
      console.log('Redirigiendo...');
    }, 3000);

    return () => clearTimeout(redirectionTimer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-sans">
      <img src={logoMorado} alt="Logo Morado" className="w-32 mb-6" />
      <p className="text-center">Estás siendo redirigido...</p>
      {/* Estilos para el GIF de carga */}
      <style>
        {`
          .loader {
            border: 4px solid rgba(0, 0, 0, 0.1);
            border-top: 4px solid #8a2be2; /* Cambia el color si deseas */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
          }

          @keyframes spin {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
      {/* GIF de carga */}
      <div className="loader"></div>
    </div>
  );
};

export default RedirectionMessage;

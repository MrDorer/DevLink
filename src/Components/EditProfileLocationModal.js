import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import axios from 'axios'
import { useSnackbar } from 'notistack';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const EditProfileLocationModal = ({ isOpen, onClose }) => {
  const [id, setId] = useState('')
  const { enqueueSnackbar } = useSnackbar();
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });
  const zoom = 14;

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleSearch = () => {

    const apiKey = 'AIzaSyB9UpVf1nGiO7BMAYZTt6-e1LqahO12XFE';
    const geocodingApiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      location
    )}&key=${apiKey}`;


    fetch(geocodingApiUrl)
      .then((response) => response.json())
      .then((data) => {
        const locationData = data.results[0].geometry.location;
        setCoordinates({ lat: locationData.lat, lng: locationData.lng });
      })
      .catch((error) => {
        console.error('Error fetching coordinates:', error);
      });
  };



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

  const handleSubmit = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8082/ubicacion/${id}`, {coordinates});
      if(response.status === 200){
        enqueueSnackbar('Ubicacion cambiado correctamente', { variant: 'success' });
      } else{
        enqueueSnackbar('Fallo al cambiar ubicacion', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error cambiando el correo:', error);
      enqueueSnackbar('Fallo al cambiar ubicacion', { variant: 'error' });
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Editar Ubicación del Perfil"
      className="fixed inset-0 flex items-center justify-center z-50"
      overlayClassName="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-800"
    >
      <div className="border border-black bg-white p-8 rounded-lg w-96 relative">
        <h2 className="text-2xl font-bold mb-6">Editar Ubicación del Perfil</h2>


        <LoadScript googleMapsApiKey="AIzaSyB9UpVf1nGiO7BMAYZTt6-e1LqahO12XFE" libraries={['places']}>
          <div className='flex'>
          <label className="flex flex-col">
            <span className="text-sm font-semibold mb-1">Nueva Ubicación:</span>
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              className="border border-gray-300 rounded-md py-0.5 px-3"
              required
            />
          </label>
            <button className="bg-blue-500 text-white py-0.5 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300" onClick={handleSearch}>Search</button>
          </div>
          <GoogleMap
            mapContainerStyle={{ height: '40vh', width: '40vh' }}
            center={coordinates}
            zoom={zoom}
          >
            <Marker position={coordinates} title="My location" />
          </GoogleMap>
        </LoadScript>

        <button
          onClick={handleSubmit}
          className="mt-4 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-300"
        >
          Enviar
        </button>
      </div>
    </Modal>
  );
};

export default EditProfileLocationModal;

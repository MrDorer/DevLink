import React from 'react';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';

const MyMap = () => {
    const center = { lat: 21.13698387145996, lng: -86.85026550292969 };
    const zoom = 14;
    const markerPosition = { lat: 21.13698387145996, lng: -86.85026550292969 };
  
    return (
      <LoadScript
        googleMapsApiKey="AIzaSyB9UpVf1nGiO7BMAYZTt6-e1LqahO12XFE"
        libraries={['places']}
      >
        <GoogleMap
          mapContainerStyle={{ height: '35vh', width: '35vh' }}
          center={center}
          zoom={zoom}
        >
          <Marker position={markerPosition} title="My location" />
        </GoogleMap>
      </LoadScript>
    );
  };

  export default MyMap
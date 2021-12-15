import './App.css';
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet'
import React, { useState, useEffect } from "react";

var options = {
  positionOptions: {
      enableHighAccuracy: false,
  },
  userDecisionTimeout: 5000,
};
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function App() {
  const [latitude, setLatitude] = useState(51.505);
  const [longitude, setLongitude] = useState(-0.09);

  useEffect(() => {
    if ("geolocation" in navigator) {
      console.log("Available");

      navigator.geolocation.getCurrentPosition(position => {
        console.log(position.coords)

      setLatitude(position.coords.latitude)
      setLongitude(position.coords.longitude)

      });  
 
    } else {
      console.log("Not Available");
    }
  }, []);

  return (
      <div className="App">
        <MapContainer style={{ height: "700px"}} center={[latitude, longitude]} zoom={13} scrollWheelZoom={false}>
        <ChangeView center={[latitude, longitude]} zoom={13} /> 

<TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              We're here
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    );
}
export default App;

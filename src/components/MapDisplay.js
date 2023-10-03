import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapDisplay = (props) => {
    const { lat, lng } = props
    const position = [lat, lng]
    return (
          <div style={{height : '200px', width:'150px', marginLeft : '45%', objectFit : 'cover'}}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={position}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
                </Marker>
            </MapContainer>
          </div>
    )
}

export default MapDisplay

// import React from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

// const MapDisplay = ({ lat, lng }) => {
//   const mapStyle = {
//     width: "200px", 
//     height: "200px"
//   };

//   return (
//     <div>
//       <h2>Map Display</h2>
//       <div style={mapStyle}>
//         <MapContainer
//           center={[lat, lng]}
//           zoom={13}
//           style={{ width: "100%", height: "100%" }}
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//           />
//           <Marker position={[lat, lng]}>
//             <Popup>Your marker content here</Popup>
//           </Marker>
//         </MapContainer>
//       </div>
//     </div>
//   );
// };

// export default MapDisplay;

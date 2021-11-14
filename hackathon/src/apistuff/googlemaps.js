import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  DirectionsService,
  Polygon
} from "@react-google-maps/api";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};


const paths = [
    { lat: 25.774, lng: -80.19 },
    { lat: 18.466, lng: -66.118 },
    { lat: 32.321, lng: -64.757 },
    { lat: 25.774, lng: -80.19 }
  ]
  
  const options = {
    fillColor: "lightblue",
    fillOpacity: 1,
    strokeColor: "red",
    strokeOpacity: 1,
    strokeWeight: 2,
    clickable: false,
    draggable: false,
    editable: false,
    geodesic: false,
    zIndex: 1
  }

const onLoad = polygon => {
    console.log("polygon: ", polygon);
  }


function MyComponent() {

  return (
    <LoadScript googleMapsApiKey="AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
      <Polygon
      onLoad={onLoad}
      paths={paths}
      options={options}
    />
      </GoogleMap>
    </LoadScript>
  );
}

export default MyComponent;

import React from "react";
import {
  GoogleMap,
  LoadScript,
  DirectionsRenderer,
  Marker,
  DirectionsService,
  Polygon,
  Circle,
} from "@react-google-maps/api";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 40,
  lng: -120,
};

const cirOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 0.8,
  strokeWeight: 2,
  fillColor: "#FF0000",
  fillOpacity: 0.35,
  clickable: false,
  draggable: false,
  editable: false,
  visible: true,
  radius: 3000000,
  zIndex: 1,
};

function MyComponent() {
  const [response, setResponse] = React.useState("");
  const [value1, setValue1] = React.useState(null);
  const [value2, setValue2] = React.useState(null);
  const [destination, setDestination] = React.useState(""); //Initial state is null:)
  const [origin, setOrigin] = React.useState("");

  const handleInput1 = (e) => {
    setValue1(e.target.value);
  };

  const handleInput2 = (e) => {
    setValue2(e.target.value);
  };

  const resetInputField = () => {
    setValue1("");
    setValue2("");
    setDestination("");
    setDestination("");
  };


  function directionsCallback(response) {
    console.log(response);

    if (response !== null) {
      if (response.status === "OK") {
        setResponse(response);
      } else {
        console.log("response: ", response);
      }
    }
  }
  return (
    <>
 
        <input
        type="text"
        value={value1}
          onChange={handleInput1}
        />
        <input
        type="text"
        value={value2}
          onChange={handleInput2}
        />
        <button
          onClick={() => {
            setDestination(value1);
            setOrigin(value2);
            console.log(value1);
          }}
        >
          Route
        </button>
        <button 
        onClick={resetInputField}
          >
          Clear
        </button>
         <p>{value1 ? value1.label : "Enter a Place"}</p>
        <LoadScript googleMapsApiKey="AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {destination !== "" && origin !== "" && (
            <>
              <DirectionsService
                // required
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: "TRANSIT",
                }}
                // required
                callback={directionsCallback}
              />
              <DirectionsRenderer
                // required
                options={{
                  directions: response,
                }}
              />
              <Circle
                // required
                center={{ lat: 40, lng: 40 }}
                // required
                options={cirOptions}
              />
            </>
          )}
        </GoogleMap>
        </LoadScript>
    </>
  );
}

export default MyComponent;

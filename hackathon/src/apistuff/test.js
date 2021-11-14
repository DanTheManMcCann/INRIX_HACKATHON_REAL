import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
//I'm using this one to set up the drawing the map part


function handleClick(){
    console.log("hey");
}

function ApiButtonTwo(){
    return (
    <input>
        <GooglePlacesAutocomplete
        apiKey="AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU"
        />
    </input>
    );
}

export default ApiButtonTwo;


import { LoadScript } from '@react-google-maps/api';
import React from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
//I'm using this one to set up the drawing the map part


function handleClick(){
    console.log("hey");
}

function ApiButtonTwo(){
    const [value1, setValue1] = React.useState(null);
    const [value2, setValue2] = React.useState(null);
    return (
    <div>

        <GooglePlacesAutocomplete
        selectProps={{
          value1,
          onChange: setValue1,}}
        />
        <GooglePlacesAutocomplete
        selectProps={{
          value2,
          onChange: setValue2,}}
        />
        <button onClick={()=>{
            console.log(value1);
        }}>
            Hey
        </button>
        <p>{value1?value1.label:"Enter a Place"}</p>
    </div>
    );
}

export default ApiButtonTwo;


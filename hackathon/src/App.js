import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiButton from './apistuff/ApiButton';
import ApiButtonTwo from './apistuff/test';
import GoogleMapTwo from './apistuff/googlemaps';

import MyComponent from './components/directions';
import { LoadScript } from '@react-google-maps/api';

function handleClick(){
  console.log("ahh");
}

function App() {

  return (
    <div className="App">
      <button onClick={handleClick}>Hello </button>
      <p>TEst</p>
      <ApiButton></ApiButton>
      {/* <MyComponent></MyComponent> */}
    </div>
  );

}

export default App;

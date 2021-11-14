import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiButton from './apistuff/ApiButton';
import ApiButtonTwo from './apistuff/test';
import GoogleMapTwo from './apistuff/googlemaps';

import MyComponent from './components/directions';
import { LoadScript } from '@react-google-maps/api';
import NavigationBar from './components/navigationbar';
import { Statistics, Purpose, AboutUs, Partners } from './components/restofthepage';

function handleClick(){
  console.log("ahh");
}

function App() {

  return (
    <div className="App">
    <NavigationBar></NavigationBar>
    <p> Calculate Public Transportation</p>
      {/* <ApiButton></ApiButton> */}
      <MyComponent></MyComponent>
    <Statistics></Statistics>
    <Purpose></Purpose>
    <AboutUs></AboutUs>
    <Partners></Partners>
    </div>
  );

}

export default App;

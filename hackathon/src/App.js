import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiButton from './apistuff/ApiButton';
import ApiButtonTwo from './apistuff/test';

function handleClick(){
  console.log("ahh");
}

function App() {

  return (

    <div className="App">
      <button onClick={handleClick}>Hello </button>
      <p>TEst</p>
      <ApiButtonTwo></ApiButtonTwo>
    </div>
  );
}

export default App;

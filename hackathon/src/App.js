import React from 'react';
import logo from './logo.svg';
import './App.css';
import ApiButton from './apistuff/ApiButton';

function handleClick(){
  console.log("ahh");
}

function App() {

  return (

    <div className="App">
      <button onClick={handleClick}>Hello </button>
      <p>TEst</p>
      <ApiButton></ApiButton>
    </div>
  );
}

export default App;

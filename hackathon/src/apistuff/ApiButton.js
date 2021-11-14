import React from 'react';
import { AST_SymbolExport } from 'terser';
//This is API Folder

async function tokenrequest(){
    const response = await fetch("https://api.iq.inrix.com/auth/v1/appToken?appId=lrzpgru190&hashToken=bHJ6cGdydTE5MHxiT1I3MGY2cmVONW1Dd2k4SmlIcjA1dXd4d2ZSTWlmdTMxd3pUb05M");
    const json = await response.json();
    const Token1=json.result.token;
    return Token1
}

async function geoCode(addressGiven){
    if (addressGiven){
    const addressCrazy = encodeURIComponent(addressGiven.trim());
    const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=" + addressCrazy + "&key=AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU");
    const json = await response.json();
    const Address=json;
    console.log(Address);
    return Address;
    }
}


function ApiButton() {
    const [input, setInput] = React.useState('');
    const [input2, setInput2] = React.useState('');
    const addressGiven=input;
    const addressGivenTwo=input2;

    async function handleClick(){

        //get api token for inrix
        const token1= await tokenrequest(); //have to use a fuckton of awaits
        // console.log(token1);
    
        const address = await geoCode(addressGiven);
        const addressbrokendown=address.results['0'].geometry.location;
        console.log(addressbrokendown.lat);
        console.log(addressbrokendown.lng);

        const address2 = await geoCode(addressGivenTwo);
        const address2brokendown=address2.results['0'].geometry.location;
        console.log(address2brokendown.lat);
        console.log(address2brokendown.lng);
    
    }   

  return (
      <>
        <input placeholder="destination" value={input} onInput={e => setInput(e.target.value)}/>
        <input placeholder="current location" value={input2} onInput={e => setInput2(e.target.value)}/>
        <button onClick={handleClick}>Route </button>
        <p>{input2}</p>
      </>
  );
}

export default ApiButton;
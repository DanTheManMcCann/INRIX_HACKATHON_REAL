import React from 'react';
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

async function googleDir(destination, origin){
    const response= await fetch("https://maps.googleapis.com/maps/api/directions/json?destination=place_id:"+ destination +"&origin=place_id:"+ origin + "&mode=transit&key=AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU");
    const json = await response.json();
    console.log(json.result);
    return json;
}

async function onStreet(lat,lng, token){
    const response= await fetch("https://api.iq.inrix.com/blocks/v3?point=" + lat + "%7C" + lng + "&radius=100&accessToken="+token);
    const json = await response.json();
    console.log(json.result);
    return json;
}


function ApiButton() {
    const [input, setInput] = React.useState('');
    const [input2, setInput2] = React.useState('');
    const addressGiven=input;
    const addressGivenTwo=input2;

    async function handleClick(){

        //get api token for inrix
        const token1= await tokenrequest(); //have to use a fuckton of awaits
        console.log(token1);
    
        const address = await geoCode(addressGiven);
        const addressbrokendown=address.results['0'].geometry.location;
        console.log(addressbrokendown.lat);
        console.log(addressbrokendown.lng);

        const address2 = await geoCode(addressGivenTwo);
        const address2brokendown=address2.results['0'].geometry.location;
        console.log(address2brokendown.lat);
        console.log(address2brokendown.lng);

        const parking = await onStreet(address2brokendown.lat, address2brokendown.lng, token1);

        const transitDir = await googleDir("ChIJIQBpAG2ahYAR_6128GcTUEo", "ChIJk8EIXIG3j4ARwL_Ao3ykdeQ");
        console.log("transit");
        console.log(transitDir);
    
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
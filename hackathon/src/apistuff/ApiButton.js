import React from 'react';
//This is API Folder

async function tokenrequest(){
    const response = await fetch("https://api.iq.inrix.com/auth/v1/appToken?appId=lrzpgru190&hashToken=bHJ6cGdydTE5MHxiT1I3MGY2cmVONW1Dd2k4SmlIcjA1dXd4d2ZSTWlmdTMxd3pUb05M");
    const json = await response.json();
    const Token1=json.result.token;
    return Token1
}

async function geoCode(){

    const response = await fetch("https://maps.googleapis.com/maps/api/geocode/json?address=24%20Sussex%20Drive%20Ottawa%20ON&key=AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU");
    const json = await response.json();
    const Address=json;
    console.log(Address);
    return Address;
}







function ApiButton() {
    const [input, setInput] = React.useState('');

    async function handleClick(input){

        //get api token for inrix
        const token1= await tokenrequest(); //have to use a fuckton of awaits
        // console.log(token1);
    
        const address = await geoCode();
        const address2=address.results['0'].geometry.location;
        console.log(address2.lat);
        console.log(address2.lng);
        // for (const variable in address2){
        //     console.log(variable);
        //     console.log("SPace");
        // }
        console.log(input)
        
    
    }   

  return (
      <>
      <input value={input} onInput={e => setInput(e.target.value)}/>
      <button onClick={handleClick}>Hello </button>
      </>
  );
}

export default ApiButton;
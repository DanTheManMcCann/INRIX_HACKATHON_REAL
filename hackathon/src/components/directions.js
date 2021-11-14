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

//define api function
async function tokenrequest() {
  const response = await fetch(
    "https://api.iq.inrix.com/auth/v1/appToken?appId=lrzpgru190&hashToken=bHJ6cGdydTE5MHxiT1I3MGY2cmVONW1Dd2k4SmlIcjA1dXd4d2ZSTWlmdTMxd3pUb05M"
  );
  const json = await response.json();
  const Token1 = json.result.token;
  return Token1;
}

async function geoCode(addressGiven) {
  if (addressGiven) {
    const addressCrazy = encodeURIComponent(addressGiven.trim());
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        addressCrazy +
        "&key=AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU"
    );
    const json = await response.json();
    const Address = json;
    console.log(Address);
    return Address;
  }
}

async function findRoute(origin, destination, accessToken) {
  const response = await fetch(
    "https://api.iq.inrix.com/findRoute?wp_1=" +
      origin.lat +
      "," +
      origin.lng +
      "&wp_2=" +
      destination.lat +
      "," +
      destination.lng +
      "&maxAlternates=2&useTraffic=true&isAmbiguousOrigin=true&format=json&accessToken=" +
      accessToken
  );
  const json = await response.json();
  return json;
}

async function routeInfo(routeID, accessToken) {
  const response = await fetch(
    "https://api.iq.inrix.com/route?routeId=" +
      routeID +
      "&format=json&accessToken=" +
      accessToken
  );
  const json = await response.json();
  return json;
}

async function onStreet(loc, radius, token) {
  const response = await fetch(
    "https://api.iq.inrix.com/blocks/v3?point=" +
      loc.lat +
      "%7C" +
      loc.lng +
      "&radius=" +
      radius +
      "&accessToken=" +
      token
  );
  const json = await response.json();
  return json;
}

async function fetchLotParking(loc, radius, token) {
  const response = await fetch(
    "https://api.iq.inrix.com/lots/v3?point=" +
      loc.lat +
      "%7C" +
      loc.lng +
      "&radius=" +
      radius +
      "&accessToken=" +
      token
  );
  const json = await response.json();
  return json;
}

async function googleDir(destination, origin) {
  const response = await fetch(
    "https://maps.googleapis.com/maps/api/directions/json?destination=place_id:" +
      destination +
      "&origin=place_id:" +
      origin +
      "&mode=transit&key=AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU"
  );
  const json = await response.json();
  console.log(json.result);
  return json;
}

//----------------------

const containerStyle = {
  width: "400px",
  height: "400px",
  margin:'auto'
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

let cost, distance, timeDaniel;

function MyComponent() {
  const [response, setResponse] = React.useState("");
  const [value1, setValue1] = React.useState("");
  const [value2, setValue2] = React.useState("");
  const [destination, setDestination] = React.useState("");
  const [origin, setOrigin] = React.useState("");
  const [error, setError] = React.useState("");

  const [routeDist, setRdist] = React.useState('');
  const [routeTravelTime, setRTT] = React.useState('');
  const [routeSummary, setRSUM] = React.useState('');


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
    setOrigin("");
  };

  async function handleClick() {
    //get api token for inrix
    const token1 = await tokenrequest(); //have to use a fuckton of awaits
    console.log(token1);

    const address = await geoCode(value1);
    const addressbrokendown = address.results["0"].geometry.location;
    console.log(addressbrokendown.lat);
    console.log(addressbrokendown.lng);

    const address2 = await geoCode(value2);
    const address2brokendown = address2.results["0"].geometry.location;
    console.log(address2brokendown.lat);
    console.log(address2brokendown.lng);

    const parking = await onStreet(
      address2brokendown.lat,
      address2brokendown.lng,
      token1
    );
    const transitDir = await googleDir(
      "ChIJs62M-xukj4ARHw5rfMCOzpQ",
      "ChIJd_S-m6QyjoARhaOxXL3rZUU"
    );
    console.log("transit");
    console.log(transitDir);
    const parsedtransit = transitDir.routes["0"];
    cost = parseFloat(parsedtransit.fare.text.substring(1));
    const pt = parsedtransit.legs["0"].distance.text;
    distance = parseFloat(pt.substring(0, pt.indexOf(" ")));

    const pt2 = parsedtransit.legs["0"].duration.text.split(" "); // all this code is used for converting from written date to numbers
    let i,
      count = 0;
    for (i = 0; i < pt2.length; i += 2) {
      //incrememnt by two
      if (pt2[i + 1] == "day") {
        count += parseInt(pt2[i]) * 1440;
      } else if (pt[i + 1] == "hour" && pt[i + 1] == "hours") {
        count += parseInt(pt2[i]) * 60;
      } else {
        count += parseInt(pt2[i]);
      }
    }
    timeDaniel = count;

    const d = new Date();
    let day = d.getDay();
    let time = d.getHours() + ":" + d.getMinutes();
    if (day == 0) {
      day = 7;
    }

 
    //google API request for point of origin (from a given address)
    const addressDev = await geoCode(value2);
    const addressDestGeoLoc = addressDev.results["0"].geometry.location;

    //google API request for point of destination (from a given address)
    const address2Dev = await geoCode(value1);
    const addressOrigGeoLoc = address2Dev.results["0"].geometry.location;

    //INRIX API request to find a route from destination to origin
    const route = await findRoute(addressOrigGeoLoc, addressDestGeoLoc, token1);
    //console.log(route);
    let routeID = route.result.trip.tripId;

    //API request for route info
    const rInfo = await routeInfo(routeID, token1);
    //console.log(rInfo.result.trip.routes[0]);

    let streetParking;
    let parkingAvgCost = 0;
    let parkingCostArray = [];
    let parkAvailProbAvg = 0;
    let avprArr = [];
    let numAPA = 0;
    let radius = 50;
    while (parkAvailProbAvg < 90) {
      avprArr = [];
      parkingCostArray = [];
      numAPA = 0;
      streetParking = await onStreet(addressDestGeoLoc, radius, token1);
      for (let i = 0; i < streetParking.result.length; i++) {
        if (streetParking.result[i].probability != null) {
          avprArr.push(1 - streetParking.result[i].probability / 100);
          numAPA++;
          for (let j = 0; j < streetParking.result[i].segments.length; j++) {
            if (streetParking.result[i].segments[j].isOpen == true) {
              for (
                let k = 0;
                k < streetParking.result[i].segments[j].structuredRates.length;
                k++
              ) {
                if (
                  (streetParking.result[i].segments[j].structuredRates[k]
                    .dow_start <= day &&
                    streetParking.result[i].segments[j].structuredRates[k]
                      .dow_end >= day &&
                    typeof streetParking.result[i].segments[j].structuredRates[
                      k
                    ].time_in == "undefined") ||
                  (streetParking.result[i].segments[j].structuredRates[k]
                    .dow_start <= day &&
                    streetParking.result[i].segments[j].structuredRates[k]
                      .dow_end >= day &&
                    parseInt(time) >=
                      parseInt(
                        streetParking.result[i].segments[j].structuredRates[
                          k
                        ].time_in.split("-")[0]
                      ) &&
                    parseInt(time) <
                      parseInt(
                        streetParking.result[i].segments[j].structuredRates[
                          k
                        ].time_in.split("-")[1]
                      ))
                ) {
                  parkingCostArray.push(
                    streetParking.result[i].segments[j].structuredRates[k].rate
                  );
                }
              }
            }
          }
        }
      }
      avprArr.push(1);
      //console.log(numAPA);

      for (let i = 0; i < numAPA; i++) {
        avprArr[numAPA] = avprArr[numAPA] * avprArr[i];
        //console.log(avprArr[numAPA]);
      }

      parkAvailProbAvg = (1 - avprArr[numAPA]) * 100;

      if (parkAvailProbAvg < 90) {
        //console.log("YOOO");
        radius = radius + 50;
      }
    }

    for (let i = 0; i < parkingCostArray.length; i++) {
      parkingAvgCost += parkingCostArray[i];
    }
    parkingAvgCost = parkingAvgCost / parkingCostArray.length;
    //console.log(streetParking);
    console.log(
      parkAvailProbAvg +
        "% chance to find parking within a " +
        radius +
        " meter radius"
    );
    console.log(
      "Average per hour cost of street parking: " + parkingAvgCost + "$"
    );

    const lotParking = await fetchLotParking(addressDestGeoLoc, radius, token1);
    //console.log(lotParking);

    console.log(rInfo.result.trip.routes[0]);

    //set variables to new variables to plot on graph
    setRdist(rInfo.result.trip.routes[0].totalDistance);
    setRTT(rInfo.result.trip.routes[0].travelTimeMinutes);
    setRSUM(rInfo.result.trip.routes[0].summary.text);
    setDestination(value1);
    setOrigin(value2);
  }

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
        placeholder="current location"
        type="text"
        value={value1}
        onChange={handleInput1}
      />
      <input
        placeholder="destination"
        type="text"
        value={value2}
        onChange={handleInput2}
      />
      <button onClick={handleClick}>Route</button>
      <button onClick={resetInputField}>Clear</button>
      <p>
        {"From " +
          (value1 ? value1 : "current location") +
          " to " +
          (value2 ? value2 : "destination")}
      </p>

      <LoadScript googleMapsApiKey="AIzaSyCrxWO6tk28BtEckg7dG9XwvBpwWliynsU">
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={10}>
          {destination !== "" && origin !== "" && (
            <>
              <DirectionsService
                // required
                options={{
                  destination: destination,
                  origin: origin,
                  travelMode: "DRIVING",
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
      {cost && <p>Cost :{cost}</p>}
      {distance && <p>Distance :{distance}</p>}
      {timeDaniel && <p>Time :{timeDaniel}</p>}

      {routeDist&& <p>car total distance :{routeDist}</p>}
      {routeTravelTime&& <p>car total time:{routeTravelTime}</p>}
      {routeSummary&& <p>car summary :{routeSummary}</p>}
    </>
  );
}

export default MyComponent;

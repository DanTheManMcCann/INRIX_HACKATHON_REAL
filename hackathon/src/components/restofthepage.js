import "./statistics.css";
import inrix from "../assets/INRIX_Logo.jpg";
import daniel from "../assets/professional.jpeg"
import reactimg from "../assets/reactlogo.png"
import googlelogo from "../assets/googlelogo.jpg"

function Statistics() {
  return (
    <div id="statistics" className="stats-main" style={{marginTop:"40px"}}>
      <header>Statistics</header>
      <div className="stats.container">
      <ul>
        <li> Taking public transportation reduces the risk of being in an accident by around 90%</li>
        <li> For every $1 invested in public transportation ~ $4 is generated in economic returns</li>
        <li> 85% of the greenhouse gas emissions from transportation are from day-to-day commutes</li>
        <li> Unfortunately, only 45% of Americans have access to public transportation</li>
      </ul>
      </div>
    </div>
  );
}

function Purpose() {
  return (
    <div id ="purpose" className="purpose-main">
      <div className="inner">
        <header style={{marginBottom:"20px", marginTop:"20px"}}>Our Purpose</header>
        <div style= {{width:'70%', margin:"auto",marginBottom:"20px"}} >We created this app to show the potential benefits of taking public transportation.
        We hope our platform could be used to make a difference</div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div id="about-us" className="about-us-main">
      <div className="inner">
        <header style={{marginBottom:"40px"}}>About Us</header>
        <p>We are two Engineering Majors @ Santa Clara University</p>
        <div className="container">
          {/* <div className="card-one">
            <img src={daniel} />
            <header>Daniel</header>
            <div>General Engineering Major, Front-End/UI</div>
          </div>
          <div className="card-one">
            <img src={inrix} />
            <div>This is a basic card. What happens if it goes on for longer than oyu would think</div>
          </div> */}
        </div>
      </div>
    </div>
  );
}

function Partners() {
  return (
    <div id="partners" className="partners-main">
      <div className="inner">
        <header style={{marginTop:"40px"}} >Partners</header>
        <div className="partners-container">

          <a href="https://inrix.com/">
            <div className="card-two">
            <img src={inrix} />
            <div style={{padding: "10 10 10 10"}}>INRIX - Our main (and most important) partner! </div>
            </div>
          </a>
          <a href="https://reactjs.org">
          <div className="card-two" id="card-special">
            <img src={reactimg} />
            <div style={{padding: "10 10 10 10"}} >React JS - Main platform used for this project</div>
          </div>
          </a>
          
          <a href="https://cloud.google.com/apis/docs/overview">
          <div className="card-two">
            <img src={googlelogo} />
            <div style={{padding: "10 10 10 10"}} >Google API - Used for visualizing routes & parking on a map</div>
          </div>
          </a>
        </div>
      </div>
    </div>
  );
}

export { Statistics, Purpose, AboutUs, Partners };

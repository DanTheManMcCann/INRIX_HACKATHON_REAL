import "./statistics.css";
import inrix from "../assets/INRIX_Logo.jpg";
import daniel from "../assets/professional.jpeg"

function Statistics() {
  return (
    <div id="statistics" className="stats-main">
      <header>Statistics</header>
      <div>oy</div>
      <div className="stats.container">
        <p> STATISTIC ONE</p>
        <p> STATISTIC ONE</p>
        <p> STATISTIC ONE</p>
        <p> STATISTIC ONE</p>
      </div>
    </div>
  );
}

function Purpose() {
  return (
    <div id ="purpose" className="purpose-main">
      <div className="inner">
        <header>Our Purpose</header>
        <div>Heyy</div>
      </div>
    </div>
  );
}

function AboutUs() {
  return (
    <div id="about-us" className="about-us-main">
      <div className="inner">
        <header>About Us</header>
        <div>We are both Engineering Majors @ SCU</div>
        <div className="container">
          <div className="card-one">
            <img src={daniel} />
            <header>Daniel</header>
            <div>General Engineering Major, Front-End/UI</div>
          </div>
          <div className="card-one">
            <img src={inrix} />
            <div>This is a basic card. What happens if it goes on for longer than oyu would think</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Partners() {
  return (
    <div id="partners" className="partners-main">
      <div className="inner">
        <header>Partners</header>
        <div className="partners-container">
          <div className="card-two">
            <img src={inrix} />
            <div>This is a basic card</div>
          </div>
          <div className="card-two"></div>
          <div className="card-two"></div>
        </div>
      </div>
    </div>
  );
}

export { Statistics, Purpose, AboutUs, Partners };

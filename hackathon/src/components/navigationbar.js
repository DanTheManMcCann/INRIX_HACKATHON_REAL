import './navigationbar.css'

function NavigationBar(){

    return(
        <div className="nav-main">
            <div className="nav-inner">
                <a href="#statistics" id="firstnav">Statistics</a>
                <a href="#purpose">Our Purpose</a>
                <a href="#publix" id="big">Publix</a>
                <a href="#about-us">About Us</a>
                <a href="#partners" id="lastnav">Partners</a>
            </div>
        </div>
    );
}

export default NavigationBar;

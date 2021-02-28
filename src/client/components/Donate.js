import React from 'react';
import NavBar from './NavBar';
import '../styles/forum.css';

class Donate extends React.Component{
  constructor() {
    super();
    this.state = {
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  navHighlight() {
    let navItems = Array.from(document.getElementsByClassName("nav-link"));
    navItems.forEach((item, i) => {
      navItems[i].classList.remove("active")
    });
    navItems[3].classList.add("active")
  }

  componentDidMount() {
    this.navHighlight();
  }

  render() {
    return (
      <div>
        <NavBar />
      <section className="page-section portfolio" id="portfolio">
          <div className="container">

              <h2 className="page-section-heading text-center text-uppercase text-secondary mb-0" style={{position:"relative", top:"30px", fontSize:"45px"}}>Donate</h2>

              <div className="divider-custom">
                  <div className="divider-custom-line"></div>
                  <div className="divider-custom-icon"><i className="fas fa-star"></i></div>
                  <div className="divider-custom-line"></div>
              </div>

              <div className="row justify-content-center" style={{position:"relative", top:"100px"}}>


                  <div  className="col-md-6 col-lg-4 mb-5">
                      <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
                          <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://www.cftexas.org/community-impact/disaster-relief-and-recovery/north-texas-winter-weather-crisis-relief-fund" target="_blank">
                            <img className="img-fluid" src={require("../../../public/cftexas.png")} alt="" style={{height: "270px"}}/>
                          </a>
                      </div>
                  </div>


                  <div className="col-md-6 col-lg-4 mb-5">
                      <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal2">
                          <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://onestarfoundation.org/rebuildtx/" target="_blank">
                            <img id="onestar" className="img-fluid" src={require("../../../public/onestar.png")} style={{position: "absolute", top: "80px"}} />
                          </a>
                      </div>
                  </div>

                  <div className="col-md-6 col-lg-4 mb-5 mb-lg-0">
                      <div className="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal4">
                          <div className="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div className="portfolio-item-caption-content text-center text-white"><i className="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://spiritofgiving.tamu.edu/o/texas-am-university/i/spirit-of-giving/s/winter-storm-student-aid" target="_blank">
                            <img className="img-fluid" src={require("../../../public/cftb.png")}alt="" style={{height:"210px", position:"absolute", left:"100px", top:"25px"}}/>
                          </a>
                      </div>
                  </div>

              </div>
          </div>
      </section>
      </div>
    )
  }
}

export default Donate;

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
      <section class="page-section portfolio" id="portfolio">
          <div class="container">

              <h2 class="page-section-heading text-center text-uppercase text-secondary mb-0" style={{position:"relative", top:"30px", fontSize:"45px"}}>Donate</h2>

              <div class="divider-custom">
                  <div class="divider-custom-line"></div>
                  <div class="divider-custom-icon"><i class="fas fa-star"></i></div>
                  <div class="divider-custom-line"></div>
              </div>

              <div class="row justify-content-center" style={{position:"relative", top:"100px"}}>


                  <div  class="col-md-6 col-lg-4 mb-5">
                      <div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal1">
                          <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://www.cftexas.org/community-impact/disaster-relief-and-recovery/north-texas-winter-weather-crisis-relief-fund" target="_blank">
                            <img class="img-fluid" src={require("../../../public/cftexas.png")} alt="" style={{height: "270px"}}/>
                          </a>
                      </div>
                  </div>


                  <div class="col-md-6 col-lg-4 mb-5">
                      <div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal2">
                          <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://onestarfoundation.org/rebuildtx/" target="_blank">
                            <img id="onestar" class="img-fluid" src={require("../../../public/onestar.png")} style={{position: "absolute", top: "80px"}} />
                          </a>
                      </div>
                  </div>

                  <div class="col-md-6 col-lg-4 mb-5 mb-lg-0">
                      <div class="portfolio-item mx-auto" data-toggle="modal" data-target="#portfolioModal4">
                          <div class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100">
                              <div class="portfolio-item-caption-content text-center text-white"><i class="fas fa-plus fa-3x"></i></div>
                          </div>
                          <a href="https://secure3.convio.net/cafbtx/site/Donation2;jsessionid=00000000.app30130a?idb=752922375&df_id=19661&mfc_pref=T&19661.donation=form1&NONCE_TOKEN=F7CF073193F494C0D53A16EE367C367D&19661_donation=form1" target="_blank">
                            <img class="img-fluid" src={require("../../../public/ctfb.png")}alt="" style={{height:"270px", position:"absolute", left:"100px"}}/>
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

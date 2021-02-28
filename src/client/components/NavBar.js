import React from 'react';


class NavBar extends React.Component{
  constructor() {
    super();
    this.state = {
    }
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
  }

  render() {
    return (

      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
        <a class="navbar-brand" href="#">
          <img id="icon" src="https://i.pinimg.com/originals/10/72/6d/10726d034df958401052b875246700bb.png" alt="" width="30" height="24"/>
        </a>
          <a className="navbar-brand" href="#">Texas Relief</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/map">Map</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/news">News</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/forums">Forums</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/donate">Donate</a>
              </li>
            </ul>
          </div>
        </div>
    </nav>

    )
  }
}

export default NavBar;

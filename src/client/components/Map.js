import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import NavBar from './NavBar';

class Map extends React.Component{
  constructor() {
    super();
    this.state = {
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  cancel() {
    this.removeMarker();
    this.closeModal();
  }

  removeMarker() {
    this.marker.setMap(null);
  }

  addMarker(props) {
    //console.log(props.coords.lat(), props.coords.lng());
    this.marker = new google.maps.Marker({
      position:props.coords,
      map: props.map
    })

    if(props.iconImage) {
      var icon = {
      url: props.iconImage, // url
      scaledSize: new google.maps.Size(25, 25), // scaled size
    }
      this.marker.setIcon(icon);
    }

    if(props.content) {
      var infoWindow = new google.maps.infoWindow({
        content:props.content
      });
    }
  }

  closeModal() {
    const modal = document.getElementById("save-changes-modal");
    modal.style.display = "none";
    // remove current marker from state
    this.marker = null;
  }

  displayModal() {
    const modal = document.getElementById("save-changes-modal");
    modal.style.display = "block";
  }

  dummyData(map) {
    this.addMarker({map: map, coords: { lat: 30 , lng: -102 }, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 30, lng:-100}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 31.7, lng:-100.6}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 30.7, lng:-96.7}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 30, lng:-100}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 30, lng:-96.4}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 29.4, lng:-98.5}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 30, lng:-100}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 29.3, lng:-98.4}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 29.2, lng:-98.6}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 29, lng:-98}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 28.9, lng:-99}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
    this.addMarker({map: map, coords: { lat: 28.5, lng:-98.5}, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
  }

  initMap() {
    const loader = new Loader({
      apiKey: "AIzaSyC4I14f8zgGfHuMQsTucEkPUBH7emuJtv0",
      version: "weekly",
    });
    loader.load().then(() => {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31, lng: -100.000000 },
        zoom: 6.5,
      });

      this.createLegend(map);

      this.dummyData(map);

      google.maps.event.addListener(map, 'click',
       (event) => {
        //add marker
        this.addMarker({map: map, coords:event.latLng, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
        this.displayModal();
      });

    });
  }

  createLegend(map) {
    const legend = document.getElementById("legend");
    const name = "Power Outage";
    const icon = "https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png";
    const div = document.createElement("div");
    div.innerHTML = '<img id="legendImg" src="' + icon + '"> ' + name;
    legend.appendChild(div);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legend);
  }

  componentDidMount() {
    document.getElementById("minimize").addEventListener("click", this.cancel);
    document.getElementById("cancel-modal").addEventListener("click", this.cancel);
    document.getElementById("save-modal").addEventListener("click", this.closeModal);
    this.initMap();
  }

  render() {
    return (
      <div>
      <NavBar/>

          <div id="map"></div>
          <div id="legend"><p id="legendTitle">Legend</p></div>

          <div id="save-changes-modal" className="modal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Save Changes</h5>
                  <button id="minimize" type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                  <p>You just added a marker, would you like to save these changes?</p>
                </div>
                <div className="modal-footer">
                  <button id="cancel-modal" type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button id="save-modal" type="button" className="btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

      </div>
    )
  }
}

export default Map;

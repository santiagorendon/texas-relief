import React from 'react';
import '../App.css';
import { Loader } from "@googlemaps/js-api-loader";


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
    this.marker = new google.maps.Marker({
      position:props.coords,
      map: props.map
    })

    if(props.iconImage) {
      marker.setIcon(props.iconImage);
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

  initMap() {
    const loader = new Loader({
      apiKey: "",
      version: "weekly",
    });
    loader.load().then(() => {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31, lng: -100.000000 },
        zoom: 5.5,
      });

      google.maps.event.addListener(map, 'click',
       (event) => {
        //add marker
        this.addMarker({map: map, coords:event.latLng});
        this.displayModal();
      });

    });
  }

  componentDidMount() {
    document.getElementById("minimize").addEventListener("click", this.cancel);
    document.getElementById("cancel-modal").addEventListener("click", this.cancel);
    document.getElementById("save-modal").addEventListener("click", this.closeModal);
    this.initMap();
  }

  render() {
    return (
      <div className="container">
        <div id="map"></div>


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

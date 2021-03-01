import React from 'react';
import { Loader } from "@googlemaps/js-api-loader";
import NavBar from './NavBar';
import "../styles/maps.css"

class Map extends React.Component{
  constructor() {
    super();
    this.state = {
    }
    this.componentDidMount = this.componentDidMount.bind(this);
    this.addMarker = this.addMarker.bind(this);
    this.removeMarker = this.removeMarker.bind(this);
    this.saveMarker = this.saveMarker.bind(this);
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

  saveMarker() {
    fetch('/api/create-marker', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `lat=${this.marker.position.lat()}&lng=${this.marker.position.lng()}`
    })
    .then(function(response) {
      return response.json();
    });
    this.closeModal();
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

  fetchMarkers(map) {
    fetch('/api/get-markers')
    .then((response) =>{
      return response.json();
    })
    .then((data) =>{
      data.forEach((item, i) => {
        this.addMarker({map: map, coords: { lat: item.lat , lng: item.lng }, iconImage: 'https://www.rooseveltppd.com/sites/rooseveltppd/files/icons/icons8-voltage-480.png'});
      });

    });
  }

  createSearchBar(map) {
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();

      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );

        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  }

  initMap() {
    const loader = new Loader({
      apiKey: "AIzaSyC4I14f8zgGfHuMQsTucEkPUBH7emuJtv0",
      version: "weekly",
      libraries: ["places"]
    });
    loader.load().then(() => {
      let map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 31, lng: -100.000000 },
        zoom: 6.5,
      });

      this.createSearchBar(map);


      this.createLegend(map);

      this.fetchMarkers(map);

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
    document.getElementById("save-modal").addEventListener("click", this.saveMarker);
    this.initMap();
  }

  render() {
    return (
      <div>
      <NavBar/>


      <input
  id="pac-input"
  class="controls"
  type="text"
  placeholder="Search Location" style={{position: "absolute", left: "550px!imporant"}}
/>

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

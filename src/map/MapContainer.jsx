import React, { Component } from "react";
import { constants } from "./constants";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  onMarkerClick = (props, marker, e) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  render() {
    if (!this.props.google) {
      return <div>Loading...</div>;
    }

    return (
        <Map 
          google={this.props.google} 
          zoom={14} 
          initialCenter={{
            lat: `44.5024643`,
            lng: `1.1375074`
          }}>
          {
            this.props.places
            .map((place, i) => {
                return (
                  <Marker 
                    key={i} 
                    onClick={this.onMarkerClick}
                    name={place.name} 
                    position={{lat: place.location.lat, lng: place.location.lng}} />
                )
            })
          }
          <InfoWindow
                marker={this.state.activeMarker}
                visible={this.state.showingInfoWindow}>
              <div>
                <h1>{this.state.selectedPlace.name}</h1>
              </div>
            </InfoWindow>
        </Map>
    );
  }
}
export default GoogleApiWrapper({
  apiKey: constants.googleKey,
})(MapContainer);

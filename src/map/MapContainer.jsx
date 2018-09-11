import React, { Component } from "react";
import { constants } from "./constants";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markerRefs: {},
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({ data: nextProps.data });
    if(
      nextProps.clickedPlace 
      && this.props.clickedPlace 
      && this.props.clickedPlace.id !== nextProps.clickedPlace.id
    ) {
      const {marker, props }= this.state.markerRefs[this.props.clickedPlace.id]
      if(marker){
        debugger
        this.onMarkerClick(props, marker)
      }
    }
    console.log(`componentWillReceiveProps: `, nextProps);
  }

  onMarkerClick = (props, marker) => {
    console.log(`onMarkerClick: `, marker );
    console.log(`onMarkerClick: `, props);
    this.setState({
      ...this.state,
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
                  // ref={marker => {
                  //   if(marker)
                  //     this.state.markerRefs[place.id] = {marker, props: marker.props}
                  // }}
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

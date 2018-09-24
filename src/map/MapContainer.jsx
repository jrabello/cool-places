import React, { Component } from "react";
import { constants } from "./constants";
// import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { GoogleMap, Marker } from "react-google-maps"

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

  onMarkerClick = (props, marker) => {
    console.log(`onMarkerClick marker: `, marker );
    console.log(`onMarkerClick props: `, props);
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
      <div></div>
        // <Map 
        //   google={this.props.google} 
        //   zoom={14} 
        //   initialCenter={{
        //     lat: `44.5024643`,
        //     lng: `1.1375074`
        //   }}>
        //   {
        //     this.props.places
        //     .map((place, i) => {
        //         return (
        //           // ref={marker => {
        //           //   if(marker)
        //           //     this.state.markerRefs[place.id] = {marker, props: marker.props}
        //           // }}
        //           <Marker 
        //             key={i}
        //             onClick={this.onMarkerClick}
        //             name={place.name} 
        //             position={{lat: place.location.lat, lng: place.location.lng}} />
        //         )
        //     })
        //   }
        //   {/* marker={this.state.activeMarker} */}
        //   <InfoWindow
        //     visible={this.state.showingInfoWindow}>
        //       <div>
        //         <h1>{this.state.selectedPlace.name}</h1>
        //       </div>
        //     </InfoWindow>
        // </Map>
    );
  }
}
// export default GoogleApiWrapper({
//   apiKey: constants.googleKey,
// })(MapContainer);

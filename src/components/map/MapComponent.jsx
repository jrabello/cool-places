import React from "react"
import './MapComponent.css'

import { compose, withProps } from "recompose"
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
} from "react-google-maps"
import { constants } from "../../models/constants";
import { MarkerComponent } from "./MarkerComponent";

const MyMapComponent = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${
      constants.googleKey
    }&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100vh` }} />,
    containerElement: <div style={{ height: `100vh`, width: `100vw` }} />,
    mapElement: <div style={{ height: `100vh` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ 
      lat: constants.places[0].location.lat, 
      lng: constants.places[0].location.lng
    }}>
    {
      props.isMarkerShown
      && props.places
      .map((place, i) => {
          return (
           <MarkerComponent 
            key={i}
            place={place}
            clickedPlace={props.clickedPlace}
            onMarkerClick={props.onMarkerClick}
            onError={props.onError}
            />
          )
      })
    }
  </GoogleMap>
)

export class MapComponent extends React.PureComponent {
  state = {
    isMarkerShown: false,
  }

  componentDidMount() {
    this.delayedShowMarker()
  }

  componentDidCatch() {
    this.props.onError(`Error while trying to load Google Maps!!!`)
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 200)
  }

  onMarkerClick = (place) => {
    this.props.onPlaceClicked(place)
  }

  render() {
    return (
      <MyMapComponent
          places={this.props.places}
          onError={this.props.onError}
          clickedPlace={this.props.clickedPlace}
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.onMarkerClick}
        />
    )
  }
}


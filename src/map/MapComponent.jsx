import React from "react"
import './MapComponent.css'

import { compose, withProps } from "recompose"
import { 
  withScriptjs, 
  withGoogleMap, 
  GoogleMap, 
  Marker, 
  InfoWindow 
} from "react-google-maps"
import { constants } from "./constants";

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
  withGoogleMap
)((props) =>
  <GoogleMap
    defaultZoom={14}
    defaultCenter={{ 
      lat: constants.places[0].location.lat, 
      lng: constants.places[0].location.lng
    }}
  >
    {
      props.isMarkerShown
      && props.places
      .map((place, i) => {
        console.log(props);
        
          return (
            <Marker 
              key={i}
              onClick={event => props.handleMarkerClick(place)}
              position={{lat: place.location.lat, lng: place.location.lng}} 
            >
              {props.clickedPlace 
              && props.clickedPlace.id === place.id 
              && <InfoWindow onCloseClick={props.onToggleOpen}>
                <h1>{place.name}</h1>
              </InfoWindow>}
            </Marker>
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

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 300)
  }

  handleMarkerClick = (place) => {
    // this.setState({ isMarkerShown: true })
    console.log(this.props);
    this.props.onPlaceClicked(place)
  }

  render() {
    return (
      <MyMapComponent
        places={this.props.places}
        clickedPlace={this.props.clickedPlace}
        isMarkerShown={this.state.isMarkerShown}
        handleMarkerClick={this.handleMarkerClick}
      />
    )
  }
}


import React from "react"
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
          return (
            <Marker 
              key={i}
              onClick={this.onMarkerClick}
              position={{lat: place.location.lat, lng: place.location.lng}} 
            >
              {i===0 && 
              <InfoWindow onCloseClick={props.onToggleOpen}>
                <h1>lol</h1>
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
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {
    return (
      <MyMapComponent
        places={this.props.places}
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
    )
  }
}


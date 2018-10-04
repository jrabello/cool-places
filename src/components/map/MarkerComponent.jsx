import React, { Component } from "react";
import { FourSquareService } from "../../services/Foursquare";
import { Marker, InfoWindow } from "react-google-maps";
import MarkerSelected from '../../img/marker-selected.svg';

export class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAnyError: false,
      photos: []
    };
  }

  async componentDidMount() {
    const venue = await FourSquareService.getPhotos(
      this.props.place.foursquare.id
    );

    if (!(venue && venue.photos && venue.photos.groups)) { 
      this.setState({
        isAnyError: true
      });
      return;
    }

    const urls = venue.photos.groups
    .map(group =>
      group.items.map(item => item.prefix + `150` + item.suffix))
    .filter(url => url.length)
    
    this.setState({
      photos: urls
    });
  }

  isThisMarkerSelected = () => {
    return this.props.clickedPlace &&
          this.props.clickedPlace.id === this.props.place.id
  }

  onInfoWindowClosed = () => {
    this.setState({
      isAnyError: false
    })
    return this.props.onMarkerClick(null)
  } 

  canShowInfoWindow = () => {
    return this.isThisMarkerSelected() && !this.state.isAnyError
  }

  render() {
    return (
      <Marker
        icon={
          this.canShowInfoWindow()
            ? { url: MarkerSelected }
            : undefined
        }
        onClick={event => this.props.onMarkerClick(this.props.place)}
        position={{
          lat: this.props.place.location.lat,
          lng: this.props.place.location.lng
        }}
      >
        { this.canShowInfoWindow() 
          ? (<InfoWindow
              onCloseClick={() => this.onInfoWindowClosed()}>
                <div>
                  <h1>{this.props.place.name}</h1>
                  <div className="photo__container">
                    {this.state.photos.map((photo, i) => {
                      return <img key={i} src={photo} alt={this.props.place.name}/>;
                    })}
                  </div>
                </div>
              </InfoWindow>
            )
          : <div>Error while trying to get data from our server!</div>}
      </Marker>
    );
  }
}

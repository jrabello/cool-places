import React, { Component } from "react";
import { FourSquareService } from "../../services/Foursquare";
import { Marker, InfoWindow } from "react-google-maps";

export class MarkerComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: []
    };
  }

  async componentDidMount() {
    const venue = await FourSquareService.getPhotos(
      this.props.place.foursquare.id
    );
    console.log({ venue });

    if (!(venue && venue.photos && venue.photos.groups)) return;

    const urls = venue.photos.groups.map(group =>
      group.items.map(item => item.prefix + `150` + item.suffix)
    );
    this.setState({
      photos: urls
    });
  }

  render() {
    return (
      <Marker
        onClick={event => this.props.onMarkerClick(this.props.place)}
        position={{
          lat: this.props.place.location.lat,
          lng: this.props.place.location.lng
        }}
      >
        {this.props.clickedPlace &&
          this.props.clickedPlace.id === this.props.place.id && (
            <InfoWindow>
              <div>
                <h1>{this.props.place.name}</h1>
                <div className="photo__container">
                  {this.state.photos.map((photo, i) => {
                    return <img key={i} src={photo} alt=""/>;
                  })}
                </div>
              </div>
            </InfoWindow>
          )}
      </Marker>
    );
  }
}

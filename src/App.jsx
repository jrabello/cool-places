import React, { Component } from "react";
import "./App.css";
import {MapContainer }from "./map/MapContainer";
import { SearchSidebar } from "./map/SearchSidebar";
import { constants } from "./map/constants";
import {MapComponent} from './map/MapComponent'
class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      places: [...constants.places],
      isSidebarVisible: false,
      clickedPlace: undefined,
    };
  }

  getFilteredPlaces = (typedPlace) => 
    this.state.places
    .filter(place => 
        this.matchesPlace(place, typedPlace))

  matchesPlace = (place, typedPlace) => place.name
    .toLocaleLowerCase()
    .includes(
      typedPlace.toLocaleLowerCase())

  onTypedPlaceChanged = typedPlace => {
    this.setState({
      ...this.state,
      places: typedPlace.length 
        ? this.getFilteredPlaces(typedPlace) 
        : [...constants.places]
    });
  };

  onPlaceClicked = (place) => {
    this.setState({
      ...this.state,
      clickedPlace: place
    });
    console.log(`onPlaceClicked!!!`, place);
  }

  onSidebarToggled = () => {
    this.setState({
      ...this.state,
      isSidebarVisible: !this.state.isSidebarVisible
    });
  }

  render() {
    return (
      <main className="app">
        <SearchSidebar
          places={this.state.places}
          isSidebarVisible={this.state.isSidebarVisible}
          onTypedPlaceChanged={this.onTypedPlaceChanged}
          onSidebarToggled={this.onSidebarToggled}
          onPlaceClicked={this.onPlaceClicked}/>

        <div className={"map " + (this.state.isSidebarVisible ? 'mleft' : 'no-mleft') }>
          <MapContainer 
            places={this.state.places}
            clickedPlace={this.state.clickedPlace} />
        </div>
        <MapComponent></MapComponent>
      </main>
    );
  }
}

export default App;

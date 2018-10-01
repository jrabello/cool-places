import React, { Component } from "react";
import "./App.css";
import { MapComponent } from "./components/map/MapComponent";
import { constants } from "./constants";
import { SearchSidebar } from "./components/sidebar/SearchSidebar";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      places: [...this.getAllPlaces()],
      isSidebarVisible: false,
      clickedPlace: undefined,
    };
  }

  getAllPlaces = () => constants.places;

  getFilteredPlaces = (typedPlace) => {
    const matchesPlace = (place, typedPlace) => place.name
      .toLocaleLowerCase()
      .includes(
        typedPlace.toLocaleLowerCase())

    return this.getAllPlaces()
      .filter(place => matchesPlace(place, typedPlace))
  }

  onTypedPlaceChanged = typedPlace => {
    this.setState({
      ...this.state,
      places: typedPlace.length 
        ? this.getFilteredPlaces(typedPlace) 
        : [...this.getAllPlaces()]
    });
  }

  onPlaceClicked = (place) => {
    this.setState({
      ...this.state,
      clickedPlace: place
    });
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

        <MapComponent 
          places={this.state.places}
          clickedPlace={this.state.clickedPlace}
          onPlaceClicked={this.onPlaceClicked}/>
      </main>
    );
  }
}

export default App;

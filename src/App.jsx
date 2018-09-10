import React, { Component } from "react";
import "./App.css";
import MapContainer from "./map/MapContainer";
import { SearchSidebar } from "./map/SearchSidebar";
import { constants } from "./map/constants";

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      places: [...constants.places],
      isSidebarVisible: true
    };
  }

  onTypedPlaceChanged = typedPlace => {
    this.setState({
      places: typedPlace.length 
        ? this.getFilteredPlaces(typedPlace) 
        : [...constants.places]
    });
  };
  
  onSidebarToggled = (isVisible) => {
    this.setState({
      ...this.state,
      isSidebarVisible: isVisible
    });
  }

  getFilteredPlaces = (typedPlace) => 
    this.state.places
    .filter(place => 
        this.matches(place, typedPlace))

  matches = (place, typedPlace) => place.name
    .toLocaleLowerCase()
    .includes(
      typedPlace.toLocaleLowerCase())

  render() {
    return (
      <main className="app">
        <SearchSidebar
          places={this.state.places}
          onTypedPlaceChanged={this.onTypedPlaceChanged}
          onSidebarToggled={this.onSidebarToggled}
        />
        <div className={"map " + (this.state.isSidebarVisible ? 'mleft' : '') }>
          <MapContainer places={this.state.places} />
        </div>
      </main>
    );
  }
}

export default App;

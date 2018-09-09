import React, { Component } from 'react';
import './App.css';
import { FilterSidebar } from './map/FilterSidebar';
import MapContainer from './map/MapContainer';

class App extends Component {
  render() {
    return (
      <main className="app">
        <FilterSidebar/>
        <MapContainer/>
      </main>
    );
  }
}

export default App;

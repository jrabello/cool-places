import React, { Component } from "react";


export class SearchSidebar extends Component {

    onTypedPlaceChanged = (typedPlace) => {
        this.props.onTypedPlaceChanged(typedPlace);
    }
    
    render() {
      return (
        <aside className="sidebar">
            <h1>Puy-l'Eveque Locations</h1>
            <div className="search">
                <input 
                    type="text"
                    className="search--input" 
                    onChange={event => this.onTypedPlaceChanged(event.target.value)}/>
                <i className="filter">
                    <svg aria-hidden="true" 
                        data-prefix="fas" 
                        data-icon="filter" 
                        role="img" xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 512 512">
                            <path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
                    </svg>
                </i>
            </div>
            <ul>
            {
                this.props.places
                .map((place, i) => {
                    return (
                      <li key={i}>
                       { place.name }
                      </li>
                    )
                })
            }
            </ul>
       </aside>
      );
    }

}
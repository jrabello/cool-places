import React, { Component } from "react";
import './SearchSidebar.css'

export class SearchSidebar extends Component {

    onTypedPlaceChanged = (typedPlace) => {
        this.props.onTypedPlaceChanged(typedPlace);
    }
    
    onPlaceClicked = (place) => {
        this.props.onPlaceClicked(place)
    }

    toggleVisibility = () => {
        this.props.onSidebarToggled();
    }

    render() {
      return (
        <aside className={"sidebar " + 
            (this.props.isSidebarVisible ? 'sidebar--visible' : 'sidebar--hidden')} >
            <div className="sidebar__container">

                {/* close btn */}
                <button className="btn--close" onClick={event => this.toggleVisibility()}>
                    <svg aria-hidden="true" data-prefix="fas" data-icon="times" 
                        className="svg-inline--fa fa-times fa-w-11 close--icon" role="img" 
                        viewBox="0 0 352 512"><path fill="currentColor" d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"></path></svg>
                </button>

                <h1>Puy-l'Eveque Locations</h1>
                <div className="search">
                    {/* expand sidebar */}
                    <button 
                        className={"sidebar__btn--expand " + 
                            (this.props.isSidebarVisible ? `hidden` : ``)} 
                        onClick={event => this.toggleVisibility()}>
                        <i role="img">
                         <svg width="24" height="24" viewBox="0 0 24 24"><path d="M10 17l5-5-5-5v10z"/><path fill="none" d="M0 24V0h24v24H0z"/></svg>
                        </i>
                    </button>

                    {/* search input */}
                    <label htmlFor="searchInput">City Name:</label>
                    <input 
                        id="searchInput"
                        className="search--input" 
                        type="text"
                        onChange={event => this.onTypedPlaceChanged(event.target.value)}/>

                    {/* filter icon */}
                    <i className="filter">
                        <svg 
                            role="img" 
                            aria-hidden="true" 
                            data-prefix="fas" 
                            data-icon="filter" 
                            viewBox="0 0 512 512">
                                <path fill="currentColor" d="M487.976 0H24.028C2.71 0-8.047 25.866 7.058 40.971L192 225.941V432c0 7.831 3.821 15.17 10.237 19.662l80 55.98C298.02 518.69 320 507.493 320 487.98V225.941l184.947-184.97C520.021 25.896 509.338 0 487.976 0z"></path>
                        </svg>
                    </i>
                </div>

                {/* cities names */}
                <ul>
                {
                    this.props.places
                    .map((place, i) => {
                        return (
                        <li className="search--result"
                            key={i}
                            onClick={event => this.onPlaceClicked(place)}>
                            { place.name }
                        </li>
                        )
                    })
                }
                </ul>
            </div>
       </aside>
      );
    }

}
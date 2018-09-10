import React, { Component } from "react";


export class SearchSidebar extends Component {
    constructor(props) {
        super(props)
        this.state = {visible: true}
    }

    onTypedPlaceChanged = (typedPlace) => {
        this.props.onTypedPlaceChanged(typedPlace);
    }

    toggleVisibility = () => {
        const isVisible = !this.state.visible;
        this.setState({
            visible: isVisible
        })
        this.props.onSidebarToggled(isVisible);
    }

    render() {
      return (
        <aside className={"sidebar "+ (this.state.visible ? 'sidebar--visible' : '')} >
            <div className="sidebar__container">
                

                <h1>Puy-l'Eveque Locations</h1>
                <div className="search">
                    <button className="search__btn--expand" 
                        onClick={event => this.toggleVisibility()}>
                        { this.state.visible ? (<span>⬅️</span>) : (<span>➡️</span>)}
                    </button>
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
            </div>
       </aside>
      );
    }

}
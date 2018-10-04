import React, { Component } from "react";
import "./Modal.css";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
        msg: this.props.msg
    };
  }

  onWindowClosed = () => {
    console.log(`onWindowClosed`);
    this.setState({
        msg: null
    })
  }

  render() {
    return (
        // taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
        this.state.msg 
        ? (<div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.onWindowClosed}>
                        &times;
                    </span>
                    <p>{this.state.msg}</p>
                </div>
            </div>) 
        : null
    );
  }

}

import React, { Component } from "react";
import "./Modal.css";

export class Modal extends Component {

  onWindowClosed = () => {
    this.props.onModalClosed()
  }

  isValidMsg = () => {
    return this.props.msg && this.props.msg.length 
  }

  render() {
    return (
        // taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal
        this.isValidMsg()
        ? (<div id="myModal" className="modal">
                <div className="modal-content">
                    <span className="close" onClick={this.onWindowClosed}>
                        &times;
                    </span>
                    <p>{this.props.msg}</p>
                </div>
            </div>) 
        : null
    );
  }

}

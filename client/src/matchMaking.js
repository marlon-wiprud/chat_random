import React, { Component } from "react";

class MatchMaking extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="centered-parent">
        <div className="centered-child modal-container">
          <p>Matching you up...</p>
        </div>
      </div>
    );
  }
}

export default MatchMaking;

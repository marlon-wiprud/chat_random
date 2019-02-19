import React, { Component } from "react";

class StartForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  handleChange(e) {
    const val = e.target.value;
    this.setState({ username: val });
  }

  render() {
    return (
      <div className="centered-parent">
        <div className="centered-child modal-container">
          <input
            placeholder="Enter username"
            onChange={e => this.handleChange(e)}
          />
          <button onClick={() => this.props.joinChat(this.state.username)}>
            Join Chatroom
          </button>
          <p>{this.props.errorMessage}</p>
        </div>
      </div>
    );
  }
}

export default StartForm;

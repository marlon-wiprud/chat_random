import React, { Component } from "react";

class Message extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="message">
        <div>
          <p className="username">{this.props.user}: </p>
          <p className="chatBubble">{this.props.message}</p>
        </div>
      </div>
    );
  }
}

export default Message;

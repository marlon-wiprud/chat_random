import React, { Component } from "react";
import messageParser from "../utils/messageParser";

class ChatRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: this.props.messages
    };

    this.saveMessage = this.saveMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  saveMessage(e) {
    const message = e.target.value;
    this.setState({ message });
  }

  sendMessage(e) {
    e.preventDefault();

    const username = this.props.username;
    const message = this.state.message;
    const socket = this.props.socket;

    messageParser(username, message, socket).then(obj => {
      const { sendSocket, msgToAdd } = obj;
      this.props.socket.send(JSON.stringify(sendSocket));

      this.props.addMessage(msgToAdd);

      this.setState({ message: "" });
    });
  }

  render() {
    return (
      <div className="centered-parent">
        <div className="centered-child chatroom-parent">
          <h3 className="match-username">
            You are now chatting with: {this.props.matched_username}
          </h3>
          <div className="chatroom-container">
            <div id="messageContainer">{this.state.messages}</div>
            <div id="sendForm">
              <hr />
              <form onSubmit={this.sendMessage}>
                <button type="submit">Send</button>
                <input
                  placeholder="type a message..."
                  value={this.state.message}
                  onChange={e => this.saveMessage(e)}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ChatRoom;

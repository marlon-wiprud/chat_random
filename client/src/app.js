import React, { Component } from "react";
import StartForm from "./startForm";
import MatchMaking from "./matchMaking";
import ChatRoom from "./chatRoom";
import Message from "./message";

class App extends Component {
  constructor() {
    super();
    this.state = {
      lookingForMatch: false,
      username: "",
      errorMessage: "",
      socket: "",
      inRoom: false,
      messages: [],
      matched_username: ""
    };

    this.joinChat = this.joinChat.bind(this);
    this.addMessage = this.addMessage.bind(this);
    this.switchChat = this.switchChat.bind(this);
    this.setUpSocket = this.setUpSocket.bind(this);
  }

  setUpSocket(username) {
    const socket = new WebSocket("ws://localhost:8000");

    socket.onopen = () => {
      this.setState({
        lookingForMatch: true
      });
      socket.send(
        JSON.stringify({
          type: "JOIN_ROOM",
          payload: username
        })
      );
    };

    socket.onmessage = event => {
      const { type, payload } = JSON.parse(event.data);

      switch (type) {
        case "MATCHED": {
          console.log("matched: ", payload);
          this.setState({
            inRoom: true,
            lookingForMatch: false,
            matched_username: payload
          });

          break;
        }

        case "NEW_MESSAGE": {
          const username = payload.username;
          const message = payload.message;
          this.addMessage({ username, message });
          break;
        }

        case "NEXT_CHAT": {
          this.switchChat().then(res => {
            console.log(res);
            this.joinChat(this.state.username);
          });

          break;
        }
      }
    };

    return socket;
  }

  switchChat() {
    return new Promise((resolve, reject) => {
      this.state.socket.close();
      this.setState(
        {
          socket: "",
          messages: [],
          lookingForMatch: true,
          inRoom: false
        },
        resolve("SWITCH CHAT RESOLVE")
      );
    });
  }

  addMessage(msgInfo) {
    const { username, message } = msgInfo;

    const messages = this.state.messages;
    const id = messages.length;

    messages.push(<Message key={id} user={username} message={message} />);
    this.setState({
      messages
    });
  }

  joinChat(username) {
    if (username.length > 0) {
      const socket = this.setUpSocket(username);
      this.setState({ username, socket });
    } else {
      this.setState({ errorMessage: "please enter username" });
    }
  }

  render() {
    let content = "";
    if (this.state.lookingForMatch) {
      content = <MatchMaking socket={this.state.socket} />;
    } else if (this.state.inRoom) {
      content = (
        <ChatRoom
          socket={this.state.socket}
          addMessage={this.addMessage}
          messages={this.state.messages}
          username={this.state.username}
          matched_username={this.state.matched_username}
        />
      );
    } else {
      content = (
        <StartForm
          joinChat={this.joinChat}
          errorMessage={this.state.errorMessage}
        />
      );
    }
    return <div id="body">{content}</div>;
  }
}

export default App;

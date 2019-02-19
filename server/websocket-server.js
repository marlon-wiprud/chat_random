const WebSocket = require("ws");

const lobby = [];

function createRoom() {
  console.log("MAKING ROOM");

  const user1 = lobby.pop();
  const user2 = lobby.pop();
  // set matches
  user1.socket.match = user2.socket;
  user2.socket.match = user1.socket;
  // send confirmation

  const user1Data = JSON.stringify({
    type: "MATCHED",
    payload: user2.username
  });

  const user2Data = JSON.stringify({
    type: "MATCHED",
    payload: user1.username
  });
  console.log("USER ONE: ", user1.username);

  user1.socket.match.send(user2Data);
  user2.socket.match.send(user1Data);
}

const ws = new WebSocket.Server({
  port: 8000,
  clientTracking: true
});

ws.on("connection", socket => {
  socket.on("message", data => {
    const { type, payload } = JSON.parse(data);

    console.log("TYPE: ", type);

    switch (type) {
      case "JOIN_ROOM": {
        lobby.push({ socket, username: payload });
        if (lobby.length >= 2) {
          createRoom();
        }
        console.log("USERS IN LOBBY: ", lobby.length);

        break;
      }

      case "NEW_MESSAGE": {
        socket.match.send(data);

        break;
      }

      case "USER_DISCONNECT": {
        const sendToUser = {
          type: "NEXT_CHAT",
          payload: ""
        };
        socket.send(JSON.stringify(sendToUser));

        const sendToMatch = JSON.parse(data);
        sendToMatch.type = "NEW_MESSAGE";
        if (socket.match.readyState === 1) {
          socket.match.send(JSON.stringify(sendToMatch));
        }
      }

      default: {
        console.log("unrecognized type");
      }
    }
  });
});

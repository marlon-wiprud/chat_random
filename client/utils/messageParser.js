import commands from "./commands";

function messageParser(username, message) {
  const split_message = message.split(" ");

  if (commands[split_message[0]]) {
    const func = commands[split_message[0]];
    return func(username, message);
  }

  const sendSocket = {
    type: "NEW_MESSAGE",
    payload: { username, message }
  };
  const msgToAdd = {
    username,
    message
  };

  return new Promise((resolve, reject) => {
    resolve({ sendSocket, msgToAdd });
  });
}

export default messageParser;

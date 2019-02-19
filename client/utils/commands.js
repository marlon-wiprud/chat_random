const commands = {
  "/hop": (username, message) => {
    return new Promise((resolve, reject) => {
      console.log("user wants to switch");

      const sendSocket = {
        type: "USER_DISCONNECT",
        payload: {
          username: "system_message",
          message: `${username} left the chat`
        }
      };
      const msgToAdd = {
        username: "system_message",
        message: "you want to switch"
      };

      resolve({ sendSocket, msgToAdd });
    });
  },

  "/delay": (username, message) => {
    return new Promise((resolve, reject) => {
      const split_message = message.split(" ");
      const time = split_message[1];
      const joined_message = split_message
        .slice(2, split_message.length)
        .join(" ");

      const sendSocket = {
        type: "NEW_MESSAGE",
        payload: { username, message: joined_message }
      };
      const msgToAdd = {
        username,
        message: joined_message
      };

      setTimeout(() => {
        resolve({ sendSocket, msgToAdd });
      }, time);
    });
  }
};

export default commands;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./App.css";
const socket = io("http://localhost:4000"); // Change URL accordingly

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    socket.on("chat message", (message) => {
      setChat([...chat, message]);
    });
  }, [chat]);

  const sendMessage = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <>
      <ul id="messages">
        {chat.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div id="form" action="">
        <input
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          id="input"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;

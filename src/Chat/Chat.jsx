import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
const socket = io.connect("http://172.20.10.3:443");
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chatRoom, setChatroom] = useState("");
  const [room, setRoom] = useState("");

  const uploadFile = useRef();

  useEffect(() => {
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const connectRooms = () => {
    console.log("kyu");

    socket.on("connection", (soc) => {
      console.log("room");
      soc.join();
    });
  };

  useEffect(() => {}, [chatRoom]);

  useEffect(() => {
    socket.on("recieve_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = (message) => {
    console.log("message to be send", message);
  };

  return (
    <div className="chat-wrapper">
      <div className="clientslist"></div>
      <div className="chat-container">
        <div className="inputHolder">
          <input
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter messsage..."
          />
          <div className="chatButtonContainer">
            <input
              type="file"
              ref={uploadFile}
              onChange={(e) =>
                sendMessage({
                  type: "file",
                  message: e.target.files[0],
                })
              }
              hidden
            />
            <button onClick={() => uploadFile.current.click()}>UD</button>
            <button
              onClick={() =>
                sendMessage({
                  type: "text",
                  message: message,
                })
              }
            >
              SD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Contacts from "./Contacts/Contacts";
const socket = io.connect("https://172.20.10.3:443");
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chatRoom, setChatroom] = useState("");
  const [room, setRoom] = useState("");

  const uploadFile = useRef();

  const user = [
    {
      name: "Ayush",
      userid: "ayushID"
    }
  ]



  useEffect(() => {
    // axios.get("https://172.20.10.3/test").then((data) => {
    //   console.log(data);
    // });
    socket.on("connect")
    socket.emit("socketid", user.userid)
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

  useEffect(() => { }, [chatRoom]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("pong", message);
  };

  return (
    <div className="chat-wrapper">
      <div className="clientslist">
        {
          user.map(item => {
            return <div>
              {item.name}
            </div>
          })
        }
      </div>
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

import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Contacts from "./Contacts/Contacts";
import './Chat.scss'
const socket = io.connect("https://172.20.10.3:443");
function Chat() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);
  const [chatRoom, setChatroom] = useState("");
  const [room, setRoom] = useState("");
  const [activeUser, setActiveUser] = useState('');
  const uploadFile = useRef();

  const user = [
    {
      user: {
        firstname: "ayush",
        lastname: "papnai"
      },
      _id: "ayushID",
      roomId: 'room1'
    },
    {
      user: {
        firstname: "Nik",
        lastname: "Kolte"
      },
      _id: "nikId",
      roomId: 'room2'
    },
    {
      user: {
        firstname: "ishan",
        lastname: "div"
      },
      _id: "ishanID",
      roomId: 'room3'
    },
  ]

  const roomTest = 'room3'


  useEffect(() => {
    // axios.get("https://172.20.10.3/test").then((data) => {
    //   console.log(data);
    // });
    setUsers(user);
    setChatroom(user[0]?.roomId)
    socket.on("connect")
    connectRooms(user[0])
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("pong");
    };
  }, []);

  const connectRooms = (activeRoom) => {
    console.log(activeRoom)
    socket.emit("socketid", { userId: user[0]?._id, roomId: activeRoom?.roomId })
  };

  useEffect(() => {
    connectRooms(chatRoom)
    console.log("userChatrom", chatRoom)
  }, [chatRoom]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      alert(data.message);
    });
  }, [socket]);

  const sendMessage = (message) => {
    socket.emit("pong", { room: roomTest, message });

  };

  return (
    <div className="chat-wrapper">
      <div className="clientslist">
        {
          users.map(subs => {
            return <Contacts key={subs._id} active={chatRoom?.roomId === subs.roomId ? true : false} chatId={subs.roomId} setChatroom={setChatroom} user={subs} />
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

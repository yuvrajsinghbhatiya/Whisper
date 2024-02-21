import React from 'react'
import { IoMdSend } from "react-icons/io";
import io from "socket.io-client";

const url = "https://whisper-b.onrender.com";
// const url = "http://localhost:5000";

const socket = io.connect(url);

function InputBox({isDarkTheme,user,setMessages,currentRoom,joinRoom,leaveRoom,setToggleScroll,toggleScroll}) {
    const inputRef = React.useRef();
    const [message, setMessage] = React.useState("");
    

    const sendMessage = () => {
        if (message.trim() === "") return;
        if (!currentRoom) {
          alert("Please join a room first");
          return;
        };
        const newMessage = { text: message, user, timestamp: Date.now() ,room:currentRoom};
        console.log("newMessage:", newMessage);
        socket.emit("sendMessage", { message: newMessage });
        setMessage("");
        setToggleScroll(!toggleScroll);
        setMessages((prevMessages) => [...prevMessages, newMessage]); // Update messages state with the new message
      };

      const handleKeyDown = (e) => {
        if (e.key === "Enter") {
          if (message.startsWith("/join")) {
            const roomToJoin = message.split(" ")[1];
            joinRoom(roomToJoin);
          } else if (message === "/leave") {
            leaveRoom(currentRoom);
          } else {
            sendMessage();
          }
        }
      };

  return (
    <>
    <div
            className={`left-0 w-full h-[10vh] mt-6 ${
              isDarkTheme ? "bg-neutral-800" : "bg-gray-100"
            }`}
          >
            <div className="max-w-screen-md mx-auto px-4 py-2 ">
              <div className="flex items-center ">
                <input
                  ref={inputRef}
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your message..."
                  className={`flex-1 p-3 rounded-xl shadow-lg border-2  focus:outline-none
                   ${
                     isDarkTheme
                       ? "bg-neutral-700 text-white border-neutral-500"
                       : "border bg-gray-100 text-black border-gray-300"
                   }`}
                />
                <button
                  onClick={sendMessage}
                  className={`ml-4 ${
                    isDarkTheme ? "bg-accentDark" : "bg-accent"
                  }  text-white rounded-full p-3 transform hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <IoMdSend size={24} />
                </button>
              </div>
            </div>
          </div>
    </>
  )
}

export default InputBox
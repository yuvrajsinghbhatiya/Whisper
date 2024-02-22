import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import InputBox from "../utility/InputBox";
import Sidebar from "../utility/Sidebar";
import Messages from "../utility/Messages";
import PasswordModal from "../utility/PasswordModal";
import CreatePrivateRoomModal from "../utility/CreatePrivateRoomModal";
import Topbar from "../utility/Topbar"; // Import the Topbar component
import { toast } from "react-toastify";

const url = "https://whisper-b.onrender.com";

const socket = io.connect(url);

function Chat({ isDarkTheme, user }) {
  const [messages, setMessages] = useState([]);
  const [toggleScroll, setToggleScroll] = useState(false);
  const [currentRoom, setCurrentRoom] = useState();
  const [rooms, setRooms] = useState([]);
  const [isMainChatEnabled, setIsMainChatEnabled] = useState(false);
  const [showJoinRoomModal, setShowJoinRoomModal] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [password, setPassword] = useState("");
  const [showCreatePrivateRoomModal, setShowCreatePrivateRoomModal] =
    useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 600); // Define small screen width

  useEffect(() => {
    socket.on("message", (newMessage) => {
      console.log("Received message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.off("message");
    };
  }, [toggleScroll, currentRoom, messages]);

  useEffect(() => {
    socket.emit("roomList");
    socket.on("roomList", (roomList) => {
      console.log("Room list received:", roomList);
      setRooms(roomList);
    });
    return () => {
      socket.off("roomList");
    };
  }, [currentRoom]);

  useEffect(() => {
    if (!currentRoom) return;

    fetch(`${url}/api/messages/getMessages/${currentRoom}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setMessages(data);
      })
      .catch((error) => {
        console.error("Error fetching messages:", error);
      });
  }, [currentRoom]);

  const joinRoom = (room) => {
    if (room.isPrivate) {
      setSelectedRoom(room);
      setShowJoinRoomModal(true);
    } else {
      socket.emit("joinRoom", room.name);
      setCurrentRoom(room.name);
    }
  };

  const leaveRoom = (room) => {
    socket.emit("leaveRoom", room);
    setCurrentRoom("");
  };

  const handleLeaveRoom = () => {
    leaveRoom(currentRoom);
  };

  const handleJoinRoom = () => {
    if (password.trim() === "") return;

    fetch(`${url}/api/rooms/checkRoomPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName: selectedRoom.name, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          socket.emit("joinRoom", selectedRoom.name);
          setCurrentRoom(selectedRoom.name);
          setShowJoinRoomModal(false);
          setPassword(""); // Clear password input
        } else {
          toast("Incorrect password. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error checking room password:", error);
        toast(
          "An error occurred while checking room password. Please try again."
        );
      });
  };

  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleMainChat = () => {
    setIsMainChatEnabled(!isMainChatEnabled);
  };

  const createPrivateRoom = (roomName, password) => {
    if (!roomName.trim() || !password.trim()) {
      toast.error("Please enter room name and password.");
      return;
    }
    fetch(`${url}/api/rooms/createRoom`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roomName, password, isPrivate: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          toast(`Private chat room "${roomName}" created successfully!`);
        } else {
          toast("Failed to create private chat room. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating private chat room:", error);
        toast(
          "An error occurred while creating private chat room. Please try again."
        );
      });
  };

  // Function to handle resizing and update the state accordingly
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 600);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`w-screen flex flex-col ${
        isDarkTheme ? "bg-dark1 text-white" : "bg-gray-100 text-gray-800"
      }`}
    >
      {isSmallScreen ? (
        <Topbar
          isDarkTheme={isDarkTheme}
          rooms={rooms}
          currentRoom={currentRoom}
          createPrivateRoom={() => setShowCreatePrivateRoomModal(true)}
          joinRoom={joinRoom}
          leaveRoom={leaveRoom}
        />
      ) : (
        <Sidebar
          isDarkTheme={isDarkTheme}
          rooms={rooms}
          currentRoom={currentRoom}
          createPrivateRoom={() => setShowCreatePrivateRoomModal(true)}
          joinRoom={joinRoom}
          leaveRoom={leaveRoom}
        />
      )}
      <div className="flex flex-1">
        <div className="w-full sm:w-5/4 p-2">
          {!currentRoom ? (
            <div
              className={`flex flex-col items-center rounded-lg shadow-md justify-center h-[86vh] ${
                isDarkTheme
                  ? "bg-darkslate text-zinc-400 "
                  : "bg-white text-neutral-700"
              }`}
            >
              <h2 className="text-5xl text-center">
                Welcome <br /> to <br /> <b>WHISPER</b>
              </h2>
              <h4 className="text-1xl mt-5">
                {" "}
                Please join a room to start chatting
              </h4>
            </div>
          ) : (
            <Messages
              chatBoxRef={chatBoxRef}
              toggleScroll={toggleScroll}
              messages={messages}
              isDarkTheme={isDarkTheme}
              user={user}
            />
          )}
          {currentRoom && (
            <InputBox
              setToggleScroll={setToggleScroll}
              toggleScroll={toggleScroll}
              isDarkTheme={isDarkTheme}
              messages={messages}
              setMessages={setMessages}
              user={user}
              socket={socket}
              currentRoom={currentRoom}
            />
          )}
        </div>
      </div>

      {showJoinRoomModal && (
        <PasswordModal
          setPassword={setPassword}
          setShowJoinRoomModal={setShowJoinRoomModal}
          handleJoinRoom={handleJoinRoom}
          handleLeaveRoom={handleLeaveRoom}
          password={password}
          isDarkTheme={isDarkTheme}
        />
      )}

      {showCreatePrivateRoomModal && (
        <CreatePrivateRoomModal
          createPrivateRoom={createPrivateRoom}
          onClose={() => setShowCreatePrivateRoomModal(false)}
          isDarkTheme={isDarkTheme}
        />
      )}
    </div>
  );
}

Chat.propTypes = {
  isDarkTheme: PropTypes.bool,
  user: PropTypes.string,
};

export default Chat;

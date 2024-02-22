import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function CreatePrivateRoomModal({ createPrivateRoom, onClose, isDarkTheme }) {
  const [roomName, setRoomName] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateRoom = () => {
    if (!roomName.trim() || !password.trim()) {
      toast.error("Please enter room name and password.");
      return;
    }
    createPrivateRoom(roomName, password);
    setRoomName("");
    setPassword("");
  };
  

  const handleClose = () => {
    onClose();
    setRoomName("");
    setPassword("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-dark1 bg-opacity-95 flex justify-center items-center">
      <div className={`p-4 rounded-md ${isDarkTheme ? "bg-darkslate text-white" : "bg-gray-100 text-neutral-800"}`}>
        <h2 className="text-lg font-bold mb-4 text-center">Create Private Room</h2>
        <input
          type="text"
          placeholder="Room Name"
          className={`w-auto p-2 rounded outline-none mb-2 flex flex-col ${
            isDarkTheme
              ? "bg-dark1 text-white"
              : " border-2 border-neutral-400 bg-gray-200 text-black"
          }`}
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className={`w-auto p-2 rounded outline-none mb-4 flex flex-col ${
            isDarkTheme
              ? "bg-dark1 text-white"
              : " border-2 border-neutral-400 bg-gray-200 text-black"
          }`}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-center">
          <button
            className="bg-accentDark text-white px-3 py-2 rounded-md hover:bg-accent"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
          <button
            className="bg-dark2 text-white px-3 py-2 rounded-md hover:bg-dark1 ml-3"
            onClick={handleClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

CreatePrivateRoomModal.propTypes = {
  createPrivateRoom: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default CreatePrivateRoomModal;

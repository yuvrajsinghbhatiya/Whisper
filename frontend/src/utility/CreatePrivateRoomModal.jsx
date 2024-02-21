import React, { useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

function CreatePrivateRoomModal({ createPrivateRoom, onClose }) {
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
    // Optionally, you can reset the form values here
    setRoomName("");
    setPassword("");
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-95 flex justify-center items-center">
      <div className="bg-white p-4 rounded-md text-black ">
        <h2 className="text-lg font-bold mb-4 text-center">Create Private Room</h2>
        <input
          type="text"
          placeholder="Room Name"
          className="block w-full p-2 mb-4 border rounded-md"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="block w-full p-2 mb-4 border rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="flex justify-end">
          <button
            className="bg-accent text-white px-4 py-2 rounded-md mr-2 hover:bg-accentDark"
            onClick={handleCreateRoom}
          >
            Create Room
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
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

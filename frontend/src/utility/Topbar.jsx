import React, { useState } from "react";
import { FaLock } from "react-icons/fa";
import PrivateRoomBtn from "./PrivateRoomBtn";

function Topbar({
  isDarkTheme,
  rooms,
  currentRoom,
  createPrivateRoom,
  joinRoom,
  leaveRoom,
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className={`w-full sm:hidden p-4 
      ${isDarkTheme ? "bg-dark1 text-white" : "bg-neutral-180 text-gray-700"}`}
    >
      {/* Your top bar content */}
      <div
        className={`flex justify-around  py-3 shadow-md rounded-lg ${
          isDarkTheme ? "bg-dark2" : "bg-white"
        }`}
      >
        <div className="flex items-center ">
          <PrivateRoomBtn
            createPrivateRoom={createPrivateRoom}
            isDarkTheme={isDarkTheme}
          />
        </div>
        <div>
          <button
            className={`px-3 py-2 rounded-md text-md font-semibold focus:outline-none  ${
              isDarkTheme
                ? "bg-dark1 text-white hover:bg-darkslate "
                : "bg-gray-200 text-black hover:bg-gray-300"
            }`}
            onClick={toggleDropdown}
          >
            ROOMS
          </button>
        </div>
      </div>

      {dropdownOpen && (
        <ul className="space-y-2 mt-3">
          {rooms.map((room, id) => (
            <li
              key={id}
              className={`cursor-pointer capitalize  ${
                room.name === currentRoom ? "font-bold" : ""
              }`}
            >
              <span
                className={`flex items-center 
                ${
                  isDarkTheme
                    ? "bg-darkslate text-white"
                    : "bg-gray-200 text-black"
                }   p-2 rounded-lg `}
              >
                {room.isPrivate && (
                  <span className="text-white px-2 py-2 rounded-md">
                    <FaLock
                      className={`${isDarkTheme ? "text-white" : "text-black"}`}
                      size={14}
                    />
                  </span>
                )}
                {room.name}
                <div className="ml-auto">
                  <span
                    onClick={() => joinRoom(room)}
                    className="text-sm px-2 py-2 rounded-md bg-accentDark text-white hover:bg-accent cursor-pointer"
                  >
                    Join
                  </span>
                  <span
                    onClick={() => leaveRoom(room)}
                    className={`text-sm px-2 py-2 rounded-md ml-2 cursor-pointer ${
                      isDarkTheme
                        ? "bg-dark1 text-white hover:bg-red-500"
                        : "bg-gray-300 text-black hover:bg-red-400"
                    }`}
                  >
                    Leave
                  </span>
                </div>
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Topbar;

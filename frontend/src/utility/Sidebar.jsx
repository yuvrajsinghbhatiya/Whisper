import React from "react";
import { FaLock } from "react-icons/fa";
import PrivateRoomBtn from "./PrivateRoomBtn";

function Sidebar({
  isDarkTheme,
  rooms,
  currentRoom,
  createPrivateRoom,
  joinRoom,
}) {
  return (
    <>
      <div
        className={`w-full sm:w-1/4 p-8 
        ${
          isDarkTheme ? "bg-dark1 text-white" : "bg-neutral-180 text-gray-700"
        }`}
      >
        <PrivateRoomBtn
          createPrivateRoom={createPrivateRoom}
          isDarkTheme={isDarkTheme}
        />

        <h2 className="text-xl font-bold mb-2 text-left ">ROOMS</h2>
        {/* Sidebar content */}
        <ul className="space-y-4 mt-4">
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
                  <span className="text-xs text-white px-2 py-1 rounded-md">
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
                    className="text-xs px-2 py-1 rounded-md bg-accentDark text-white hover:bg-accent cursor-pointer"
                  >
                    Join
                  </span>
                  <span
                    onClick={() => leaveRoom(room)}
                    className={`text-xs px-2 py-1 rounded-md ml-2 cursor-pointer ${
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
      </div>
    </>
  );
}

export default Sidebar;

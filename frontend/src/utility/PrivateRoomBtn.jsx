import React from "react";
import { LuMessageSquarePlus } from "react-icons/lu";


function PrivateRoomBtn({createPrivateRoom,isDarkTheme}) {
  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={createPrivateRoom}
          className={`${
            isDarkTheme ? "bg-accentDark hover:bg-accent" : "bg-accent hover:bg-accentDark"
          }  text-white px-4 py-2 rounded-lg w-full text-md font-semibold flex items-center justify-center`}
        >
          Create Private Room <LuMessageSquarePlus  className="ml-2" size={20}/>
        </button>
      </div>
    </>
  );
}

export default PrivateRoomBtn;

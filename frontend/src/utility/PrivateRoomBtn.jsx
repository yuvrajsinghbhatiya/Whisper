import React from "react";


function PrivateRoomBtn({createPrivateRoom,isDarkTheme}) {
  return (
    <>
      <div className="flex items-center mb-6">
        <button
          onClick={createPrivateRoom}
          className={`${
            isDarkTheme ? "bg-accentDark hover:bg-accent" : "bg-accent hover:bg-accentDark"
          }  text-white px-4 py-2 rounded-lg  text-md font-semibold flex items-center justify-center`}
        >
          Create Private Room
        </button>
      </div>
    </>
  );
}

export default PrivateRoomBtn;

import React from "react";


function PrivateRoomBtn({createPrivateRoom,isDarkTheme}) {
  return (
    <>
      <div className="flex items-center">
        <button
          onClick={createPrivateRoom}
          className=" bg-accentDark hover:bg-accent text-white px-3 py-2 rounded-lg  text-md font-semibold flex items-center justify-center"
        >
          Create Private Room
        </button>
      </div>
    </>
  );
}

export default PrivateRoomBtn;

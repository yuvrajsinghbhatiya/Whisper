import React from 'react'

function PasswordModal({setPassword,setShowJoinRoomModal,handleJoinRoom,password,isDarkTheme}) {
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full bg-dark1 bg-opacity-95 flex justify-center items-center">
          <div className={`p-4 rounded-md ${isDarkTheme ? "bg-darkslate text-white" : "bg-gray-100 text-neutral-800"}`}  >
            <h2 className="text-lg font-bold mb-4 text-center ">Join Private Room</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className={`w-auto p-2 rounded outline-none mb-4 ${
                isDarkTheme
                  ? "bg-dark1 text-white"
                  : " border-2 border-gray-300 bg-gray-200 text-neutral-700"
              }`}
            />
            <div className="flex justify-center mt-2">
              <button
                onClick={handleJoinRoom}
                className="bg-accentDark text-white px-3 py-2 rounded-md hover:bg-accent"
              >
                Join
              </button>
              <button
                onClick={() => setShowJoinRoomModal(false)}
                className="bg-dark2 text-white px-3 py-2 rounded-md hover:bg-dark1 ml-3"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
    </>
  )
}

export default PasswordModal
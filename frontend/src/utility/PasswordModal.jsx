import React from 'react'

function PasswordModal({setPassword,setShowJoinRoomModal,handleJoinRoom,password}) {
  return (
    <>
    <div className="fixed top-0 left-0 w-full h-full bg-neutral-900 bg-opacity-95 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md text-black ">
            <h2 className="text-lg font-bold mb-4 text-center ">Join Private Room</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="block w-full p-2 mb-4 border rounded-md"
            />
            <div className="flex justify-center">
              <button
                onClick={handleJoinRoom}
                className="bg-accent text-white px-4 py-2 rounded-md mr-2 hover:bg-accentDark"
              >
                Join
              </button>
              <button
                onClick={() => setShowJoinRoomModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-zinc-800"
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
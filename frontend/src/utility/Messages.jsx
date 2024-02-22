import React, { useEffect, useRef } from "react";

function Messages({ messages, isDarkTheme, user, toggleScroll }) {
  const chatBoxRef = useRef();

  useEffect(() => {
    chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
  }, [toggleScroll, messages]);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "pm" : "am";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  return (
    <div
      ref={chatBoxRef}
      className={`overflow-y-auto flex-1 h-[72vh] px-4 py-2 mt-2 rounded-xl shadow-md
             ${
               isDarkTheme
                 ? "bg-darkslate text-white"
                 : "bg-gray-200 text-gray-800"
             }`}
    >
      {messages.map((msg, index) => (
        <div
          key={index}
          className={`flex ${
            msg.user === user ? "justify-end" : "justify-start"
          } mb-2 mr-3`}
        >
          <div
            className={`px-3 py-1 rounded-lg 
                  ${
                    msg.user === user
                      ? isDarkTheme
                        ? "bg-accentDark text-white message-right"
                        : "bg-accent text-white message-right"
                      : isDarkTheme
                      ? "bg-dark1 text-white message-left"
                      : "bg-white text-gray-700 message-left"
                  } ${msg.user !== user ? "ml-2 mt-2" : ""} max-w-md`}
          >
            <div className="flex flex-col ">
              <div className="text-md">{msg.text}</div>
              <div
                className={`text-xxs mt-2 ${
                  msg.user !== user ? "text-gray-400" : "text-gray-200"
                } ml-${msg.user !== user ? "6" : "auto"} ${
                  index === 0 && msg.user === user ? "text-right" : "text-right"
                }`}
              >
                {formatTimestamp(msg.timestamp)}
                <span className="ml-2 ">{msg.user}</span>{" "}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Messages;

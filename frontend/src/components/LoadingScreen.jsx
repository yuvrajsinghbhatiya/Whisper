import React from "react";

function LoadingScreen({isDarkTheme}) {
  return (
    <div className={`flex items-center justify-center h-screen ${isDarkTheme ? "bg-dark1" : "bg-gray-200"} `}>
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-accent"></div>
    </div>
  );
}

export default LoadingScreen;

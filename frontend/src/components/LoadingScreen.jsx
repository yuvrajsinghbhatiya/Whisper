import React from "react";

function LoadingScreen() {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-900">
      <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-accent"></div>
    </div>
  );
}

export default LoadingScreen;

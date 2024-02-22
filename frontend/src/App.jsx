import React, { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import LoadingScreen from "./components/LoadingScreen";
import "./index.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [timeoutId, setTimeoutId] = useState(null); // Define timeoutId state

  const handleLogin = (username, pic) => {
    localStorage.setItem("user", username);
    setUser(username);
    resetTimeout();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    clearTimeout(timeoutId);
  };

  const resetTimeout = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      handleLogout();
    }, 5 * 60 * 1000);
    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }

    const storedDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
    if (storedDarkTheme !== null) {
      setIsDarkTheme(storedDarkTheme);
    }

    resetTimeout();

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleUserActivity = () => {
    resetTimeout();
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      onMouseMove={handleUserActivity}
      onClick={handleUserActivity}
    >
      {isLoading ? (
        <LoadingScreen
          isDarkTheme={isDarkTheme}
        />
      ) : (
        <>
          <Navbar
            user={user}
            onLogout={handleLogout}
            setIsDarkTheme={setIsDarkTheme}
            isDarkTheme={isDarkTheme}
          />
          <div className="flex flex-grow bg-gray-100">
            {user ? (
              <Chat
                user={user}
                setIsDarkTheme={setIsDarkTheme}
                isDarkTheme={isDarkTheme}
              />
            ) : (
              <LoginForm onLogin={handleLogin} isDarkTheme={isDarkTheme} />
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

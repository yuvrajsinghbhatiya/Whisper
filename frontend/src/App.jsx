import { useState, useEffect } from "react";
import Chat from "./components/Chat";
import Navbar from "./components/Navbar";
import LoginForm from "./components/LoginForm";
import "./index.css";

function App() {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [user, setUser] = useState(null);
  const [profilePic, setProfilePic] = useState(null);

  const handleLogin = (username, pic) => {
    localStorage.setItem("user", username);
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("profilePic"); // Remove profile pic from local storage on logout
    setUser(null);
    setProfilePic(null);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }

    const storedProfilePic = localStorage.getItem("profilePic");
    if (storedProfilePic) {
      setProfilePic(storedProfilePic);
    }

    const storedDarkTheme = JSON.parse(localStorage.getItem("darkTheme"));
    if (storedDarkTheme !== null) {
      setIsDarkTheme(storedDarkTheme);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        user={user}
        profilePic={profilePic}
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
    </div>
  );
}

export default App;

import { useState } from "react";
import PropTypes from "prop-types";

const url = "https://whisper-b.onrender.com";
// const url = "http://localhost:5000";

function LoginForm({ onLogin, isDarkTheme }) {
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.trim() !== "") {
      try {
        const response = await fetch(`${url}/api/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        });

        if (!response.ok) {
          throw new Error("Failed to login");
        }

        // Log the response from the server
        const responseData = await response.json();
        console.log("Response:", responseData);

        // Assuming the response contains a message indicating success
        onLogin(username);
      } catch (error) {
        console.error("Error logging in:", error);
      }
    }
  };

  return (
    <div
      className={`w-screen h-auto  flex items-center justify-center p-4 ${
        isDarkTheme ? "darkbg text-white " : "lightbg text-gray-800"
      }`}
    >
      <div
        className={`w-96 p-6 rounded-lg shadow-xl ${
          isDarkTheme ? "bg-neutral-800" : "bg-white"
        }`}
      >
        <h2
          className={`text-2xl mb-8 font-bold text-center ${
            isDarkTheme ? "text-white" : "text-gray-800"
          }`}
        >
          Welcome to Whisper
          <br />
          <span className="text-sm font-medium text-gray-500">
            login or signup here
          </span>
        </h2>
        <hr className="mb-6 border border-gray-500" />
        <form onSubmit={handleSubmit}>
          <label
            htmlFor="profilePic"
            className={`block mt-8 ${
              isDarkTheme ? "text-white" : "text-gray-800"
            }`}
          >
            Enter your Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="must be unique..."
            className={`w-full p-2 rounded outline-none mt-2 ${
              isDarkTheme
                ? "bg-neutral-700 text-white"
                : " border bg-gray-100 text-black"
            }`}
          />

          <button
            type="submit"
            className="w-full mt-8 rounded py-2 text-lg bg-accent text-white font-semibold hover:bg-accentDark"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
  isDarkTheme: PropTypes.bool,
};

export default LoginForm;

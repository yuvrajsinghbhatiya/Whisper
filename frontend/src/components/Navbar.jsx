import { useState } from "react";
import PropTypes from "prop-types";
import { FaSun, FaMoon } from "react-icons/fa";
import avatar from "../images/avatar.png";
import logo from "../images/logo.png";

function Navbar({ user, onLogout, isDarkTheme, setIsDarkTheme }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem("darkTheme", JSON.stringify(newDarkTheme));
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    setTimeout(() => {
      setShowDropdown(false);
    }, 3000);
  };

  return (
    <nav
      className={`py-3 ${
        isDarkTheme ? "bg-neutral-900" : "bg-white"
      } shadow-xl`}
    >
      <div className="px-10 mx-auto flex justify-between items-center ">
        <div className="flex items-center">
          <img
            src={logo}
            alt="Logo"
            className="mr-2 mt-2"
            width={28}
            height={28}
          />{" "}
          <h1
            className={`text-2xl font-bold ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            Whisper
          </h1>
        </div>

        <div className="flex space-x-4 items-center">
          <button
            onClick={toggleDarkTheme}
            className={`px-4 py-2 rounded-full ${
              isDarkTheme
                ? "bg-neutral-700 text-white font-semibold hover:bg-neutral-800 hover:text-white"
                : "bg-gray-200 text-gray-700 font-semibold hover:bg-gray-500 hover:text-white"
            }`}
          >
            {isDarkTheme ? <FaSun /> : <FaMoon />}
          </button>
          {user && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center p-2 rounded-full relative"
              >
                <img
                  src={avatar}
                  alt="User Avatar"
                  width={32}
                  height={32}
                  className="w-8 h-8 rounded-full mr-2 transform hover:scale-110 transition-transform duration-300"
                />
              </button>

              {showDropdown && (
                <div
                  className={`absolute right-0 w-32 ${
                    isDarkTheme ? "bg-neutral-800" : "bg-white"
                  }  rounded-lg shadow-lg p-2 `}
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`block mb-2 text-md text-center font-bold ${
                        isDarkTheme
                          ? "text-white bg-neutral-700"
                          : "text-gray-700 bg-slate-200"
                      } w-full p-2 rounded-lg `}
                    >
                      {user}
                    </span>
                    <button
                      onClick={onLogout}
                      className={`block  text-md text-center font-bold ${
                        isDarkTheme
                          ? "text-white bg-neutral-700 hover:bg-neutral-600"
                          : "text-gray-700 bg-slate-200 hover:bg-slate-300"
                      } w-full p-2 rounded-lg `}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  user: PropTypes.string,
  profilePic: PropTypes.string,
  onLogout: PropTypes.func,
  isDarkTheme: PropTypes.bool,
  setIsDarkTheme: PropTypes.func,
};

export default Navbar;

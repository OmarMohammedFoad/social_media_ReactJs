// src/components/ThemeToggle.jsx
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full focus:outline-none"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <Sun className="text-yellow-300" size={20} />
      ) : (
        <Moon className="text-gray-700" size={20} />
      )}
    </button>
  );
};
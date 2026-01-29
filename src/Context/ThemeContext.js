import React, { createContext, useContext, useState, useEffect } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../Styles/themes";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Load theme from local storage
  useEffect(() => {
    const savedTheme = localStorage.getItem("app-theme");
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      setTheme("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("app-theme", newTheme);
  };

  const currentThemeObj = theme === "light" ? lightTheme : darkTheme;

  // Actualizar variables CSS globales para componentes que no usan styled-components (como PrimeReact)
  useEffect(() => {
    const root = document.documentElement;
    const colors = currentThemeObj.colors;

    root.style.setProperty("--primary-color", colors.primary);
    root.style.setProperty("--background-color", colors.background);
    root.style.setProperty("--surface-color", colors.surface);
    root.style.setProperty("--text-color", colors.text);
    root.style.setProperty("--border-color", colors.border);
    root.style.setProperty("--input-bg", colors.inputBg);
    root.style.setProperty("--card-bg", colors.cardBg);

    // Update PrimeReact specific vars override if needed
    if (theme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [theme, currentThemeObj]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <StyledThemeProvider theme={currentThemeObj}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

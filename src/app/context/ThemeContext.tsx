"use client";

import React from "react";

type Theme = "light" | "dark";
type Context = {
  theme: Theme;
  toggleTheme: () => void;
};

export const ThemeContext = React.createContext<Context>({
  theme: "dark",
  toggleTheme: () => {},
});

export const setBodyTheme = (theme: Theme) => {
  const body = document.body;
  body.classList.remove("theme--light", "theme--dark");
  body.classList.add(theme === "dark" ? "theme--dark" : "theme--light");
  document.documentElement.setAttribute("theme", theme);
};

type ProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ProviderProps) => {
  const [theme, setTheme] = React.useState<Theme>("light");

  const toggleTheme = () => {
    const val = theme === "light" ? "dark" : "light";
    setTheme(val);
    window.localStorage.setItem("ui.theme", val);
  };

  React.useEffect(() => {
    setBodyTheme(theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const { toggleTheme, theme } = React.useContext(ThemeContext);
  return { toggleTheme, theme };
};

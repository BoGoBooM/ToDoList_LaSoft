import React, { createContext, useState, type ReactNode } from 'react';

const themes = {
  light: {
    background: "#FFF",
    cardBG: "#FFF",
    textFirst: "#1A1A1A",
    textSecond: "#293241",
    textThird: "#0D3B66",
    button: "#007BFF",
    buttonText: "#FFF",
    todosText: "#000"
  },
  dark: {
    background: "#222",
    cardBG: "#333",
    textFirst: "#1A1A1A",
    textSecond: "#EBE7E6",
    textThird: "#F0F8FF",
    button: "#495057",
    buttonText: "#EBEBEB",
    todosText: "#FFF"
  },
};

type Theme = typeof themes.light;

type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext<ThemeContextType>({
  theme: themes.light,
  toggleTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(themes.light);

  const toggleTheme = () => {
    setTheme(prev => (prev === themes.light ? themes.dark : themes.light));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

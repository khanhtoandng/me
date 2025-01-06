import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { motion } from "framer-motion";

interface ThemeContextType {
  theme: "light" | "dark" | "system";
  setTheme: React.Dispatch<React.SetStateAction<"light" | "dark" | "system">>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system");

  useEffect(() => {
    const savedTheme = localStorage.getItem("pageMode") as
      | "light"
      | "dark"
      | "system";
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("pageMode", theme);

    // Set body class based on the selected theme
    if (theme === "light") {
      document.body.classList.add("light");
      document.body.classList.remove("dark");
    } else if (theme === "dark") {
      document.body.classList.add("dark");
      document.body.classList.remove("light");
    } else if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      document.body.classList.add(systemTheme);
      document.body.classList.remove(systemTheme === "dark" ? "light" : "dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <StyledThemeProvider
        theme={{
          mode:
            theme === "system"
              ? window.matchMedia("(prefers-color-scheme: dark)").matches
                ? "dark"
                : "light"
              : theme,
        }}
      >
        <motion.div
          key={theme} // Changing the key will trigger the animation
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }} // Set the duration of the transition
        >
          {children}
        </motion.div>
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { getTheme, themeCssVariables } from "../Styles/themes";

const ThemeContext = createContext();

export const THEME_STORAGE_KEY = "app-theme";

export const useTheme = () => useContext(ThemeContext);

const isValidTheme = (value) => value === "light" || value === "dark";

/**
 * Resolves the initial theme synchronously so the first paint already matches
 * the final theme. Reading it in an effect instead would flash the wrong theme.
 */
const resolveInitialTheme = () => {
  const stored = window.localStorage?.getItem(THEME_STORAGE_KEY);
  if (isValidTheme(stored)) {
    return stored;
  }

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")
    .matches;

  return prefersDark ? "dark" : "light";
};

/**
 * Writes the theme's tokens as inline custom properties on `documentElement`.
 *
 * Inline styles outrank the `:root` declarations shipped by the PrimeReact
 * theme stylesheet, so this is what makes PrimeReact components respect the
 * active theme. `data-theme` is exposed on the same element for CSS that needs
 * to branch on the theme rather than read a token.
 */
const applyThemeToDocument = (themeName) => {
  const root = document.documentElement;

  root.setAttribute("data-theme", themeName);
  root.style.colorScheme = themeName;

  const variables = themeCssVariables(themeName);
  Object.entries(variables).forEach(([property, value]) => {
    root.style.setProperty(property, value);
  });
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  // Follow the OS preference only while the user has made no explicit choice.
  useEffect(() => {
    const query = window.matchMedia?.("(prefers-color-scheme: dark)");
    if (!query?.addEventListener) {
      return undefined;
    }

    const handleChange = (event) => {
      const stored = window.localStorage?.getItem(THEME_STORAGE_KEY);
      if (isValidTheme(stored)) {
        return;
      }
      setTheme(event.matches ? "dark" : "light");
    };

    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  /**
   * Cross-fades the theme switch.
   *
   * The colour transition is enabled only while the switch is in flight —
   * leaving it on permanently would make every hover repaint the whole tree.
   * Users who asked for reduced motion get the instant switch.
   */
  const runWithCrossFade = useCallback((change) => {
    const root = document.documentElement;
    const prefersReducedMotion = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      change();
      return;
    }

    root.classList.add("theme-transition");
    change();
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
  }, []);

  const toggleTheme = useCallback(() => {
    runWithCrossFade(() =>
      setTheme((current) => {
        const next = current === "light" ? "dark" : "light";
        window.localStorage?.setItem(THEME_STORAGE_KEY, next);
        return next;
      })
    );
  }, [runWithCrossFade]);

  const styledTheme = useMemo(() => getTheme(theme), [theme]);

  const contextValue = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === "dark" }),
    [theme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <StyledThemeProvider theme={styledTheme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

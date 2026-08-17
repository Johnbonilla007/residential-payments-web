/**
 * Single source of truth for design tokens.
 *
 * Every color in the app must resolve to one of these tokens. The same values
 * feed two consumers:
 *
 *   1. `styled-components` — via the `ThemeProvider` (`props.theme.colors.*`).
 *   2. PrimeReact — via CSS custom properties written to `documentElement`.
 *
 * The custom property names intentionally mirror PrimeReact's own token layer.
 * PrimeReact themes declare those names on `:root`; writing them as inline
 * styles on `documentElement` wins on specificity, so the whole component
 * library follows the active theme without swapping theme stylesheets.
 */

const light = {
  mode: "light",
  colors: {
    // Brand
    primary: "#002147",
    primaryHover: "#003366",
    primaryText: "#ffffff",
    secondary: "#667eea",

    // Surfaces, from furthest back to closest to the reader
    ground: "#f4f6f9",
    section: "#ffffff",
    card: "#ffffff",
    overlay: "#ffffff",
    hover: "#f1f5f9",
    border: "#d5dbe3",
    /**
     * Boundary of an interactive control (input, dropdown, checkbox).
     *
     * WCAG 1.4.11 requires 3:1 against the adjacent surface for a boundary that
     * identifies a control, which `border` deliberately does not meet — that
     * one is for decorative dividers, where the requirement does not apply.
     */
    controlBorder: "#8a8e94",

    // Text
    text: "#1f2937",
    textSecondary: "#5b6775",
    textOnPrimary: "#ffffff",

    // Selection / focus
    highlightBg: "#e3ecf7",
    highlightText: "#002147",
    focusRing: "0 0 0 3px rgba(0, 33, 71, 0.2)",
    maskBg: "rgba(15, 23, 42, 0.45)",

    // Status
    error: "#d32f2f",
    success: "#2e7d32",
    warning: "#b26a00",
    info: "#0277bd",

    // Chrome
    navBackground: "#002147",
    navText: "#ffffff",
    navGradient: "linear-gradient(135deg, #001f3f 0%, #003366 100%)",
    groundGradient: "linear-gradient(135deg, #f5f7fa 0%, #e8eef5 100%)",
    surfaceGradient: "linear-gradient(to bottom, #ffffff, #fafbfd)",
    highlightGradient: "linear-gradient(135deg, #e8f0ff, #f0f4ff)",
    successGradient: "linear-gradient(135deg, #81c784, #4caf50)",
    infoGradient: "linear-gradient(135deg, #b3e5fc, #81d4fa)",

    // Elevation
    shadowSm: "0 1px 2px rgba(15, 23, 42, 0.06)",
    shadowMd: "0 2px 6px rgba(15, 23, 42, 0.08)",
    shadowLg: "0 8px 20px rgba(15, 23, 42, 0.12)",
  },
};

const dark = {
  mode: "dark",
  colors: {
    primary: "#5b9bd5",
    primaryHover: "#7cb0e0",
    primaryText: "#0b1220",
    secondary: "#818cf8",

    ground: "#0b1220",
    section: "#111c2e",
    card: "#16233a",
    overlay: "#16233a",
    hover: "#1e2f4a",
    border: "#2b3d59",
    controlBorder: "#606e83",

    text: "#e6edf6",
    textSecondary: "#9aa9bd",
    textOnPrimary: "#0b1220",

    highlightBg: "#1e3a5f",
    highlightText: "#e6edf6",
    focusRing: "0 0 0 3px rgba(91, 155, 213, 0.35)",
    maskBg: "rgba(0, 0, 0, 0.65)",

    error: "#ef5350",
    success: "#66bb6a",
    warning: "#ffa726",
    info: "#4fc3f7",

    navBackground: "#0b1220",
    navText: "#e6edf6",
    navGradient: "linear-gradient(135deg, #0b1220 0%, #16233a 100%)",
    groundGradient: "linear-gradient(135deg, #0b1220 0%, #111c2e 100%)",
    surfaceGradient: "linear-gradient(to bottom, #16233a, #111c2e)",
    highlightGradient: "linear-gradient(135deg, #1e3a5f, #16233a)",
    successGradient: "linear-gradient(135deg, #2f6b34, #245029)",
    infoGradient: "linear-gradient(135deg, #1e4a63, #16354a)",

    shadowSm: "0 1px 2px rgba(0, 0, 0, 0.4)",
    shadowMd: "0 2px 6px rgba(0, 0, 0, 0.45)",
    shadowLg: "0 8px 20px rgba(0, 0, 0, 0.55)",
  },
};

/**
 * Adds the key names still used by unmigrated `styled-components` files.
 *
 * These are aliases onto the tokens above, not extra tokens. `hoverBg` is
 * included because three files already referenced it while no theme ever
 * defined it — those rules resolved to `undefined` and were dropped silently.
 * Do not use these names in new code; remove each once its last consumer moves
 * to the token names.
 */
const withLegacyAliases = (theme) => ({
  ...theme,
  colors: {
    ...theme.colors,
    background: theme.colors.ground,
    surface: theme.colors.section,
    surfaceHighlight: theme.colors.hover,
    hoverBg: theme.colors.hover,
    cardBg: theme.colors.card,
    cardShadow: theme.colors.shadowMd,
    dialogBg: theme.colors.overlay,
    inputBg: theme.colors.section,
    inputText: theme.colors.text,
  },
});

export const lightTheme = withLegacyAliases(light);
export const darkTheme = withLegacyAliases(dark);

export const themes = { light: lightTheme, dark: darkTheme };

export const getTheme = (name) => themes[name] || light;

/**
 * Maps a theme to the CSS custom properties written on `documentElement`.
 *
 * Keys prefixed `--surface-`, `--text-`, `--primary-`, `--highlight-`,
 * `--focus-ring` and `--maskbg` are PrimeReact's own tokens: overriding them is
 * what makes PrimeReact components theme-aware. Keys prefixed `--app-` are for
 * application styles that have no PrimeReact equivalent.
 */
export const themeCssVariables = (name) => {
  const { colors } = getTheme(name);

  return {
    // --- PrimeReact token layer ---
    "--primary-color": colors.primary,
    "--primary-color-text": colors.primaryText,
    "--surface-ground": colors.ground,
    "--surface-section": colors.section,
    "--surface-card": colors.card,
    "--surface-overlay": colors.overlay,
    "--surface-hover": colors.hover,
    "--surface-border": colors.border,
    "--app-control-border": colors.controlBorder,
    "--surface-a": colors.card,
    "--surface-b": colors.ground,
    "--surface-c": colors.hover,
    "--surface-d": colors.border,
    "--surface-e": colors.overlay,
    "--surface-f": colors.overlay,
    "--text-color": colors.text,
    "--text-color-secondary": colors.textSecondary,
    "--highlight-bg": colors.highlightBg,
    "--highlight-text-color": colors.highlightText,
    "--focus-ring": colors.focusRing,
    "--maskbg": colors.maskBg,

    // --- Application token layer ---
    "--app-primary": colors.primary,
    "--app-primary-hover": colors.primaryHover,
    "--app-secondary": colors.secondary,
    "--app-nav-bg": colors.navBackground,
    "--app-nav-text": colors.navText,
    "--app-error": colors.error,
    "--app-success": colors.success,
    // Tinted backgrounds for positive/negative figures, readable in both themes.
    "--app-success-soft": `color-mix(in srgb, ${colors.success} 18%, ${colors.card})`,
    "--app-error-soft": `color-mix(in srgb, ${colors.error} 18%, ${colors.card})`,
    "--app-warning": colors.warning,
    "--app-info": colors.info,
    "--app-shadow-sm": colors.shadowSm,
    "--app-shadow-md": colors.shadowMd,
    "--app-shadow-lg": colors.shadowLg,
    "--app-nav-gradient": colors.navGradient,
    "--app-ground-gradient": colors.groundGradient,
    "--app-surface-gradient": colors.surfaceGradient,
    "--app-highlight-gradient": colors.highlightGradient,
    "--app-success-gradient": colors.successGradient,
    "--app-info-gradient": colors.infoGradient,
    /**
     * Text over an arbitrary saturated accent fill (e.g. a caller-supplied card
     * colour). Such fills do not change with the theme, so this token must not
     * either — unlike --primary-color-text, which inverts.
     */
    "--app-on-accent": "#ffffff",

    /**
     * --- Legacy aliases ---
     *
     * Names still referenced by styles that have not been migrated to the
     * token layer yet. They are aliases, not new tokens: do not use them in new
     * code, and delete each one once its last consumer is migrated.
     */
    "--primary-gradient": colors.navGradient,
    "--color-primary": colors.primary,
    "--color-secondary": colors.secondary,
    "--color-dark": colors.text,
    "--color-light": colors.ground,
    "--color-text": colors.text,
    "--color-text-light": colors.textSecondary,
    "--color-border": colors.border,
    "--border-color": colors.border,
    "--card-bg": colors.card,
    "--surface-color": colors.section,
    "--background-color": colors.ground,
    "--input-bg": colors.section,
    "--shadow-sm": colors.shadowSm,
    "--shadow-md": colors.shadowMd,
    "--shadow-lg": colors.shadowLg,
    "--shadow-xl": colors.shadowLg,
    "--shadow-2xl": colors.shadowLg,
  };
};

/** Breakpoints. The only place a media-query width may be defined. */
export const breakpoints = {
  sm: "480px",
  md: "768px",
  lg: "1024px",
  xl: "1280px",
};

export const media = {
  sm: `@media (max-width: ${breakpoints.sm})`,
  md: `@media (max-width: ${breakpoints.md})`,
  lg: `@media (max-width: ${breakpoints.lg})`,
  xl: `@media (max-width: ${breakpoints.xl})`,
};

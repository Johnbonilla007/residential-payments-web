/**
 * Standardized responsive PrimeReact Dialog sizing helpers.
 *
 * `fullScreenOnMobile: true` attaches `.dialog--fullscreen-mobile` (handled by
 * GlobalStyles under `max-width: 767px`) so long forms and detail views open
 * edge-to-edge (`100dvh`) with sticky header/footer and native-feeling scroll.
 */
export const dialogSizing = (
  maxRem = 36,
  { fullScreenOnMobile = false } = {},
) => ({
  style: {
    width: `min(${maxRem}rem, 94vw)`,
    maxWidth: "94vw",
  },
  breakpoints: {
    "1200px": "88vw",
    "960px": "92vw",
    "767px": fullScreenOnMobile ? "100vw" : "96vw",
  },
  className: fullScreenOnMobile ? "dialog--fullscreen-mobile" : "",
});

export const DIALOG_CONTENT_STYLE = {
  maxHeight: "70vh",
  overflowY: "auto",
};

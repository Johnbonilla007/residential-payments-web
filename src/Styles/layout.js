/**
 * Layout measurements shared by the chrome components.
 *
 * The sidebar width lives in three places at once: the react-pro-sidebar props,
 * the CSS that offsets the page content, and the CSS that offsets the top bar.
 * When they were separate literals they drifted, and the sidebar covered the
 * left edge of the content. Import from here instead of retyping a number.
 */
export const SIDEBAR_WIDTH = 260;
export const SIDEBAR_COLLAPSED_WIDTH = 70;
/**
 * Real rendered height of the fixed top bar (logo 50px + .app-icon padding +
 * .p-menubar padding). It was 90 while the bar rendered ~106, so the content's
 * top offset fell short and the first row slid under the header.
 */
export const HEADER_HEIGHT = 106;

export const px = (value) => `${value}px`;

/**
 * Below this width the sidebar becomes an overlay drawer and the content takes
 * the full width. It must match the breakpoint the resize handler in
 * AppSideBar uses to flip `showMenuOnMobile`, otherwise there is a band of
 * widths where the sidebar overlaps the content instead of covering it.
 */
export const MOBILE_BREAKPOINT = 768;

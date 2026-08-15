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
 * Real rendered height of the fixed top bar now that the logo is in the sidebar.
 */
export const HEADER_HEIGHT = 60;

/**
 * On mobile the top bar shrinks slightly.
 */
export const HEADER_HEIGHT_MOBILE = 60;

export const px = (value) => `${value}px`;

/**
 * Below this width the sidebar becomes an overlay drawer and the content takes
 * the full width. It must match the breakpoint the resize handler in
 * AppSideBar uses to flip `showMenuOnMobile`, otherwise there is a band of
 * widths where the sidebar overlaps the content instead of covering it.
 */
export const MOBILE_BREAKPOINT = 768;

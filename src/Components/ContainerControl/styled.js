import styled from "styled-components";
import {
  HEADER_HEIGHT,
  SIDEBAR_COLLAPSED_WIDTH,
  SIDEBAR_WIDTH,
  px,
} from "../../Styles/layout";
import { media } from "../../Styles/themes";

export const ContainerControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  /**
   * The offset must equal the sidebar's real width, which is why both read the
   * same constant. A hardcoded 200px here against a 260px sidebar left the
   * sidebar covering the first 60px of every page.
   */
  ${({ authenticate, showSideBar, showMenuOnMobile }) => {
    if (!authenticate) return "";

    const left = showMenuOnMobile
      ? px(showSideBar ? SIDEBAR_WIDTH : SIDEBAR_COLLAPSED_WIDTH)
      : px(showSideBar ? SIDEBAR_WIDTH : 0);

    return `
      position: absolute;
      top: ${px(HEADER_HEIGHT)};
      right: 0;
      bottom: 0;
      left: ${left};
    `;
  }}

  /* Below the mobile breakpoint the sidebar overlays, so content spans fully. */
  ${media.md} {
    left: 0 !important;
  }

  overflow: auto;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  transition:
    left var(--transition-base),
    background-color var(--transition-base),
    color var(--transition-base);

  .content {
    flex: 1;
    overflow: auto;
    padding: 10px;
    height: 100%;
    width: 100%;
  }
`;

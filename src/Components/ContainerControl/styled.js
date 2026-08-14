import styled from "styled-components";

export const ContainerControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  ${({ authenticate, showSideBar, showMenuOnMobile }) => {
    if (authenticate && showMenuOnMobile) {
      return `position: absolute;  top: 90px;   right: 0;  bottom: 0;  left:  ${
        showSideBar ? "200px" : "70px"
      };`;
    }

    if (authenticate && !showMenuOnMobile) {
      return `position: absolute;  top: 90px;  right: 0; bottom: 0;  
      left: ${showSideBar ? "200px" : "0"};`;
    }
  }}
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

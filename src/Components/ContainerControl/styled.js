import styled from "styled-components";

export const ContainerControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f6;
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
  transition:
    left 0.5s ease,
    color 0.5s ease;

  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};

  .content {
    flex: 1;
    overflow: auto;
    padding: 10px;
    height: 100%;
    width: 100%;
  }
`;

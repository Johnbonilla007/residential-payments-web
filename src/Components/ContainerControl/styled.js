import styled from "styled-components";

export const ContainerControlStyled = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f5f5f6;
  ${({ authenticate, showSideBar, showMenuOnMobile }) => {
    if (authenticate && showMenuOnMobile) {
      return `position: absolute;  top: 70px;   right: 0;  bottom: 0;  left:  ${
        showSideBar ? "200px" : "70px"
      };`;
    }

    if (authenticate && !showMenuOnMobile) {
      return `position: absolute;  top: 70px;  right: 0; bottom: 0;  
      left: ${showSideBar ? "200px" : "0"};`;
    }
  }}
  overflow: auto;
  transition: left 0.5s ease, color 0.5s ease;

  background-color: #f8f8f2; /* Softer ivory off-white */
  color: #333333; /* Slightly softened black for text readability */

  .content {
    flex: 1;
    overflow: auto;
    padding: 10px;
    height: 100%;
    width: 100%;
  }
`;

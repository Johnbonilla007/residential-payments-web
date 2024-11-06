import styled from "styled-components";

export const ListControlStyled = styled.div`
  .list-control {
    position: fixed;
    left: 0;
    top: 0;
    margin-top: 115px;
    height: calc(100% - 135px);
    background-color: #f8f9fa;
    border-right: 1px solid #ddd;
    padding: 10px;
    box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    overflow-y: auto;
  }

  .list-control ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  .list-control li {
    padding: 10px;
    border-bottom: 1px solid #ddd;
  }

  .list-control li:hover {
    background-color: #e9ecef;
    cursor: pointer;
  }
  .container-items {
    background-color: #fff;
    height: calc(100% - 40px);
    border-radius: 10px;
    overflow: auto;
    scrollbar-width: thin; /* Para Firefox */
    scrollbar-color: #009929 #fff; /* Para Firefox */
  }
`;

import styled from "styled-components";

export const ReportContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  padding: 30px;
  max-height: 85vh;
  overflow-y: auto;
  margin-top: 10px;

  /* Scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c1c1c1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a8a8a8;
  }

  .item {
    height: 100%;
    /* Eliminamos max-width/height para dejar que el grid controle el tamaño */
  }
`;

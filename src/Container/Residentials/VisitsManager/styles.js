import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";

export const VisitsManagerStyled = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1rem;
  align-items: center;
  justify-content: space-around;

  @media (max-width: 768px) {
    gap: 1rem;
    padding: 0.5rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }

    .p-inputtext,
    .p-dropdown,
    .p-button {
      flex-grow: 1;
      min-width: 150px;

      @media (max-width: 768px) {
        min-width: 100%;
      }
    }

    .p-calendar {
      width: 100%;

      @media (min-width: 768px) {
        max-width: 250px;
      }
    }

    .p-float-label {
      flex-grow: 1;
    }

    button {
      align-self: flex-end;

      @media (min-width: 768px) {
        align-self: center;
        max-width: 150px;
      }
    }
  }

  h4 {
    margin-top: 1rem;
    font-size: 1.5rem;
    color: #333;

    @media (max-width: 768px) {
      font-size: 1.25rem;
      text-align: center;
    }
  }

  p {
    text-align: center;
    font-size: 1rem;
    color: #555;

    @media (max-width: 768px) {
      font-size: 0.9rem;
    }
  }

  .table-container {
    margin-top: 2rem;
    overflow-x: auto;

    @media (max-width: 768px) {
      margin-top: 1rem;

      .p-datatable {
        flex-direction: row;
      }
    }

    .p-datatable {
      display: flex;
      flex-direction: column;
    }

    .p-paginator {
      max-height: 100px;
    }
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const UserFilter = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const DateFilter = styled.div`
  width: 100%;
  margin-bottom: 15px;
`;

export const UserGroup = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 10px;

  @media (max-width: 768px) {
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 10px;
  }
`;

export const ButtonFullWidth = styled(Button)`
  width: 100%;
`;

export const TableStyled = styled.div`
  width: 100%;
  overflow-x: auto;

  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
    text-align: left;
    background-color: #fff;

    th,
    td {
      padding: 0.8rem;
      text-align: left;
      border-bottom: 1px solid #ddd;
      white-space: nowrap;
    }

    th {
      background-color: #f7f7f7;
      font-weight: bold;
      color: #333;
    }

    tr:nth-child(even) {
      background-color: #f9f9f9;
    }

    tr:hover {
      background-color: #f1f1f1;
    }

    @media (max-width: 768px) {
      font-size: 0.8rem;

      th,
      td {
        padding: 0.6rem;
      }
    }
  }
`;

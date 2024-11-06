import styled from 'styled-components';

export const AccountManagerModalStyled = styled.div`
  .account-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
  }

  .account-item {
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 10px;
  }

  .manager-checkbox {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .checkbox-label {
    font-size: 1rem;
    font-weight: 500;
    color: #333;
  }
`;

import styled from "styled-components";

export const PartialPaymentModalStyled = styled.div`
 .payment-form {
    max-width: 400px;
    margin: 0 auto;
    padding: 2rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-field {
    margin-bottom: 1.5rem;
}

.form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #333;
}

.form-field .p-inputtext,
.form-field .p-dropdown {
    width: 100%;
}

.form-field .p-button {
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
}

`;

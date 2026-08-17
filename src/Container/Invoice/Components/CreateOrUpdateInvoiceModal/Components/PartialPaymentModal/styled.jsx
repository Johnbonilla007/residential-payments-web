import styled from "styled-components";

export const PartialPaymentModalStyled = styled.div`
 .payment-form {
    width: 100%;
    max-width: 480px;
    margin: 0 auto;
    padding: 2rem;
    background-color: var(--surface-card);
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-field {
    margin-bottom: 1.5rem;
}

@media (max-width: 768px) {
    .payment-form {
        padding: 1.25rem;
    }

    .form-field {
        margin-bottom: 1rem;
    }
}

@media (max-width: 480px) {
    .payment-form {
        padding: 1rem;
    }
}

.form-field label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: var(--text-color);
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

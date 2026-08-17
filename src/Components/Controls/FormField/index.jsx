import React, { useId } from "react";
import { FormFieldStyled } from "./styled";

/**
 * Wraps a single PrimeReact control with its label and validation message.
 *
 * The project standardises on PrimeReact's floating label. Going through this
 * component keeps three things consistent that were previously repeated at each
 * call site and drifted apart:
 *
 *   - the label markup (a floating label needs the control as its sibling, and
 *     an id/htmlFor pair to be announced by screen readers);
 *   - the control filling its container instead of carrying an inline width;
 *   - where the validation message sits, so a field appearing does not shift
 *     the fields around it.
 *
 * A floating label and a placeholder describe the same thing twice, so pass the
 * text here and leave the control's `placeholder` unset.
 *
 * @param {string} label Visible field label.
 * @param {(id: string) => React.ReactNode} children Renders the control; call
 *   it with the generated id and spread that onto the control.
 * @param {string} [error] Validation message; also marks the field invalid.
 * @param {boolean} [fullWidth] Span every column of the parent grid.
 * @param {string} [htmlFor] Explicit control id, when the caller owns it.
 */
export const FormField = ({
  label,
  children,
  error,
  fullWidth = false,
  htmlFor,
  className = "",
}) => {
  const generatedId = useId();
  const fieldId = htmlFor || generatedId;

  return (
    <FormFieldStyled
      className={`${fullWidth ? "form-field--full" : ""} ${
        error ? "form-field--invalid" : ""
      } ${className}`.trim()}
    >
      <span className="p-float-label">
        {children(fieldId)}
        <label htmlFor={fieldId}>{label}</label>
      </span>
      {error && (
        <small className="form-field__error" role="alert">
          {error}
        </small>
      )}
    </FormFieldStyled>
  );
};

export default FormField;

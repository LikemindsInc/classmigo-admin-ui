import { styled } from "styled-components";
import { ErrorIcon } from "../../Assets/Svgs";
import { devices } from "../../utils/mediaQueryBreakPoints";

interface InputProps {
  placeholder?: string;
  type?: string;
  label?: string;
  error?: any;
  register?: any;
  id?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: () => void;
}

export const InputElement = ({
  placeholder,
  type,
  label,
  error,
  register,
  id,
  disabled,
  value,
  onChange,
  ...otherProps
}: InputProps | any) => {
  return (
    <>
      {type === "password" && (
        <InputHolder>
          {label && <label>{label}</label>}
          <TextInput
            {...otherProps}
            value={value}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            {...(register && { ...register(id) })}
          />
          {error && id ? (
            <ErrorContainer>
              {error[id]?.message && <Error />}
              <p>{error[id]?.message}</p>
            </ErrorContainer>
          ) : null}
        </InputHolder>
      )}
      {!type && (
        <InputHolder>
          <label>{label}</label>
          <TextInput
            value={value}
            type={type}
            disabled={disabled}
            placeholder={placeholder}
            onChange={onChange}
            {...(register && { ...register(id) })}
          />
          {error && id ? (
            <ErrorContainer>
              {error[id]?.message && <Error />}
              <p>{error[id]?.message}</p>
            </ErrorContainer>
          ) : null}
        </InputHolder>
      )}
    </>
  );
};

// Styles
const TextInput = styled.input`
  width: fill;
  border-color: var(--primary-color);
  border-width: 1px;
  padding: 8px 20px;
  outline: none;
  font-size: 14px;
  font-weight: ${({ disabled }) => (disabled ? 700 : 500)};
  border: ${({ disabled }) =>
    disabled ? "1px solid #EED7FF" : "1px solid #7b31b2"};
  border-radius: 5px;
  color: ${({ disabled }) => (disabled ? "gray" : "black")};
  background-color: ${({ disabled }) =>
    disabled ? "var(--dashboardBackground)" : "transparent"};
  &:focus {
    border: 1px solid #7b31b2;
    -webkit-box-shadow: 0 0 0 2px rgba(123, 49, 178, 0.3);
    box-shadow: 0 0 0 2px rgba(123, 49, 178, 0.3);
  }
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  width: 100%;

  label {
    font-weight: 600;
    font-size: 0.8rem;
  }
  div {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  p {
    font-size: 0.8rem;
    color: red;
  }
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;
const ErrorContainer = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  /* z-index: 2; */
  p {
    font-size: 0.7rem !important;
  }
`;

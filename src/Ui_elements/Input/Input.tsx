import { styled } from "styled-components";
import { Input } from "antd";
import { ErrorIcon } from "../../Assets/Svgs";

interface InputProps {
  placeholder?: string;
  type?: string;
  label?: string;
  error?: any;
  register?: any;
  id?: string;
}

export const InputElement = ({
  placeholder,
  type,
  label,
  error,
  register,
  id,
  ...otherProps
}: InputProps) => {
  return (
    <>
      {type === "password" && (
        <InputHolder>
          <label>{label}</label>
          <TextInput
            {...otherProps}
            type={type}
            placeholder={placeholder}
            {...register(id)}
          />
          {error && id ? (
            <div>
              {error[id]?.message && <Error />}
              <p>{error[id]?.message}</p>
            </div>
          ) : null}
        </InputHolder>
      )}
      {!type && (
        <InputHolder>
          <label>{label}</label>
          <TextInput placeholder={placeholder} {...register(id)} />
          {error && id ? (
            <div>
              {error[id]?.message && <Error />}

              <p>{error[id]?.message}</p>
            </div>
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
  padding: clamp(0.5rem, 30vw, 1rem);
  outline: none;
  border: 1px solid #7b31b2;
  border-radius: 5px;
  &:focus {
    border: 1px solid #7b31b2;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-weight: 600;
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
`;

const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;

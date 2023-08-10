import { styled } from "styled-components";
import { Input } from "antd";


interface InputProps {
  placeholder?: string;
  label?: string;
  handleChange: (e: any) => void;
  value: string | number;
}

const { TextArea } = Input;

export const TextAreaInput = ({
  placeholder,
  label,
  value,
  handleChange,
}: InputProps) => {
  return (
    <>
      <InputHolder>
        <label>{label}</label>
        <TextInput
          placeholder={placeholder}
          allowClear
          onChange={handleChange}
          value={value}
        />
      </InputHolder>
    </>
  );
};

// Styles
const TextInput = styled(TextArea)`
  height: 6rem;
  width: fill;
  border-color: var(--primary-color);
  border-width: 1px;
  padding: clamp(0.5rem, 30vw, 1rem);
  color: var(--primary-color);
  :hover {
    border-width: 2px;
    border-color: var(--primary-color) !important;
  }

  :focus {
    border-color: var(--primary-color);
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.2);
  }
`;

const InputHolder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;

  label {
    font-weight: 600;
    font-size: 0.8rem;
    color: var(--primary-color);
  }
`;

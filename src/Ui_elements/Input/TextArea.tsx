import { styled } from "styled-components";
import { Input } from "antd";
import { SendFileIcon, SendIcon } from "../../Assets/Svgs";
import { ButtonElement } from "../Button/Button";
import { useState } from "react";

interface InputProps {
  placeholder?: string;
  wordCount?: number;
  label?: string;
  messages: any[];
  onSend: (e: any) => void;
}

const { TextArea } = Input;

export const TextAreaElement = ({
  placeholder,
  wordCount,
  label,
  messages,
  onSend,
}: InputProps) => {
  const [message, setMessage] = useState("");

  const handleMessage = (e: any) => {
    setMessage(e.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      onSend(message);
      setMessage("");
    }
  };

  return (
    <>
      <InputHolder>
        <label>{label}</label>
        <TextInput
          showCount
          placeholder={placeholder}
          maxLength={wordCount}
          allowClear
          onChange={handleMessage}
          value={message}
        />
        <SendContainer>
          <SendIconStyled />
          <ButtonElement
            onClick={handleSubmit}
            label="Send"
            icon={<SendIcon />}
            width={100}
          />
        </SendContainer>
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

const SendContainer = styled.div`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 200;
  display: flex;
  align-items: center;
  gap: 1rem;
  button {
    font-size: 0.8rem;
    padding: 0.5rem 1rem;
  }
`;

const SendIconStyled = styled(SendFileIcon)`
  cursor: pointer;
`;

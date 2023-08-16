import { styled } from "styled-components";
import { Input } from "antd";
import { SendFileIcon, SendIcon } from "../../Assets/Svgs";
import { ButtonElement } from "../Button/Button";
import { useState } from "react";

interface InputProps {
  placeholder?: string;
  wordCount?: number;
  label?: string;
  messages?: any[];
  onSend?: (e: any) => void;
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

  const handleMessageChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setMessage(event.target.value);
  };

  const handleSubmit = () => {
    if (message.trim() !== "") {
      // onSend(message);
      setMessage("");
    }
  };


  return (
    <>
      <InputHolder>
        <StyledTextArea
          rows={1}
          value={message}
          onChange={handleMessageChange}
          placeholder={placeholder}
        />
        <WordCount>{message.length}</WordCount>

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

const InputHolder = styled.div`
  position: relative;
  height: 10rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid #eed7ff;
  &:focus-within {
    border: 1px solid var(--primary-color);
  }
`;

const WordCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #888;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  resize: none;
  overflow: hidden;
  height: 100%;
  border-radius: 5px;
  border: none;
  outline: none;
  font-size: 14px;

  &:focus {
    border: none;
    outline: none;
  }
`;

const SendIconStyled = styled(SendFileIcon)`
  cursor: pointer;
`;

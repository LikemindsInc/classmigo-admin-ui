import { useState } from "react";
import styled from "styled-components";

interface TextAreaProps {
  width?: number;
  placeholder?: string;
  label?: string;
  register?: any;
  id?: string;
}
export const TextAreaInput = ({
  width,
  placeholder,
  label,
  register,
  id,
}: TextAreaProps) => {
  // const [text, setText] = useState("");
  // console.log(width);
  // const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
  //   setText(event.target.value);
  // };
  // const wordCount = text.length;

  return (
    <>
      <Label>{label}</Label>
      <TextAreWrapper>
        <StyledTextArea
          width={width}
          // value={text}
          // onChange={handleTextChange}
          placeholder={placeholder}
          {...(register && { ...register(id) })}

          // style={{
          //   height: `calc(${text.split("\n").length} * 1.5em)`,
          // }}
        />
        {/* <WordCount>{wordCount}</WordCount> */}
      </TextAreWrapper>
    </>
  );
};

const TextAreWrapper = styled.div`
  position: relative;
  height: 10rem;
  outline: none;
  border-radius: 5px;
  border: 1px solid #eed7ff;
  &:focus-within {
    border: 1px solid var(--primary-color);
  }
`;
const StyledTextArea = styled.textarea<{ width?: number }>`
  width: ${({ width }) => (width ? width + "px" : "100%")};
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

const WordCount = styled.div`
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-size: 12px;
  color: #888;
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.8rem;
  margin-bottom: 1rem !important;
`;

import React, { useRef, useState } from "react";
import styled from "styled-components";
import { UploadIcon } from "../../Assets/Svgs";
import { devices } from "../../utils/mediaQueryBreakPoints";
import { ButtonElement } from "../Button/Button";

interface ImageInputProps {
  onChange?: (file: File | null) => void;
  title?: string;
}

export const ImageInput = ({ onChange, title }: ImageInputProps) => {
  const fileInputRef = useRef<any>(null);
  const [preview, setPreview] = useState("");

  const handleInputChange = (event: any) => {
    const file = event.target.files?.[0] || null;
    // console.log(URL.createObjectURL(file))
    setPreview(URL.createObjectURL(file));
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <OuterWrapper>
      <Container onClick={handleUploadButtonClick}>
        <HiddenInput
          type="file"
          accept="image/*, video/*"
          ref={fileInputRef}
          onChange={handleInputChange}
        />

        <Icon />
        <p>{title || "Upload Image"}</p>
        <Preview preview={!!preview} src={preview} />
      </Container>
      {!!preview && <ButtonElement onClick={() => setPreview("")} label="Remove" />}
    </OuterWrapper>
  );
};

const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  width: 10vw;
  height: 10vh;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
  p {
    color: gray;
    font-size: 0.7rem;
  }
  @media ${devices.tabletL}{
    width: auto;
  }
`;
const OuterWrapper = styled.div`
  width: fit-content;
  text-align: center;
  button {
    height: 10px;
    width: 80px;
    margin: 0 auto;
    font-size: 12px;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Icon = styled(UploadIcon)`
  width: 1rem;
  height: 1rem;
`;
const Preview = styled.img<{ preview: boolean }>`
  display: ${({ preview }) => (preview ? "block" : "none")};
  width: 90%;
  height: 80%;
  object-fit: contain;
  position: absolute;
  background-color: white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

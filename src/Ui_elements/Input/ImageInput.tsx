import React, { useRef } from "react";
import styled from "styled-components";
import { UploadIcon } from "../../Assets/Svgs";

interface ImageInputProps {
  onChange: (file: File | null) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onChange(file);
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <Container>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleInputChange}
      />

      <UploadIcon onClick={handleUploadButtonClick} />
      <p>Upload Image</p>
      {/* You can add an image preview here if needed */}
      {/* <ImagePreview src={previewImageURL} alt="Preview" /> */}
    </Container>
  );
};


const Container = styled.div`
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 10px;
  width: 13rem;
  height: 13rem;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  p{
    color: gray;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 200px;
  border-radius: 8px;
  margin-top: 10px;
`;

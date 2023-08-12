import React, { useRef } from "react";
import styled from "styled-components";
import { UploadIcon } from "../../Assets/Svgs";

interface ImageInputProps {
  onChange?: (file: File | null) => void;
}

export const ImageInput: React.FC<ImageInputProps> = ({ onChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // const file = event.target.files?.[0] || null;
    // onChange(file);
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

      <Icon onClick={handleUploadButtonClick} />
      <p>Upload Image</p>
      
    </Container>
  );
};


const Container = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  padding: 10px;
  width: 8rem;
  height: 5rem;
  display: flex;
  gap: 10px;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  cursor: pointer;
  p{
    color: gray;
    font-size:0.8rem ;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const Icon = styled(UploadIcon)`
  width: 1rem;
  height:1rem;
`

// const ImagePreview = styled.img`
//   max-width: 100%;
//   max-height: 200px;
//   border-radius: 8px;
//   margin-top: 10px;
// `;

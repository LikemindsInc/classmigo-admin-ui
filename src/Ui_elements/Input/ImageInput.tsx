import React, { useRef, useState } from "react";
import styled from "styled-components";
import { ErrorIcon, UploadIcon } from "../../Assets/Svgs";
import { devices } from "../../utils/mediaQueryBreakPoints";
import { ButtonElement } from "../Button/Button";
import { VideoCameraAddOutlined } from "@ant-design/icons";
import { UseControllerProps } from "react-hook-form";

interface ImageInputProps {
  title?: string;
  type: string;
  register?: any;
  id?: string;
  error?: any;
  setValue?:any
  defaultImage?: string;
}

export const ImageInput = ({
  title,
  type,
  register,
  id,
  error,
  setValue,
  defaultImage
}: ImageInputProps) => {
  const fileInputRef = useRef<any>(null);
  const [preview, setPreview] = useState(defaultImage || "");

  const handleInputChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0] || null;
    file && setPreview(URL.createObjectURL(file));
    if (file) {
      if (register) {
        register(id, {
          value: file,
        });
      }
    }
  };

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleClearMedia = () => {
    setValue(id, null)
          setPreview("")
  }

  return (
    <OuterWrapper>
      <Container onClick={handleUploadButtonClick}>
        <HiddenInput
          type="file"
          accept={type === "image" ? "image/*" : "video" ? "video/*" : ""}
          ref={fileInputRef}
          onChange={handleInputChange}
        />

        <Icon />
        <p>{title || "Upload Image"}</p>
        {type === "image" ? (
          <Preview preview={!!preview} src={preview} />
        ) : (
          <VideoPreview preview={!!preview}>
            <VideoCameraAddOutlined style={{ fontSize: "4rem" }} />
          </VideoPreview>
        )}
      </Container>
      {error && id ? (
        <ErrorContainer>
          {error[id]?.message && <Error />}
          <p>{error[id]?.message}</p>
        </ErrorContainer>
      ) : null}
      {!!preview && (
        <ButtonElement onClick={handleClearMedia} label="Remove" />
      )}
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
  @media ${devices.tabletL} {
    width: auto;
  }
`;
const OuterWrapper = styled.div`
  width: fit-content;
  text-align: center;
  position: relative;
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

const VideoPreview = styled.div<{ preview: boolean }>`
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


const ErrorContainer = styled.div`
  position: absolute;
  bottom: -20px;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  gap:5px;
  p {
    font-size: 0.7rem !important;
    color: red;
  }
`;


const Error = styled(ErrorIcon)`
  width: 0.8rem;
  height: 0.8rem;
`;
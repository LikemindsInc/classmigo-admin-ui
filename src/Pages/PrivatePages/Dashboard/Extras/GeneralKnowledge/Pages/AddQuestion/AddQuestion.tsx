import React, { useState } from "react";
import styled from "styled-components";
import { ImageInput, TextAreaInput } from "../../../../../../../Ui_elements";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";

const AddQuestion = () => {
  const [question, setQuestion] = useState("");
  const [image, setImageUrl] = useState(null);

  return (
    <Container>
      <TextAreaInput
        placeholder="Enter question"
        label="Question"
        handleChange={(e: any) => setQuestion(e.target.value)}
        value={question}
      />
      <ImageInput onChange={(e: any) => setImageUrl(e.target.files[0])} />
    </Container>
  );
};

export default AddQuestion;

const Container = styled.div`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 10% 15%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;
  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

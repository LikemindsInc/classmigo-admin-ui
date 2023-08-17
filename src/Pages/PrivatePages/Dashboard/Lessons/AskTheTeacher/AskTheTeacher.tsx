import React from "react";
import styled from "styled-components";
import { devices } from "../../../../../utils/mediaQueryBreakPoints";
import { AssignmentCard } from "./Components/AssignmentCard";

const AskTheTeacher = () => {
  return (
    <Container>
      <AssignmentContainer>
        <AssignmentCard
          author="John Chukwuemeka"
          message="Lorem ipsum dolor sit amet consectetur. Elementum tellus pulvinar velit vitae at lacus. Vitae turpis faucibus ante morbi id euismod massa. Neque odio habitant vulputate laoreet fermentum enim. Pellentesque cursus arcu maecenas quis enim gravida."
          audioUrl="https://p.scdn.co/mp3-preview/34003b7658f45cac5d225408500fd9d44f59de71?cid=7228d526e579489e9239ae020b6bc6dc"
          questionImage="https://mathematics111.files.wordpress.com/2018/05/snapshot-125.png?w=900"
          read={false}
          topic="Simplification of Surds"
        />
        <AssignmentCard
          author="John Chukwuemeka"
          message="Lorem ipsum dolor sit amet consectetur. Elementum tellus pulvinar velit vitae at lacus. Vitae turpis faucibus ante morbi id euismod massa. Neque odio habitant vulputate laoreet fermentum enim. Pellentesque cursus arcu maecenas quis enim gravida."
          read={true}
          topic="Simplification of Surds"
        />
        <AssignmentCard
          author="John Chukwuemeka"
          message="Lorem ipsum dolor sit amet consectetur. Elementum tellus pulvinar velit vitae at lacus. Vitae turpis faucibus ante morbi id euismod massa. Neque odio habitant vulputate laoreet fermentum enim. Pellentesque cursus arcu maecenas quis enim gravida."
          read={true}
          topic="Simplification of Surds"
        />
      </AssignmentContainer>
    </Container>
  );
};

export default AskTheTeacher;


const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 5% 10%;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 0 1rem 1rem 1rem;
  }
`;

const AssignmentContainer = styled.section`
  width: 100%;
`;

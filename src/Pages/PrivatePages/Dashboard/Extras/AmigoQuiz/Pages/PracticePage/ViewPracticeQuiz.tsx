import styled from "styled-components";
import { devices } from "../../../../../../../utils/mediaQueryBreakPoints";
import { ButtonElement, SelectInput } from "../../../../../../../Ui_elements";
import { AddIcon, CsvIcon } from "../../../../../../../Assets/Svgs";
import {useNavigate } from "react-router-dom";
import { useApiGet } from "../../../../../../../custom-hooks";
import { getPracticeQuestionUrl } from "../../../../../../../Urls";
export const ViewPracticeQuiz = () => {
  const navigate = useNavigate();

  const { data } = useApiGet(
    ["practice-question"],
    () => getPracticeQuestionUrl(),
    {
      refetchOnWindowFocus: false,
      enabled: true,
    }
  );

  return (
    <Container>
      <UtilHolder>
        <div>
          <SelectContainer>
            <SelectInput
              // value={value}
              options={[]}
              defaultValue={"Select Class"}
              // onChange={(value: any) => {
              //   setClassValue(value?.value);
              // }}
              // error={errors?.class}
              // isLoading={isLoadingClasses}
            />
          </SelectContainer>
          <ButtonElement label="Upload CSV" icon={<CsvIcon />} width={200} />
          <ButtonElement
            label="Add Question"
            icon={<AddIcon />}
            width={200}
            onClick={() =>
              navigate("#practice/schedule_pactice_quiz/add_question", {
                
              })
            }
          />
        </div>
        <ButtonElement label="Download CSV Format" outline width={300} />
      </UtilHolder>

      <Content>
        {/* <QuestionContainer>
          {data ? (
            data?.data?.content?.map((item: any, index: number) => (
              <QuestionCard
                key={index}
                id={index + 1}
                question={item?.question}
                options={item?.options}
                imageUrl={item?.imageUrl}
                answer={item?.correctOption}
                detailId={item?._id}
                item={item}
                queryId={state}
              />
            ))
          ) : (
            <NoData>
              <img src={noData} alt="No data" />
              <p>Select your preferred class and use the upload csv or </p>
              <p>add new question to add questions to practice quiz</p>
            </NoData>
          )}
        </QuestionContainer> */}
      </Content>
    </Container>
  );
};

const Container = styled.section`
  width: 100%;
  height: 85vh;
  background-color: white;
  border-radius: 12px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 10%;
  overflow-y: scroll;
  position: relative !important;

  @media ${devices.tablet} {
    padding: 1rem;
  }
`;

const UtilHolder = styled.div`
  width: 100%;
  gap: 2%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  > div {
    width: 100%;
    gap: 2%;
    display: flex;
    align-items: center;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  width: 200px;
  @media ${devices.tabletL} {
    width: 100%;
  }
`;

const Content = styled.section``;

// const NoData = styled.div`
//   width: 100%;
//   height: 60vh;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   img {
//     margin-bottom: 1rem;
//   }
//   p {
//     text-align: center;
//     font-size: 0.8rem;
//   }
//   button {
//     margin-top: 1rem;
//     width: fit-content;
//   }
// `;

// const QuestionContainer = styled.section`
//   padding: 0 20%;
// `;

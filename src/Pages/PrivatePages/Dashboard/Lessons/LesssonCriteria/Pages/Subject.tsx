import { useState } from "react";
import { useForm } from "react-hook-form";
import { ButtonElement, InputElement } from "../../../../../../Ui_elements";
import { Card } from "../Components/Card";
import noData from "../../../../../Assets/noData.png";
import { devices } from "../../../../../../utils/mediaQueryBreakPoints";
import styled from "styled-components";

const LessonCriteria = () => {
    const [selectClass, setSelectClass] = useState<any>([]);
  
    const {
      register,
      handleSubmit,
      setValue,
      formState: { errors },
    } = useForm({});
  
    const onSubmit = (data: any) => {
      const { classname } = data;
      setSelectClass((prevClasses: any) => [...prevClasses, classname]);
      setValue("classname","")
    };
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Header>
            <div>
              <InputElement
                label="Create a class"
                placeholder="Enter a class name"
                register={register}
                id="classname"
              />
              <ButtonElement type="submit" label="Add Class +" width={200} />
            </div>
          </Header>
          <Body>
            {selectClass ? (
              selectClass.map((item: any, index: number) => {
                return <Card classname={item} key={index} />;
              })
            ) : (
              <NoData>
                <img src={noData} alt="No data" />
                <p>You haven’t added any classes yet.</p>
                <p>Use the create class above to add classes.</p>
              </NoData>
            )}
          </Body>
        </Container>
      </form>
    );
  };
  
  export default LessonCriteria;
  
  const Container = styled.section`
    width: 100%;
    height: 85vh;
    background-color: white;
    border-radius: 12px;
    padding: 3rem 10%;
    display: flex;
    flex-direction: column;
    gap: 10%;
    overflow-y: scroll;
    position: relative !important;
  
    @media ${devices.tablet} {
      padding: 0 1rem 1rem 1rem;
    }
  `;
  
  const Header = styled.div`
    width: 100%;
    > div {
      input {
        width: 400px;
      }
      width: 100%;
      display: flex;
      gap: 2rem;
      align-items: flex-end;
    }
  `;
  
  const Body = styled.section`
    width: 100%;
    height: 100%;
  `;
  const NoData = styled.div`
    width: 100%;
    height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    img {
      margin-bottom: 1rem;
    }
    p {
      text-align: center;
      font-size: 0.8rem;
    }
  `;
  
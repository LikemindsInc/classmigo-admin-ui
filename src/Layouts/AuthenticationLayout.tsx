import styled from "styled-components";
import OnBoard1 from "../Assets/Svgs/LoginIllustrations/distanceWorking.svg";
import OnBoard2 from "../Assets/Svgs/LoginIllustrations/teacherPointing.svg";
import OnBoard3 from "../Assets/Svgs/LoginIllustrations/takingTest.svg";
import { Logo } from "../Assets/Svgs";
import { Carousel } from "antd";
import { devices } from "../utils/mediaQueryBreakPoints";

interface LayoutProp {
  children: any;
}
export const AuthenticationLayout = ({ children }: LayoutProp) => {
  return (
    <Container>
      <CarouselContainer>
        <CarouselBox autoplay dots={false} effect="fade">
          <CarouselElement color="var(--primary-color)">
            <div>
              <h6>
                Classroom engagement through cognitive and critical thinking
              </h6>
              <DotsContainer>
                <div />
                <div />
                <div />
              </DotsContainer>
            </div>

            <img src={OnBoard1} alt={"OnBoard1"} />
          </CarouselElement>

          <CarouselElement color="var(--yellow)">
            <div>
              <h6>
                Classroom engagement through cognitive and critical thinking
              </h6>
              <DotsContainer>
                <div />
                <div />
                <div />
              </DotsContainer>
            </div>
            <img src={OnBoard2} alt={"OnBoard2"} />
          </CarouselElement>

          <CarouselElement color="var(--green)">
            <div>
              <h6>
                Improved learning with age and class-specific practice questions
              </h6>
              <DotsContainer>
                <div />
                <div />
                <div />
              </DotsContainer>
            </div>
            <img src={OnBoard3} alt={"OnBoard3"} />
          </CarouselElement>
        </CarouselBox>
      </CarouselContainer>
      <LoginContainer>
        <div>
          <Logo />
        </div>

        {children}
      </LoginContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  max-height: 100vh !important;
  display: flex;
`;

const CarouselContainer = styled.aside`
  max-height: 100vh;
  width: 30%;
  transition: all ease .3s;
  @media ${devices.tabletL} {
    display: none !important;
  }
`;
const CarouselBox = styled(Carousel)`
  max-height: 100vh;
`;
const CarouselElement = styled.div`
  position: relative;
  height: 100vh;
  padding-top: 6.25rem;
  background-color: ${({ color }) => color};
  > div {
    margin: 0 auto;
    width: fit-content;
  }
  img {
    width: clamp(5rem, 100%, 30rem);
    height: clamp(5rem, 100%, 30rem);
    object-fit: contain;
    object-position: bottom;
    align-self: center;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  h6 {
    width: 15rem;
    font-size: clamp(1rem, 1.3rem, 1.3rem);
  }
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 2rem;
  div {
    width: 10px;
    height: 10px;
    background-color: black;
    border-radius: 50%;
  }
`;

const LoginContainer = styled.section`
  padding: 6.25rem 0 0 6.25rem;
  width: 100% !important;
  height: 100vh !important;
  /* background-color: red; */

  @media ${devices.tabletL} {
    padding: 10% 5%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    > div:first-child {
      /* position: absolute;
      top: 15%;
      left: 50%;
      transform: translateX(-50%); */
    }
  }
`;

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
        <CarouselBox autoplay dots={false} effect="fade" autoplaySpeed={5000}>
          <CarouselElement color="var(--primary-color)">
            <div>
              <h6>
                Learn with video libraries covering the Nigeria academic
                syllabus
              </h6>
            </div>

            <img src={OnBoard1} alt={"OnBoard1"} />
          </CarouselElement>

          <CarouselElement color="var(--yellow)">
            <div>
              <h6>
                Classroom engagement through cognitive and critical thinking
              </h6>
            </div>
            <img src={OnBoard2} alt={"OnBoard2"} />
          </CarouselElement>

          <CarouselElement color="var(--green)">
            <div>
              <h6>
                Improved learning with age and class-specific practice questions
              </h6>
            </div>
            <img src={OnBoard3} alt={"OnBoard3"} />
          </CarouselElement>
        </CarouselBox>
      </CarouselContainer>
      <LoginContainer>
        <div>
          <Logo />
        </div>

        <div>{children}</div>
      </LoginContainer>
    </Container>
  );
};

const Container = styled.main`
  width: 100%;
  height: 100vh !important;
  display: flex;
`;

const CarouselContainer = styled.aside`
  max-height: 100vh;
  width: 30%;
  transition: all ease 0.3s;
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
    color: white;
  }
`;

const LoginContainer = styled.section`
  padding: 6.25rem 0 0 6.25rem;
  width: 100% !important;
  height: 100vh !important;

  @media ${devices.tabletL} {
    padding: 0 !important;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media ${devices.nesthub} {
    padding: 2rem 0 0 2rem;
  }
  @media ${devices.nesthubMax} {
    padding: 3rem 0 0 3rem;
  }
`;

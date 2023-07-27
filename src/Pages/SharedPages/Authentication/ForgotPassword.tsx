import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../utils/mediaQueryBreakPoints";

const ForgotPassword = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h3>Forgot Password?</h3>
      <p>Enter your Classmigo email below to reset your admin password</p>
      <div>
        <InputElement placeholder="email@classmigo.com" label="Email" />
      </div>
      <ButtonElement
        label="CONTINUE"
        onClick={() => navigate("/otp_verification")}
      />
    </Container>
  );
};

export default ForgotPassword;

//styles

const Container = styled.div`
  margin-top: 14rem;
  width: 500px;
  height: fit-content;
  h3 {
    font-size: clamp(1.1rem, 5vw, 2rem);
    margin-bottom: 0.5rem;
  }
  p {
    font-size: clamp(0.8rem, 3vw, 1rem);
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 3rem 0;
  }
  @media ${devices.tablet} {
    width: 18rem;
    margin-top: 3rem;
  }
  @media ${devices.mobileXS} {
    width: 10rem;
    margin-top: 3rem;
  }
  @media ${devices.nesthub}{
    margin-top: 2% !important;
  }
  @media ${devices.nesthubMax}{
    margin-top: 15% !important;
  }
`;

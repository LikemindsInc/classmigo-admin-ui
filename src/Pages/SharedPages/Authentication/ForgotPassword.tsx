import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const navigate = useNavigate()
  return (
    <Container>
      <h3>Forgot Password?</h3>
      <p>Enter your Classmigo email below to reset your admin password</p>
      <div>
        <InputElement placeholder="email@classmigo.com" label="Email" />
      </div>
          <ButtonElement
              type="primary"
              label="CONTINUE"
              onClick={()=>navigate("/otp_verification")}
          />
    </Container>
  );
};

export default ForgotPassword;

//styles

const Container = styled.div`
  margin-top: 14rem;
  width: 500px;
  height: 500px;
  h3 {
    font-size: clamp(1rem, 2rem, 2rem);
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1rem;
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin: 3rem 0;
  }
`;

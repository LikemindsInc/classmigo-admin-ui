import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";

const Login = () => {
  const navigate = useNavigate()
  return (
    <LoginBox>
      <h3>Login</h3>
      <p>Teacher/Administrator Login</p>

      <div>
        <InputElement placeholder="email@classmigo.com" label="Email" />
        <InputElement placeholder="Password" label="Password" type="password" />
      </div>

      <ResetPassword onClick={()=>navigate("/forgot_password")}>Forgot Password?</ResetPassword>
      <ButtonElement type="primary" size="large" label="LOGIN" />
    </LoginBox>
  );
};

export default Login;

//styles

const LoginBox = styled.div`
  margin-top: 14rem;
  width: 32rem;
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
    margin-top: 3rem;
  }
  @media ${devices.tablet}{
    width: 18rem;
    margin-top: 3rem;
  }
  @media ${devices.mobileXS}{
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

const ResetPassword = styled.p`
  color: var(--primary-color);
  text-decoration: underline;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 4rem;
  :hover{
    cursor: pointer;
  }
`;

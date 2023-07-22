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
  height: 500px;
  h3 {
    font-size: clamp(1rem, 10vw, 2rem);
    margin-bottom: 0.5rem;
  }
  p {
    font-size: clamp(0.8rem, 5vw, 1rem);
  }
  > div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 3rem;
  }
  @media ${devices.tablet}{
    width: 100%;
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

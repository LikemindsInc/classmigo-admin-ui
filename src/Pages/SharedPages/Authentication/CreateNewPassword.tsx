import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";

const CreateNewPassword = () => {
  const navigate = useNavigate()
  return (
    <LoginBox>
      <h3>Create New Password</h3>
      <p>Enter your new password below</p>

      <div>
        <InputElement placeholder="Password" label="New Password" />
        <InputElement placeholder="Password" label="Confirm New Password" type="password" />
      </div>
      <ButtonElement type="primary" size="small" label="CONTINUE" />
    </LoginBox>
  );
};

export default CreateNewPassword;

//styles

const LoginBox = styled.div`
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

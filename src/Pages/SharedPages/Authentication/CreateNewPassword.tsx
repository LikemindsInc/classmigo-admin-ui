import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";

const CreateNewPassword = () => {
  return (
    <LoginBox>
      <h3>Create New Password</h3>
      <p>Enter your new password below</p>

      <div>
        <InputElement placeholder="Password" label="New Password" />
        <InputElement
          placeholder="Password"
          label="Confirm New Password"
          type="password"
        />
      </div>
      <ButtonElement label="CONTINUE" />
    </LoginBox>
  );
};

export default CreateNewPassword;

//styles

const LoginBox = styled.div`
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
    width: 25rem;
    margin-top: 3rem;
  }
  @media ${devices.mobileXS} {
    width: 10rem;
    margin-top: 3rem;
  }
  @media ${devices.nesthub} {
    margin-top: 2% !important;
  }
  @media ${devices.nesthubMax} {
    margin-top: 15% !important;
  }
`;

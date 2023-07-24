import { useState } from "react";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { ButtonElement } from "../../../Ui_elements";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../utils/mediaQueryBreakPoints";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  return (
    <Container>
      <h3>Enter OTP</h3>
      <p>
        An OPT has been sent to your email. Kindly check your email and enter
        the OTP below
      </p>
      <div>
        <Otp
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={"input"}
          containerStyle={"input_container"}
        />
      </div>
      <div>
        <ButtonElement
          type="primary"
          label="CONTINUE"
          onClick={() => navigate("/create_new_password")}
        />
        <Resend>Resend OTP</Resend>
      </div>
    </Container>
  );
};

export default OtpVerification;

//styles

const Container = styled.div`
  margin-top: 14rem;
  width: fit-content !important;
  height: fit-content !important;
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
    padding: 0 10%;
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

const Otp = styled(OTPInput)`
  border: 1px solid var(--primary-color);
  border-radius: 6px;
  :focus {
    border: 1px solid var(--primary-color);
  }
`;
const Resend = styled.p`
  color: var(--primary-color);
  font-weight: 600;
  text-decoration: underline;
  margin: 0 auto;
`;

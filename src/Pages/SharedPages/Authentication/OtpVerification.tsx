import { useState } from "react";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { useLocation, useNavigate } from "react-router-dom";
import { devices } from "../../../utils/mediaQueryBreakPoints";
import { useForm } from "react-hook-form";
import { newPasswordSchema } from "./authenticationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useApiPost } from "../../../custom-hooks";
import { forgotpasswordUrl, resetPasswordUrl } from "../../../Urls";

const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const { phoneNumber } = state;

  if (!phoneNumber) {
    navigate("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const resend = () => {
    const requestBody = {
      channel: "sms",
      payload: phoneNumber,
    };
    sendOTP(requestBody as any);
  }


  const { mutate: reset, isLoading } = useApiPost(
    resetPasswordUrl,
    () => {
      toast.success("Your password has been reset successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
      navigate("/login");
    },
    (e) => {
      toast.error(`Something went wrong, ${e}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    }
  );

  const { mutate: sendOTP, isLoading: isSending } = useApiPost(
    forgotpasswordUrl,
    () => {
      toast.success("Otp has been sent successfully", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    },
    (error: any) =>
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      })
  );

  const onSubmit = (data: any) => {
    if (!otp) {
      toast.error("Please enter OTP", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "light",
      });
    } else {
      const request = {
        data: phoneNumber,
        newPassword: data.confirmNewPassword,
        code: otp,
      };

      reset(request as any);
    }
  };

  return (
    <Container>
      <h3>Enter new password</h3>
      <p>
        An OPT has been sent to your email. Kindly check your email and enter
        the OTP below
      </p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputElement
          register={register}
          id="password"
          placeholder="Password"
          label="New Password"
          error={errors}
          type="password"
        />
        <InputElement
          placeholder="Password"
          label="Confirm New Password"
          type="password"
          id="confirmNewPassword"
          register={register}
          error={errors}
        />
        <Otp
          value={otp}
          onChange={setOtp}
          numInputs={6}
          renderSeparator={<span> </span>}
          renderInput={(props) => <input {...props} />}
          inputStyle={"input"}
          containerStyle={"input_container"}
        />

        <Holder>
          <ButtonElement
            label="CONTINUE"
            type="submit"
            isLoading={isLoading || isSending} />
          <div onClick={resend}>
            <Resend>Resend OTP</Resend>
          </div>
        </Holder>
      </Form>
    </Container>
  );
};

export default OtpVerification;

//styles

const Container = styled.div`
  margin-top: 10rem;
  width: 40% !important;
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
  @media ${devices.tabletL} {
    width: 100% !important;
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

export const Form = styled.form`
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Holder = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  div {
    cursor: pointer;
  }
`;

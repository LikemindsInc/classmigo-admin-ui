import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { useNavigate } from "react-router-dom";
import { devices } from "../../../utils/mediaQueryBreakPoints";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordSchema } from "./authenticationSchema";
import { useApiPost } from "../../../custom-hooks";
import { forgotpasswordUrl } from "../../../Urls";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const { mutate: sendOTP, isLoading } = useApiPost(
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
      const phoneNumber = getValues("phoneNumber");
      navigate("/otp_verification", { state: { phoneNumber } });
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
    const { phoneNumber } = data;
    const requestBody = {
      channel: "sms",
      payload: phoneNumber,
    };
    sendOTP(requestBody as any);
  };
  
  return (
    <Container>
      <h3>Forgot Password?</h3>
      <p>Enter your Classmigo email below to reset your password</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputElement
          placeholder="Enter your phone number"
          label="Phone number"
          register={register}
          id="phoneNumber"
          error={errors}
        />
        <ButtonElement isLoading={isLoading} label="CONTINUE" type="submit" />
      </Form>
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
  @media ${devices.nesthub} {
    margin-top: 2% !important;
  }
  @media ${devices.nesthubMax} {
    margin-top: 15% !important;
  }
`;
export const Form = styled.form`
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

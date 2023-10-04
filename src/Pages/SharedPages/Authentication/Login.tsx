import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ButtonElement, InputElement } from "../../../Ui_elements";
import { devices } from "../../../utils/mediaQueryBreakPoints";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "./authenticationSchema";
import { useApiPost } from "../../../custom-hooks";
import { loginUrl } from "../../../Urls/Authentication";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../../../Contexts/Contexts";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext) ?? {};
  type Inputs = {
    email: string;
    password: any;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(loginSchema),
  });

  const handleSuccess = ({ data }: any) => {
    setUser(data);
    navigate("/");
  };
  
  
  const handleError = (error: any) => {
    toast.error(error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const { mutate: login, isLoading: isLogin } = useApiPost(
    loginUrl,
    handleSuccess,
    handleError
  );


  const onSubmit: SubmitHandler<Inputs | any> = (data: any) => {
    login(data);
  };

  return (
    <LoginBox>
      <h3>Login</h3>
      <p>Teacher/Administrator Login</p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <InputElement
          placeholder="email@classmigo.com"
          label="Email"
          id="email"
          register={register}
          error={errors}
        />
        <InputElement
          placeholder="Password"
          label="Password"
          type="password"
          id="password"
          register={register}
          error={errors}
        />
        <ResetPassword onClick={() => navigate("/forgot_password")}>
          Forgot Password?
        </ResetPassword>
        <ButtonElement type="submit" label="LOGIN" isLoading={isLogin} />
      </Form>
      {/* {loginError ? <Error>{loginError}</Error> : null} */}
    </LoginBox>
  );
};

export default Login;

//styles

const LoginBox = styled.div`
  margin-top: 9rem;
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

const ResetPassword = styled.p`
  color: var(--primary-color);
  text-decoration: underline;
  font-weight: 600;
  margin-top: 0.5rem;
  margin-bottom: 2rem;
  :hover {
    cursor: pointer;
  }
`;

export const Form = styled.form`
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Error = styled.p`
  color: red;
  font-size: 0.8rem;
`;

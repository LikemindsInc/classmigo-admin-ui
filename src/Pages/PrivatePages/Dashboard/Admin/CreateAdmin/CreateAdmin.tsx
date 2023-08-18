import { useContext, useEffect } from "react";
import { Container } from "../../Users/Students/Students";
import { NavbarContext } from "../../../../../Contexts/Contexts";
import {
  ButtonElement,
  InputElement,
  SelectInput,
} from "../../../../../Ui_elements";
import { Col, Row } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { createAdminSchema } from "../../../../SharedPages/Authentication/authenticationSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { ICreateAdminDTO } from "@appModel";
import { Form } from "../../../../SharedPages/Authentication/Login";
import { APP_ROLES } from "../../../../../utils/constants";
import { useApiGet, useApiPost } from "../../../../../custom-hooks";
import { createAdminAccess, getAllClassesUrl } from "../../../../../Urls";
import { toast } from "react-toastify";
import { generateRandom } from "../../../../../utils/utilFns";

const CreateAdmin = () => {
  const { setTitle } = useContext(NavbarContext);

  useEffect(() => {
    setTitle("Create Admin User");
  }, [setTitle]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ICreateAdminDTO>({
    resolver: yupResolver(createAdminSchema),
  });

  const onSubmit: SubmitHandler<ICreateAdminDTO | any> = (data: any) => {
    //   login(data);

    createAdmin(data);
  };

  const handleSuccess = () => {
    reset();
    toast.success("Admin Created successfully", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleError = (error: any) => {
    console.log(error);
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

  const { mutate: createAdmin, isLoading } = useApiPost(
    createAdminAccess,
    handleSuccess,
    handleError
  );

  const generateRandomPassword = () => {
    const value = generateRandom(8);

    setValue("password", value);
  };

  return (
    <Container style={{ padding: "40px 60px" }}>
      <div>
        <h2>Create Admin User Access</h2>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 630 }}>
        <div className="mb-20">
          <Row style={{ width: "100%" }} gutter={16}>
            <Col md={12} sm={24}>
              <InputElement
                register={register}
                error={errors}
                placeholder=""
                label="First Name"
                id="firstName"
              />
            </Col>
            <Col md={12} sm={24}>
              <InputElement
                register={register}
                error={errors}
                placeholder=""
                label="Last Name"
                id="lastName"
              />
            </Col>
          </Row>
        </div>
        <div className="mb-20">
          <InputElement
            placeholder="joh.doe@gmail.com"
            label="Email"
            id="email"
            register={register}
            error={errors}
          />
        </div>
        <div className="mb-20">
          <InputElement
            placeholder=""
            label="Phone Number"
            id="phoneNumber"
            register={register}
            error={errors}
          />
        </div>
        <div className="mb-20">
          <SelectInput
            // register={register}
            // error={errors}
            onChange={(data: any) => setValue("role", data.value)}
            defaultValue="Role"
            options={APP_ROLES.map((item) => ({ label: item, value: item }))}
          />
        </div>
        {/* <div className="mb-20">
          <SelectInput
            defaultValue="Class"
            options={(data?.data || []).map((item: any) => ({
              label: item.value,
              value: item.name,
            }))}
          />
        </div> */}

        <div className="mb-20">
          <Row align={"middle"} gutter={8}>
            <Col md={6} sm={4}>
              <div
                className="outline-button mt-20"
                style={{ width: "100%", height: "100%" }}
                onClick={generateRandomPassword}
              >
                Generate
              </div>
            </Col>
            <Col md={18} sm={20}>
              <InputElement
                register={register}
                error={errors}
                placeholder=""
                label="Password"
                id="password"
              />
            </Col>
          </Row>
        </div>
        <ButtonElement
          type="submit"
          label="Create Access"
          isLoading={isLoading}
        />
      </Form>
    </Container>
  );
};

export default CreateAdmin;

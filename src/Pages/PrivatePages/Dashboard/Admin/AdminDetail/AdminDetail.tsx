import { useParams } from "react-router-dom";
import { useAPiPut, useApiGet } from "../../../../../custom-hooks";
import { Container } from "../../Users/Students/Students";
import {
  assignClassToAdmin,
  blockAdminAccess,
  getAllClassesUrl,
  getSingleAdmin,
  unAssignClassFromAdmin,
  unBlockAdminAccess,
  updatePassword,
} from "../../../../../Urls";
import {
  ButtonElement,
  InputElement,
  Loader,
} from "../../../../../Ui_elements";
import { Avatar, Col, Divider, Empty, Row } from "antd";
import { IAdmin } from "@appModel";
import { SkeletonContainer } from "../../Lessons/LesssonCriteria/LessonCriteria";
import { Skeleton } from "@mui/material";
import { SwitchElement } from "../../../../../Ui_elements/Switch/Switch";
import { styled } from "styled-components";
import { toast } from "react-toastify";
import { Form } from "../../../../SharedPages/Authentication/Login";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { generateRandom } from "../../../../../utils/utilFns";
import { resetAdminPasswordSchema } from "../../../../SharedPages/Authentication/authenticationSchema";

const AdminDetail = () => {
  const params = useParams();
  const { data, isLoading, refetch } = useApiGet(
    ["admin-detail", params.id],
    () => getSingleAdmin(params.id as string),
    {
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );

  const {
    data: classData,
    isLoading: isClassLoading,
    refetch: refetchClasses,
  } = useApiGet(["admin-detail-classes"], () => getAllClassesUrl(), {
    refetchOnWindowFocus: true,
    enabled: true,
  });

  const renderContent = () => {
    if (isLoading) return <Loader />;

    if (!data) return <Empty />;

    if (!data.data) return <Empty />;

    const admin = data.data as IAdmin;

    return (
      <section>
        <Row gutter={12}>
          <Col>
            <Avatar
              style={{ backgroundColor: "#d9d9d9" }}
              size={{ xs: 24, sm: 32, md: 40, lg: 75, xl: 75, xxl: 75 }}
            >
              <span style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}>
                {admin.firstName?.charAt(0)?.toUpperCase()}{" "}
                {admin.lastName?.charAt(0)?.toUpperCase()}
              </span>
            </Avatar>
          </Col>
          <Col style={{ flex: 1 }}>
            <div className="mb-20">
              <h2 style={{ fontSize: 24 }}>
                {admin.firstName} {admin.lastName}
              </h2>
              <span className="role-label">{admin.role}</span>
            </div>

            <p>Email Address</p>
            <p style={{ color: "var(--primary-color)" }}>{admin.email}</p>
            <Divider />
            <p>Class</p>
            <Section>{renderClassesSection()}</Section>
            <Divider />
            <p>Reset Password</p>
            <Section>{renderResetPasswordSection()}</Section>
            <Divider />
          </Col>
          <Col>
            <div className="mb-20">
              {admin.isActive ? (
                <ButtonElement
                  label="Disable User"
                  onClick={() => disableAccount(admin._id)}
                  isLoading={isDiablingAcount}
                />
              ) : (
                <ButtonElement
                  isLoading={isActivatingAccount}
                  onClick={() => enableAccount(admin._id)}
                  label={"Activate User"}
                />
              )}
            </div>
          </Col>
        </Row>
      </section>
    );
  };

  const renderClassesSection = () => {
    const admin = (data.data || {}) as IAdmin;
    if (isClassLoading) {
      return (
        <div>
          <SkeletonContainer>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
          </SkeletonContainer>
          <SkeletonContainer>
            <Skeleton
              animation="wave"
              variant="rectangular"
              width={"100%"}
              height={118}
            />
          </SkeletonContainer>
        </div>
      );
    }

    if (!classData.data) return;

    return (
      <ClassSwitchWrapper>
        {(classData.data || []).map((item: any, index: number) => (
          <SwitchContainer key={index}>
            <p>{item.value}</p>
            <SwitchElement
              activeState={
                admin.assignedClasses.findIndex(
                  (row) => row.studentClass?.name === item.name
                ) !== -1
              }
              handleChange={(event) =>
                handleChange(
                  event,
                  item.name,
                  admin._id,
                  admin.assignedClasses.findIndex(
                    (row) => row.studentClass?.name === item.name
                  ) !== -1
                )
              }
            />
          </SwitchContainer>
        ))}
      </ClassSwitchWrapper>
    );
  };

  const handleOnResetPasswordSuccess = () => {
    resetPasswordForm();
    toast.success("Operation successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleOnAssignSuccess = () => {
    toast.success("Operation successful", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "light",
    });
  };

  const handleOnAssignError = (error: any) => {
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

  const { mutate: asignClass, isLoading: isAssigningClass } = useAPiPut(
    assignClassToAdmin,
    handleOnAssignSuccess,
    handleOnAssignError,
    ["admin-detail-classes"]
  );

  const { mutate: unAssignClass, isLoading: isUnAssigningClass } = useAPiPut(
    unAssignClassFromAdmin,
    handleOnAssignSuccess,
    handleOnAssignError,
    ["admin-detail-classes"]
  );

  const { mutate: disableUser, isLoading: isDiablingAcount } = useAPiPut(
    blockAdminAccess,
    handleOnAssignSuccess,
    handleOnAssignError,
    ["admin-detail", params.id as string]
  );

  const { mutate: unBlockUser, isLoading: isActivatingAccount } = useAPiPut(
    unBlockAdminAccess,
    handleOnAssignSuccess,
    handleOnAssignError,
    ["admin-detail", params.id as string]
  );

  const { mutate: updatePasswordMutation, isLoading: isUpdatingPassword } =
    useAPiPut(
      updatePassword,
      handleOnResetPasswordSuccess,
      handleOnAssignError,
      ["admin-detail", params.id as string]
    );

  const disableAccount = (accountId: string) => {
    disableUser(accountId);
  };

  const enableAccount = (accountId: string) => {
    unBlockUser(accountId);
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    className: string,
    adminId: string,
    isAssigned: boolean
  ) => {
    if (!isAssigned) {
      return asignClass({ accountId: adminId, className });
    }

    unAssignClass({ accountId: adminId, className });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetPasswordForm,
    setValue,
  } = useForm<{ password: string }>({
    resolver: yupResolver(resetAdminPasswordSchema),
  });

  const generateRandomPassword = () => {
    const value = generateRandom(8);

    setValue("password", value);
  };

  const onSubmit: SubmitHandler<{ password: string } | any> = (data: any) => {
    updatePasswordMutation({
      userId: params.id as string,
      password: data.password,
    });
  };

  const renderResetPasswordSection = () => {
    return (
      <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: 630 }}>
        <div className="mb-20">
          <Row align={"middle"} gutter={8}>
            <Col md={6} sm={4}>
              <div
                className="outline-button"
                style={{ width: "100%", height: "100%", marginTop: 5 }}
                onClick={generateRandomPassword}
              >
                Generate
              </div>
            </Col>
            <Col md={18} sm={20}>
              <InputElement
                register={register}
                error={errors}
                placeholder="Password"
                label=""
                id="password"
              />
            </Col>
          </Row>
        </div>
        <ButtonElement
          type="submit"
          label="Reset Password"
          isLoading={isUpdatingPassword}
          width={300}
        />
      </Form>
    );
  };

  return (
    <Container style={{ padding: "40px 60px" }}>{renderContent()}</Container>
  );
};

const ClassSwitchWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const SwitchContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Section = styled.section`
  padding: 20px 0px;
`;

export default AdminDetail;

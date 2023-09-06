import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Container } from "../Users/Students/Students";
import { devices } from "../../../../utils/mediaQueryBreakPoints";
import {
  ButtonElement,
  Loader,
  SearchInput,
  SelectInput,
} from "../../../../Ui_elements";
import { APP_ROLES } from "../../../../utils/constants";
import { useApiGet } from "../../../../custom-hooks";
import { getAllAdmins } from "../../../../Urls";
import { Avatar, Empty } from "antd";
import { IAdmin } from "@appModel";
import { Link, useNavigate } from "react-router-dom";

const Admin = () => {
  const navigate = useNavigate();
  const { data, isLoading, refetch } = useApiGet(
    ["admins"],
    () => getAllAdmins(),
    {
      refetchOnWindowFocus: true,
      enabled: true,
    }
  );

  const [content, setContent] = useState<IAdmin[] | []>([]);

  useEffect(() => {
    if (!data || !data.data) return;

    setContent(data.data);
  }, [data]);

  const renderData = () => {
    if (isLoading) return <Loader />;

    if (!data) {
      return <Empty />;
    }

    if (!data.data) {
      return <Empty />;
    }

    if (content.length === 0) return <Empty />;

    return (
      <AdminCardWrapper>
        {(content || []).map((item, index) => (
          <Link key={item._id} className="admin-wrapper-link" to={item._id}>
            <AdminCard>
              <div className="admin-card-wrapper">
                <div className="">
                  <Avatar
                    style={{ backgroundColor: "#d9d9d9" }}
                    size={{ xs: 24, sm: 32, md: 40, lg: 60, xl: 75, xxl: 75 }}
                  >
                    <span
                      style={{ color: "#fff", fontSize: 24, fontWeight: "700" }}
                    >
                      {item.firstName.charAt(0).toUpperCase()}{" "}
                      {item.lastName.charAt(0).toUpperCase()}
                    </span>
                  </Avatar>
                </div>
                <div>
                  <h2 style={{ fontSize: 20, marginBottom: 6 }}>
                    {item.firstName} {item.lastName}
                  </h2>
                  <span className="role-label">{item.role}</span>
                </div>
              </div>
            </AdminCard>
          </Link>
        ))}
      </AdminCardWrapper>
    );
  };
  return (
    <Container style={{ padding: "40px 60px" }}>
      <UtilsHolder>
        <div>
          <SelectInput
            defaultValue="Role"
            options={["All", ...APP_ROLES].map((item) => ({
              label: item,
              value: item,
            }))}
            width={200}
            onChange={(payload) => {
              if (payload.value === "All") return setContent(data.data);

              setContent(
                (data.data || []).filter(
                  (item: any) => item.role === payload.value
                )
              );
            }}
          />
          <SearchInput />
        </div>
        <ButtonElement
          label="Create Admin User"
          onClick={() => navigate("/admin-access/create-user")}
        />
        {/* {renderData()} */}
      </UtilsHolder>
      <section>{renderData()}</section>
    </Container>
  );
};

const AdminCardWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const AdminCard = styled.div``;

const UtilsHolder = styled.div`
  display: flex;
  margin-top: 3rem;
  width: auto;
  align-items: center;
  justify-content: space-between;

  button{
    width:200px;
    @media ${devices.tabletL} {
      margin-top: 5%;
    }
  }

  @media ${devices.tabletL} {
    flex-direction: column;
    align-items: flex-start;
    flex-wrap: wrap;
  }
  > div {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 65%;

    @media ${devices.tabletL} {
      flex-direction: column;
      width: 100%;
    }

    h6 {
      font-size: clamp(1rem, 1vw, 1rem);
      font-weight: 700;
      width: fit-content;
    }
  }

`;

export default Admin;

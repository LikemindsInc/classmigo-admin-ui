import React from "react";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { formatUrlName } from "../../utils/utilFns";
import styled from "styled-components";
import { devices } from "../../utils/mediaQueryBreakPoints";

export const Breadcrumbs = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const pathnames = pathname.split("/").filter((x) => x);
  return (
    <div>
      <MUIBreadcrumbs aria-label="breadcrumb" separator="›">
        {/* {pathnames.length > 0 ? (
        <Link onClick={() => navigate("/")}>pathname</Link>
      ) : (
        <Typography>Home</Typography>
      )} */}

        {pathnames.map((name, index) => {
          const navigateTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          // if (index === 0) {
          //   return null;
          // }
          return isLast ? (
            <Text key={name}>{formatUrlName(name)}</Text>
          ) : (
            <TextLink key={name} onClick={() => navigate(navigateTo)}>
              {formatUrlName(name)}
            </TextLink>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

const TextLink = styled.p`
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    color: var(--primary-color);
  }
  @media ${devices.tablet} {
    font-size: 0.8rem;
  }
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 600;
  @media ${devices.tablet} {
    font-size: 0.8rem;
  }
`;

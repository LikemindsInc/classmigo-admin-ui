import { Tab, Tabs } from "@mui/material";
import { hasIn } from "lodash";
import React, { useState } from "react";
import { Outlet } from "react-router-dom";

interface TabProps {
  routes?: {
    id: number;
    name: string;
    route: string;
  }[];
  page?: any;
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
}
export const TabNavigation = ({ routes, page, handleChange }: TabProps) => {
  return (
    <>
      <Tabs
        value={page}
        onChange={handleChange}
        aria-label="Amigo quiz tab"
        variant="scrollable"
        scrollButtons
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: { backgroundColor: "#7b31b2" },
        }}
        sx={{
          "& .MuiTabs-root": {
            fontFamily: "inter",
            color: "red",
          },
          "& .MuiTab-root": {
            fontFamily: "inter",
            textTransform: "none",
            color: "black",
            fontSize: "1rem",
            "&.Mui-selected": {
              color: "#7b31b2",
            },
          },
        }}
      >
        {routes?.map((route, index) => {
          return <Tab key={index} label={route.name} />;
        })}
      </Tabs>
    </>
  );
};

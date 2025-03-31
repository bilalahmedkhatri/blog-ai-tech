import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "./components/AppNavbar";
import LoadingCircle from "./components/LoadingCircle";
import Header from "./components/Header";
import SideMenuBlog from "./components/SideMenuBlog";
import { useGetAdminDashboardQuery, useGetPostsQuery } from "../apiSlice";

export default function Dashboard(props) {
  // page state: "main" shows the blog grid; "create" shows the create post view.
  const [page, setPage] = useState("main");

  // Pass a callback to the side menu (and/or mobile menu) for page switching
  const handleMenuClick = (selectedPage) => {
    setPage(selectedPage);
  };

  return (
    // <AppTheme{...props}>
    <>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenuBlog onMenuClick={handleMenuClick} currentPage={page} />
        <AppNavbar onMenuClick={handleMenuClick} currentPage={page} />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: theme.vars
              ? `rgba(${theme.vars.palette.background.defaultChannel} / 1)`
              : alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <Outlet />
          </Stack>
        </Box>
      </Box>
    </>
    // </AppTheme >
  );
}

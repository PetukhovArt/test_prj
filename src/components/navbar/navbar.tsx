import { NavLink, Outlet } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import s from "./navbar.module.scss";
import GitHubStore from "@/store/profile.ts";
import { observer } from "mobx-react";
import LinearProgress from "@mui/material/LinearProgress";

export const Navbar = observer(() => {
  const { state } = GitHubStore;

  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar>
          <Breadcrumbs aria-label="breadcrumb">
            <NavLink
              to={"/profile"}
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Profile
            </NavLink>
            <NavLink
              to={"/team"}
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Team
            </NavLink>
          </Breadcrumbs>
        </Toolbar>
        {state === "pending" && <LinearProgress />}
      </AppBar>
      <Container maxWidth={"xl"} className={s.contentBox}>
        <Outlet />
      </Container>
    </Box>
  );
});

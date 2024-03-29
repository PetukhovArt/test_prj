import { NavLink, Outlet, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import s from "./navbar.module.scss";
import GitHubStore from "@/store/profile.store.ts";
import { observer } from "mobx-react";
import LinearProgress from "@mui/material/LinearProgress";

export const Navbar = observer(() => {
  const { state } = GitHubStore;
  const location = useLocation();
  return (
    <Box>
      <AppBar position="fixed">
        <Toolbar variant={"dense"} className={s.toolBar}>
          <Breadcrumbs>
            <NavLink
              to={"/profile"}
              className={({ isActive }) =>
                location.pathname === "/"
                  ? s.active
                  : isActive
                  ? s.active
                  : s.link
              }
            >
              Profile
            </NavLink>

            <NavLink
              to={"/team"}
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Team
            </NavLink>
            <NavLink
              to={"/form"}
              className={({ isActive }) => (isActive ? s.active : s.link)}
            >
              Form
            </NavLink>
          </Breadcrumbs>
        </Toolbar>
        {state === "pending" && <LinearProgress />}
      </AppBar>
      <div className={s.main}>
        <Outlet />
      </div>
    </Box>
  );
});

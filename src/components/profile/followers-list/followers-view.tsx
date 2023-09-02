import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { observer } from "mobx-react";
import GitHubStore from "@/store/profile.store.ts";
import CircularProgress from "@mui/material/CircularProgress";
import { FollowersList } from "./followers-list";
import s from "./followers.module.scss";

export const FollowersView = observer(() => {
  const { following } = GitHubStore;
  if (!following) {
    return <CircularProgress />;
  } else
    return (
      <List
        className={s.list}
        sx={{
          bgcolor: "background.paper",
        }}
        subheader={<li />}
      >
        <ListSubheader>{"Following"}</ListSubheader>
        <ul>
          <FollowersList />
        </ul>
      </List>
    );
});

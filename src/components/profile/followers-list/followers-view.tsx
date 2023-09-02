import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";
import { observer } from "mobx-react";
import GitHubStore from "@/store/profile.ts";
import CircularProgress from "@mui/material/CircularProgress";
import { FollowersList } from "@/components/profile/followers-list/followers-list.tsx";
export const FollowersView = observer(() => {
  const { following } = GitHubStore;
  if (!following) {
    return <CircularProgress />;
  } else
    return (
      <List
        sx={{
          borderRadius: "4px",
          width: "100%",
          maxWidth: 320,
          bgcolor: "background.paper",
          position: "relative",
          overflow: "auto",
          height: 300,
          "& ul": { padding: 0 },
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

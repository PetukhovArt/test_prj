import GitHubStore from "@/store/profile.store.ts";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
export const FollowersList = observer(() => {
  const { following } = GitHubStore;

  if (!following) {
    return <CircularProgress />;
  } else
    return (
      <>
        {following.map((item) => (
          <ListItem key={item.login}>
            <ListItemAvatar>
              <Avatar alt="avatar" src={item.avatar_url} />
            </ListItemAvatar>
            <Link href={item.html_url} underline="hover">
              <ListItemText primary={item.login} />
            </Link>
          </ListItem>
        ))}
      </>
    );
});

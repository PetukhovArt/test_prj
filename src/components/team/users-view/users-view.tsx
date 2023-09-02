import { observer } from "mobx-react";
import GitHubStore from "@/store/profile.ts";
import CircularProgress from "@mui/material/CircularProgress";
export const UsersView = observer(() => {
  const { following } = GitHubStore;
  if (!following) {
    return <CircularProgress />;
  } else return <></>;
});

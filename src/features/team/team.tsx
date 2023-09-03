import { useEffect } from "react";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import { TeamView } from "@/components/team";
import TeamStore from "@/store/team.store.ts";

export const Team = observer(() => {
  const { getUsers, users, team } = TeamStore;

  useEffect(() => {
    if (users?.length === 0 && team?.length === 0) {
      getUsers();
    }
  }, [users]);

  if (!users) {
    return <CircularProgress />;
  } else return <TeamView />;
});

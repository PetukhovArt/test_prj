import { useEffect } from "react";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import { TeamView } from "@/components/team/team-view";
import { SearchBar } from "@/components/search-bar";
import { UsersView } from "@/components/team/users-view";
import TeamStore from "@/store/team.ts";
import Grid from "@mui/material/Grid";

export const Team = observer(() => {
  const { getUsers, users } = TeamStore;

  useEffect(() => {
    if (users?.length === 0) {
      getUsers();
    }
  }, [users]);

  if (!users) {
    return <CircularProgress />;
  } else
    return (
      <Grid container spacing={2}>
        <Grid item xs={7}></Grid>
        <Grid item xs={5}>
          <SearchBar />
        </Grid>
        <Grid item xs={12}>
          <TeamView />
          <UsersView />
        </Grid>
      </Grid>
    );
});

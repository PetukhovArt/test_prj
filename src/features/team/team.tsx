import GitHubStore from "@/app/store.ts";
import { useEffect } from "react";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import { TeamView } from "@/components/team/team-view";
import { SearchBar } from "@/components/search-bar";
import { UsersView } from "@/components/team/users-view";
import Container from "@mui/material/Container";

export const Team = observer(() => {
  const { getUsers, users } = GitHubStore;

  useEffect(() => {
    if (users?.length === 0) {
      getUsers();
    }
  }, [users]);

  if (!users) {
    return <CircularProgress />;
  } else
    return (
      <Container sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        {/*team : sort + delete funcs*/}
        <SearchBar />
        <TeamView />
        <Container
          sx={{ display: "flex", gap: "10px", flexDirection: "column" }}
        >
          <UsersView />
        </Container>
        {/*search field : search for login in users*/}
        {/*users , user : login , link to acc , avatar ; funcs : add to team*/}
      </Container>
    );
});

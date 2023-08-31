import GitHubStore from "@/app/store.ts";
import { useEffect } from "react";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import { SearchBar } from "@/components/search-bar/SearchBar.tsx";

export const Team = observer(() => {
  const { getUsers, users } = GitHubStore;

  useEffect(() => {
    if (users?.length === 0) {
      getUsers();
    }
  }, []);

  if (!users) {
    return <CircularProgress />;
  } else
    return (
      <div>
        <ul>{/*team : sort + delete funcs*/}</ul>
        <ul>
          <SearchBar />
          {/*search field : search for login in users*/}
          {/*users , user : login , link to acc , avatar ; funcs : add to team*/}
        </ul>
      </div>
    );
});

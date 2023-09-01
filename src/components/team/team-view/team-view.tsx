import GitHubStore from "@/app/store.ts";
import { useState } from "react";
import Grid from "@mui/material/Grid";

import { TransferButton } from "@/components/transfer-button";
import { ListType, TeamList } from "@/components/team/team-view/team-list.tsx";
import { UserType } from "@/api/api.types.ts";
import CircularProgress from "@mui/material/CircularProgress";
import { observer } from "mobx-react";
import { UsersList } from "../users-view";
import { action } from "mobx";

export const TeamView = observer(() => {
  const { users, team, deleteUsers, addTeamUsers, deleteTeamUsers, addUsers } =
    GitHubStore;
  const [checkedTeamUsersId, setCheckedTeamUsersId] = useState<number[]>([]);
  const [checkedFreeUsersId, setCheckedFreeUsersId] = useState<number[]>([]);

  const setUserChecked = (userId: number, list: ListType) => () => {
    if (list === "team") {
      if (checkedTeamUsersId.includes(userId)) {
        setCheckedTeamUsersId(checkedTeamUsersId.filter((id) => id !== userId));
      } else {
        setCheckedTeamUsersId([...checkedTeamUsersId, userId]);
      }
    } else {
      if (checkedFreeUsersId.includes(userId)) {
        setCheckedFreeUsersId(checkedFreeUsersId.filter((id) => id !== userId));
      } else {
        setCheckedFreeUsersId([...checkedFreeUsersId, userId]);
      }
    }
  };
  // const deleteUserHandler = (userId: number, list: ListType) => {
  //   if (list === "team") {
  //     teamUserDelete(userId);
  //   }
  // };

  const findNewUsers = (foundUsers: UserType[], usersColumn: UserType[]) => {
    let newUsers: UserType[] = [];
    for (let i = 0; i < foundUsers.length; i++) {
      if (!usersColumn.includes(foundUsers[i])) {
        newUsers.push(foundUsers[i]);
      }
    }
    return newUsers;
  };
  const findUsersById = (column: UserType[], checkedUsers: number[]) => {
    return column.filter((user) => checkedUsers.includes(user.id));
  };
  const moveCheckedToUsers = action(() => {
    const foundUsers = findUsersById(team, checkedTeamUsersId);
    const newUsers = findNewUsers(foundUsers, users);
    if (newUsers.length > 0) {
      addUsers(newUsers);
      deleteTeamUsers(newUsers);
      setCheckedTeamUsersId([]);
    }
  });

  const moveCheckedToTeam = action(() => {
    const foundUsers = findUsersById(users, checkedFreeUsersId);
    const newUsers = findNewUsers(foundUsers, team);
    if (newUsers.length > 0) {
      addTeamUsers(newUsers);
      deleteUsers(newUsers);
      setCheckedFreeUsersId([]);
    }
  });
  if (!users || !team) {
    return <CircularProgress />;
  } else
    return (
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>
          <TeamList
            list={"team"}
            setUserChecked={setUserChecked}
            // deleteUserHandler={deleteUserHandler}
            checkedTeam={checkedTeamUsersId}
          />
        </Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
            <TransferButton
              onClick={moveCheckedToUsers}
              disabled={checkedTeamUsersId.length === 0}
              children={">"}
            />
            <TransferButton
              onClick={moveCheckedToTeam}
              disabled={checkedFreeUsersId.length === 0}
              children={"<"}
            />
          </Grid>
        </Grid>
        <Grid item>
          <UsersList
            list={"users"}
            setUserChecked={setUserChecked}
            checkedFreeUsers={checkedFreeUsersId}
          />
        </Grid>
      </Grid>
    );
});

// const checkUserHandler = (userId: number, list: ListType) => () => {
//   if (list === "team") {
//     if (checkedTeam.includes(userId)) {
//       setCheckedTeam(checkedTeam.filter((id) => id !== userId));
//     } else {
//       setCheckedTeam([...checkedTeam, userId]);
//     }
//   } else {
//     if (checkedFreeUsers.includes(userId)) {
//       setCheckedFreeUsers(checkedFreeUsers.filter((id) => id !== userId));
//     } else {
//       setCheckedFreeUsers([...checkedFreeUsers, userId]);
//     }
//   }
// };

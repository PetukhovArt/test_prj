import { useState } from "react";
import TeamStore from "@/store/team.store.ts";
import s from "./team-view.module.scss";
import { ListType, TeamList } from "@/components/team/lists/team-list.tsx";
import CircularProgress from "@mui/material/CircularProgress";
import { observer } from "mobx-react";
import { action } from "mobx";
import { findNewUsers, findUsersById } from "@/common/helpers";
import Typography from "@mui/material/Typography";
import { UsersList } from "./lists/users-list";
import { TransferButton } from "./transfer-button";

export const TeamView = observer(() => {
  const {
    users,
    team,
    deleteTeamUser,
    deleteUsers,
    addTeamUsers,
    deleteTeamUsers,
    addUsers,
  } = TeamStore;
  const [checkedTeamUsersId, setCheckedTeamUsersId] = useState<number[]>([]);
  const [checkedUsersId, setCheckedUsersId] = useState<number[]>([]);

  const setUserChecked = (userId: number, list: ListType) => () => {
    if (list === "team") {
      setCheckedTeamUsersId((prevState) =>
        prevState.includes(userId)
          ? prevState.filter((id) => id !== userId)
          : [...prevState, userId],
      );
    } else {
      setCheckedUsersId((prevState) =>
        prevState.includes(userId)
          ? prevState.filter((id) => id !== userId)
          : [...prevState, userId],
      );
    }
  };

  const deleteUserHandler = action((userId: number) => {
    let user = team.find((user) => user.id == userId);
    deleteTeamUser(userId);
    if (user) {
      addUsers([user]);
    }
  });

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
    const foundUsers = findUsersById(users, checkedUsersId);
    const newUsers = findNewUsers(foundUsers, team);
    if (newUsers.length > 0) {
      addTeamUsers(newUsers);
      deleteUsers(newUsers);
      setCheckedUsersId([]);
    }
  });

  if (!users || !team) {
    return <CircularProgress />;
  } else
    return (
      <div className={s.container}>
        <div className={s.list}>
          <Typography variant="h6" align={"center"}>
            My team
          </Typography>
          <TransferButton
            onClick={moveCheckedToUsers}
            disabled={checkedTeamUsersId.length === 0}
            children={">"}
          />
          <TeamList
            deleteUserHandler={deleteUserHandler}
            list={"team"}
            setUserChecked={setUserChecked}
            checkedTeamIdData={checkedTeamUsersId}
          />
        </div>

        <div className={s.list}>
          <Typography variant="h6" align={"center"}>
            Github users
          </Typography>
          <TransferButton
            onClick={moveCheckedToTeam}
            disabled={checkedUsersId.length === 0}
            children={"<"}
          />
          <UsersList
            list={"users"}
            setUserChecked={setUserChecked}
            checkedFreeUsers={checkedUsersId}
          />
        </div>
      </div>
    );
});

import List from "@mui/material/List";
import Delete from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import TeamStore from "@/store/team.store.ts";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TableSortLabel from "@mui/material/TableSortLabel";
import { useState } from "react";
import s from "./list.module.scss";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked?: (userId: number, listType: ListType) => any;
  deleteUserHandler: (userId: number) => any;
  checkedTeamIdData: readonly number[];
  list: ListType;
};
export const TeamList = observer(
  ({
    checkedTeamIdData,
    setUserChecked,
    deleteUserHandler,
    list,
  }: UsersListProps) => {
    const { team, teamSort } = TeamStore;
    const [direction, setDirection] = useState<boolean>(false);
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const notEmpty = teamSort(direction).length > 0;
    const isSortable = teamSort(direction).length > 1;

    if (!team) {
      return <CircularProgress />;
    } else
      return (
        <Paper className={s.paper}>
          {isSortable && (
            <ListItemButton
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className={s.sortButton}
              onClick={() => setDirection(!direction)}
            >
              Click here to sort
              <TableSortLabel
                hideSortIcon={!isHovered}
                active={isHovered}
                direction={direction ? "desc" : "asc"}
              />
            </ListItemButton>
          )}

          <List>
            {notEmpty ? (
              teamSort(direction).map((user) => {
                return (
                  <ListItem
                    key={user.id}
                    disablePadding
                    secondaryAction={
                      <IconButton onClick={() => deleteUserHandler(user.id)}>
                        <Delete />
                      </IconButton>
                    }
                  >
                    <ListItemButton
                      role={undefined}
                      onClick={setUserChecked?.(user.id, list)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          checked={checkedTeamIdData.indexOf(user.id) !== -1}
                          tabIndex={-1}
                          disableRipple
                        />
                      </ListItemIcon>
                      <ListItemAvatar>
                        <Avatar alt="avatar" src={user.avatar_url} />
                      </ListItemAvatar>
                      <ListItemText className={s.loginName}>
                        {user.login}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })
            ) : (
              <ListItem>
                <ListItemText className={s.emptyText}>
                  Team is empty
                </ListItemText>
              </ListItem>
            )}
          </List>
        </Paper>
      );
  },
);

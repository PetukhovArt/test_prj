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
import TeamStore from "@/store/team.ts";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked?: (userId: number, listType: ListType) => any;
  deleteUserHandler: (userId: number) => any;
  checkedTeam: readonly number[];
  list: ListType;
};
export const TeamList = observer(
  ({
    checkedTeam,
    setUserChecked,
    deleteUserHandler,
    list,
  }: UsersListProps) => {
    const { team } = TeamStore;

    if (!team) {
      return <CircularProgress />;
    } else
      return (
        <Paper sx={{ width: 320, height: 400, overflow: "auto" }}>
          <List>
            {team.map((user) => {
              return (
                <ListItem
                  divider
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
                        checked={checkedTeam.indexOf(user.id) !== -1}
                        onClick={setUserChecked?.(user.id, list)}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText primary={user.login} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      );
  },
);

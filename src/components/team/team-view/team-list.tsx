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
import GitHubStore from "@/app/store.ts";
import CircularProgress from "@mui/material/CircularProgress";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked?: (userId: number, listType: ListType) => any;
  deleteUserHandler?: (userId: number, listType: ListType) => any;
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
    console.log("teamlist render");
    const { team } = GitHubStore;

    if (!team) {
      return <CircularProgress />;
    } else
      return (
        <Paper sx={{ width: 320, height: 400, overflow: "auto" }}>
          <List dense component="div" role="list">
            {team.map((user) => {
              return (
                <ListItem
                  divider
                  key={user.id}
                  role="listitem"
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      onClick={deleteUserHandler?.(user.id, list)}
                    >
                      <Delete />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton
                    role={undefined}
                    onClick={setUserChecked?.(user.id, list)}
                    dense
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checkedTeam.indexOf(user.id) !== -1}
                        tabIndex={-1}
                        disableRipple
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={user.id.toString()}
                      primary={user.login}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Paper>
      );
  },
);

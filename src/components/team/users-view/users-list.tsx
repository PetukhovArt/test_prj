import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import { observer } from "mobx-react";
import GitHubStore from "@/app/store.ts";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked: (userId: number, listType: ListType) => any;
  checkedFreeUsers: readonly number[];
  list: ListType;
};
export const UsersList = observer(
  ({ checkedFreeUsers, setUserChecked, list }: UsersListProps) => {
    console.log("freeUsersList render");

    const { users } = GitHubStore;

    return (
      <Paper sx={{ width: 320, height: 400, overflow: "auto" }}>
        <List dense component="div" role="list">
          {users.map((user) => {
            return (
              <ListItem divider key={user.id} role="listitem" disablePadding>
                <ListItemButton
                  role={undefined}
                  onClick={setUserChecked(user.id, list)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      checked={checkedFreeUsers.indexOf(user.id) !== -1}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText id={user.id.toString()} primary={user.login} />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Paper>
    );
  },
);

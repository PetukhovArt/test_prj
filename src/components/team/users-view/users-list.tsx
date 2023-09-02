import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import { observer } from "mobx-react";
import TeamStore from "@/store/team.ts";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked: (userId: number, listType: ListType) => any;
  checkedFreeUsers: readonly number[];
  list: ListType;
};
export const UsersList = observer(
  ({ checkedFreeUsers, setUserChecked, list }: UsersListProps) => {
    const { filteredUsers } = TeamStore;

    return (
      <Paper sx={{ width: 320, height: 400, overflow: "auto" }}>
        <List>
          {filteredUsers.map((user) => {
            return (
              <ListItem divider key={user.id} disablePadding>
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

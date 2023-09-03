import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import ListItemButton from "@mui/material/ListItemButton";
import { observer } from "mobx-react";
import TeamStore from "@/store/team.store.ts";
import { SearchBar } from "@/components/search-bar";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Link from "@mui/material/Link";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import s from "./list.module.scss";
import ListItemText from "@mui/material/ListItemText";

export type ListType = "team" | "users";

type UsersListProps = {
  setUserChecked: (userId: number, listType: ListType) => any;
  checkedFreeUsers: readonly number[];
  list: ListType;
};
export const UsersList = observer(
  ({ checkedFreeUsers, setUserChecked, list }: UsersListProps) => {
    const { filteredUsers } = TeamStore;
    const [searchValue, setSearchValue] = useState<string>("");
    const [debouncedValue] = useDebounce(searchValue, 300);
    const notEmpty = filteredUsers(debouncedValue).length > 0;
    return (
      <Paper className={s.paper}>
        <SearchBar setSearchValue={setSearchValue} />
        <List>
          {notEmpty ? (
            filteredUsers(debouncedValue).map((user) => {
              return (
                <ListItem
                  alignItems="flex-start"
                  key={user.id}
                  disablePadding
                  secondaryAction={
                    <Link
                      href={user.html_url}
                      underline="hover"
                      target="_blank"
                      rel="noopener"
                    >
                      {user.login}
                    </Link>
                  }
                >
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
                    <ListItemAvatar>
                      <Avatar alt="avatar" src={user.avatar_url} />
                    </ListItemAvatar>
                  </ListItemButton>
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <ListItemText className={s.emptyText}>No free users</ListItemText>
            </ListItem>
          )}
        </List>
      </Paper>
    );
  },
);

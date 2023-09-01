import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import GitHubStore from "@/app/store.ts";

export const SearchBar = () => {
  const { filterUsers, users } = GitHubStore;
  const [searchValue, setSearchValue] = useState<string>("");
  const [debouncedValue] = useDebounce(searchValue, 500);
  const changeSearchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setSearchValue(e.target.value);
  };

  // useEffect(() => {
  //   if (users && users.length > 1) {
  //     filterUsers(debouncedValue);
  //   }
  // }, [debouncedValue]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 320,
        height: 50,
        // marginTop: "8px",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search github login..."
        value={searchValue}
        onChange={changeSearchHandler}
      />
    </Paper>
  );
};

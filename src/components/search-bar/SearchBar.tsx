import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import { ChangeEvent, useState } from "react";

type PropsType = {
  setSearchValue: (value: string) => void;
};
export const SearchBar = ({ setSearchValue }: PropsType) => {
  const [value, setValue] = useState<string>("");

  const changeSearchHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setValue(e.target.value);
    setSearchValue(e.target.value);
  };

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search user..."
        value={value}
        onChange={changeSearchHandler}
      />
    </Paper>
  );
};

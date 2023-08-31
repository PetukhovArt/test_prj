import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReposList } from "./repos-list.tsx";

export const RepoView = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 320 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Repo Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Languages</TableCell>
            <TableCell align="left">Created</TableCell>
            <TableCell align="left">Clone Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <ReposList />
        </TableBody>
      </Table>
    </TableContainer>
  );
};

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { ReposList } from "./repos-list.tsx";
import s from "./repo-view.module.scss";
import useMediaQuery from "@mui/material/useMediaQuery";
import CircularProgress from "@mui/material/CircularProgress";
import GitHubStore from "@/store/profile.store.ts";
import { observer } from "mobx-react";
import { ReposListGrid } from "@/components/profile/repos-view/repos-list-grid/repos-list-grid.tsx";
import Typography from "@mui/material/Typography";
export const RepoView = observer(() => {
  const { repos } = GitHubStore;

  const cells = [
    "Repo name",
    "Description",
    "Language",
    "Created",
    "Clone link",
  ];
  const isLandScape = useMediaQuery("(max-width:768px)");

  if (!repos) {
    return <CircularProgress />;
  } else
    return (
      <>
        {isLandScape ? (
          <>
            <Typography variant="h5" component="div">
              User repo's :
            </Typography>
            <ReposListGrid />
          </>
        ) : (
          <TableContainer component={Paper} className={s.container}>
            <Table size={"small"}>
              <TableHead>
                <TableRow hover>
                  {cells.map((c) => (
                    <TableCell key={c} className={s.cell} align={"right"}>
                      {c}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                <ReposList />
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </>
    );
});

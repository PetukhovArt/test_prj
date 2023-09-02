import GitHubStore from "@/store/profile.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { formatDate } from "@/common/helpers/date-helper.ts";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
export const ReposList = observer(() => {
  const { repos } = GitHubStore;

  if (!repos) {
    return <CircularProgress />;
  } else
    return (
      <>
        {repos.map((repo) => (
          <TableRow
            key={repo.name}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              <Link href={repo.svn_url} underline="hover">
                {repo.name}
              </Link>
            </TableCell>
            <TableCell align="left">
              {repo.description ? (
                repo.description
              ) : (
                <RemoveCircleOutlineIcon />
              )}
            </TableCell>
            <TableCell align="left">{repo.language}</TableCell>
            <TableCell align="left">{formatDate(repo.created_at)}</TableCell>
            <TableCell align="left">{repo.clone_url}</TableCell>
          </TableRow>
        ))}
      </>
    );
});

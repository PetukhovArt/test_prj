import GitHubStore from "@/store/profile.store.ts";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { formatDate } from "@/common/helpers/date-helper.ts";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import Link from "@mui/material/Link";

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
            <TableCell align="right">
              <Link href={repo.svn_url} underline="hover">
                {repo.name}
              </Link>
            </TableCell>
            <TableCell align="right">
              {repo.description ? repo.description : "-"}
            </TableCell>
            <TableCell align="right">{repo.language}</TableCell>
            <TableCell align="right">{formatDate(repo.created_at)}</TableCell>
            <TableCell align="right">
              <Link href={repo.clone_url} underline="hover">
                Copy link to clone
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </>
    );
});

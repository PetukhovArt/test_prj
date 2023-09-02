import GitHubStore from "@/store/profile.store.ts";
import { observer } from "mobx-react";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { formatDate } from "@/common/helpers";
import useMediaQuery from "@mui/material/useMediaQuery";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import s from "./repos-list-grid.module.scss";

export const ReposListGrid = observer(() => {
  const { repos } = GitHubStore;
  const isMobile = useMediaQuery("(max-width:480px)");

  if (!repos) {
    return <CircularProgress />;
  } else
    return (
      <>
        <Grid container spacing={2}>
          {repos.map((repo) => (
            <Grid
              item
              xs={isMobile ? 12 : 6}
              key={repo.name}
              className={s.grid}
            >
              <Card className={s.card}>
                <CardContent>
                  <Typography variant="h6">
                    <Link href={repo.svn_url} underline="hover">
                      {repo.name}
                    </Link>
                  </Typography>

                  <Typography
                    sx={{ fontSize: 14 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {repo.language
                      ? `Language : ${repo.language}`
                      : "Language: unknown"}
                  </Typography>

                  <Typography variant="body2">
                    {repo.description ? repo.description : "-"}
                  </Typography>
                  <div className={s.footer}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
                      Created : {formatDate(repo.created_at)}
                    </Typography>
                    <Link href={repo.clone_url} underline="hover">
                      Clone repo
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </>
    );
});

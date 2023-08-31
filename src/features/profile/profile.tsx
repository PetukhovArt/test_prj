import Link from "@mui/material/Link";
import s from "./profile.module.scss";
import { FollowersView } from "@/components/profile/followers-list";
import Typography from "@mui/material/Typography";
import { observer } from "mobx-react";
import GitHubStore from "@/app/store.ts";
import { formatDate } from "@/common/helpers/date-helper.ts";
import CircularProgress from "@mui/material/CircularProgress";
import { RepoView } from "@/components/profile/repos-view";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import { useEffect } from "react";
export const Profile = observer(() => {
  const { getProfile, getFollowing, getUserRepos, profile } = GitHubStore;
  useEffect(() => {
    if (!profile) {
      getProfile();
      getUserRepos();
      getFollowing();
    }
  }, [profile]);

  if (!profile) {
    return <CircularProgress />;
  } else
    return (
      <Container sx={{ display: "flex", gap: "10px", flexDirection: "column" }}>
        <div className={s.header}>
          <Card sx={{ width: 320, height: 300 }}>
            <CardMedia
              component="img"
              alt="green iguana"
              height="200"
              image={profile.avatar_url}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                <Link href={profile.html_url} underline="hover">
                  {profile.login}
                </Link>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Account created: {formatDate(profile.created_at)}
              </Typography>
            </CardContent>
          </Card>
          <FollowersView />
        </div>
        <RepoView />
      </Container>
    );
});

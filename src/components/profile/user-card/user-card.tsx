import { observer } from "mobx-react";
import Card from "@mui/material/Card";
import s from "src/components/profile/user-card/user-card.module.scss";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { formatDate } from "@/common/helpers";
import ProfileStore from "@/store/profile.store.ts";
import CircularProgress from "@mui/material/CircularProgress";

export const UserCard = observer(() => {
  const { profile } = ProfileStore;

  if (!profile) {
    return <CircularProgress />;
  } else
    return (
      <Card className={s.card}>
        <CardMedia
          component="img"
          alt="avatar"
          height="200"
          image={profile.avatar_url}
        />
        <div className={s.content}>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className={s.name}
          >
            <Link href={profile.html_url} underline="hover">
              {profile.login}
            </Link>
          </Typography>
          <Typography variant="body2">{profile.bio}</Typography>
          <Typography variant="body2" color="text.secondary" mt={"5px"}>
            Account created: {formatDate(profile.created_at)}
          </Typography>
        </div>
      </Card>
    );
});

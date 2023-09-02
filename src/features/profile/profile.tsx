import s from "./profile.module.scss";
import { FollowersView } from "@/components/profile/followers-list";
import { observer } from "mobx-react";
import ProfileStore from "@/store/profile.store.ts";
import CircularProgress from "@mui/material/CircularProgress";
import { RepoView } from "@/components/profile/repos-view";
import { useEffect } from "react";
import { UserCard } from "@/components/profile/user-card/user-card.tsx";
export const Profile = observer(() => {
  const { getProfile, getFollowing, getUserRepos, profile } = ProfileStore;
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
      <div className={s.container}>
        <div className={s.about}>
          <UserCard />
          <FollowersView />
        </div>
        <RepoView />
      </div>
    );
});

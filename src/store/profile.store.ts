import { makeAutoObservable, runInAction } from "mobx";
import { API } from "@/api";
import { ProfileType, ReposType, UserType } from "@/api/api.types.ts";
import { fetchData } from "@/common/helpers";

class ProfileStore {
  profile: ProfileType | null = null;
  following: UserType[] = [];
  repos: ReposType[] = [];
  state: "done" | "pending" | "error" = "done";

  constructor() {
    makeAutoObservable(this);
  }

  getProfile = async () => {
    const profile = await fetchData(this, API.fetchProfile);
    runInAction(() => (this.profile = profile));
  };

  getUserRepos = async () => {
    const repos = await fetchData(this, API.fetchUserRepos);
    runInAction(() => (this.repos = repos));
  };

  getFollowing = async () => {
    const following = await fetchData(this, API.fetchFollowing);
    runInAction(() => (this.following = following));
  };
}

export default new ProfileStore();

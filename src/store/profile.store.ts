import { makeAutoObservable } from "mobx";
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
    this.profile = await fetchData(this, API.fetchProfile);
  };

  getUserRepos = async () => {
    this.repos = await fetchData(this, API.fetchUserRepos);
  };

  getFollowing = async () => {
    this.following = await fetchData(this, API.fetchFollowing);
  };
}

export default new ProfileStore();

import { makeAutoObservable, runInAction } from "mobx";
import { API } from "@/api";
import { ProfileType, ReposType, UserType } from "@/api/api.types.ts";

class GitHubStore {
  profile: ProfileType | null = null;
  following: UserType[] | null = [];
  repos: ReposType[] | null = [];
  users: UserType[] | null = [];
  team: UserType[] | null = [];
  languages = null;
  state: "done" | "pending" | "error" = "done";

  constructor() {
    makeAutoObservable(this);
  }

  getProfile = async () => {
    this.state = "pending";
    try {
      const res = await API.fetchProfile();
      runInAction(() => {
        this.profile = res.data;
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  getUserRepos = async () => {
    this.state = "pending";
    try {
      const res = await API.fetchUserRepos();
      runInAction(() => {
        this.repos = res.data;
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  getFollowing = async () => {
    this.state = "pending";
    try {
      const res = await API.fetchFollowing();
      runInAction(() => {
        this.following = res.data;
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  getRepoLanguages = async (repoName: string) => {
    this.state = "pending";
    try {
      const res = await API.fetchRepoLanguages(repoName);

      runInAction(() => {
        this.languages = res.data;
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };

  getUsers = async () => {
    this.state = "pending";
    try {
      const res = await API.fetchUsers();

      runInAction(() => {
        this.users = res.data;
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  filterUsers(value: string) {
    if (this.users) {
      this.users = this.users.filter((user) =>
        user.login.toLowerCase().includes(value.toLowerCase()),
      );
    }
  }
}

export default new GitHubStore();

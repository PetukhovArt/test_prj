import { makeAutoObservable, runInAction } from "mobx";
import { API } from "@/api";
import { ProfileType, ReposType, UserType } from "@/api/api.types.ts";

class GitHubStore {
  profile: ProfileType | null = null;
  following: UserType[] = [];
  repos: ReposType[] = [];
  users: UserType[] = [];
  team: UserType[] = [];
  languages = null;
  state: "done" | "pending" | "error" = "done";

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.deleteUsers = this.deleteUsers.bind(this);
  }

  getProfile = async () => {
    try {
      this.state = "pending";
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
    try {
      this.state = "pending";
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
    try {
      this.state = "pending";

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
    try {
      this.state = "pending";

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
    try {
      this.state = "pending";
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
    this.users = this.users.filter((user) =>
      user.login.toLowerCase().includes(value.toLowerCase()),
    );
  }
  addTeamUsers = (newUsers: UserType[]) => {
    this.team = [...newUsers, ...this.team];
  };
  deleteUsers = (newUsers: UserType[]) => {
    console.log(newUsers);
    this.users = this.users.filter((user) => !newUsers.includes(user));
  };
  addUsers = (newUsers: UserType[]) => {
    this.users = [...newUsers, ...this.users];
  };
  deleteTeamUsers = (newUsers: UserType[]) => {
    this.team = this.team.filter((user) => !newUsers.includes(user));
  };
  teamSort = () => {
    this.team = this.team.sort((a, b) => a.login.localeCompare(b.login));
  };
}

export default new GitHubStore();

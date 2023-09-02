import { makeAutoObservable, runInAction } from "mobx";
import { API } from "@/api";
import { ProfileType, ReposType, UserType } from "@/api/api.types.ts";

class ProfileStore {
  profile: ProfileType | null = null;
  following: UserType[] = [];
  repos: ReposType[] = [];
  state: "done" | "pending" | "error" = "done";

  constructor() {
    makeAutoObservable(this);
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
}

export default new ProfileStore();

// getRepoLanguages = async (repoName: string) => {
//     try {
//       this.state = "pending";
//
//       const res = await API.fetchRepoLanguages(repoName);
//
//       runInAction(() => {
//         this.languages = res.data;
//         this.state = "done";
//       });
//     } catch (e) {
//       runInAction(() => {
//         this.state = "error";
//       });
//     }
//   };
// }

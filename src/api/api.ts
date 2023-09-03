import axios from "axios";
import { ReposType, ProfileType, UserType } from "@/api/api.types.ts";
const instance = axios.create({
  baseURL: "https://api.github.com/",
});
const user = "PetukhovArt";

export const API = {
  fetchProfile() {
    return instance.get<ProfileType>(`users/${user}`);
  },
  fetchUserRepos() {
    return instance.get<ReposType[]>(`users/${user}/repos`);
  },
  fetchFollowing() {
    return instance.get<UserType[]>(`users/${user}/following`);
  },
  fetchUsers() {
    return instance.get<UserType[]>("users?since=50000000");
  },
  // fetchRepoLanguages(repoName: string) {
  //   return instance.get<any>(`repos/${user}/${repoName}/languages`);
  // },
};

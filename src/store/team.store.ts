import { makeAutoObservable, runInAction } from "mobx";
import { API } from "@/api";
import { UserType } from "@/api/api.types.ts";

class TeamStore {
  users: UserType[] = [];
  team: UserType[] = [];
  state: "done" | "pending" | "error" = "done";

  constructor() {
    makeAutoObservable(this);
  }

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
  get filterUsers() {
    return (value: string) => {
      if (value !== "") {
        return this.users.filter((user) =>
          user.login.toLowerCase().includes(value.toLowerCase()),
        );
      } else {
        return this.users;
      }
    };
  }
  addTeamUsers = (newUsers: UserType[]) => {
    this.team = [...newUsers, ...this.team];
  };
  deleteUsers = (newUsers: UserType[]) => {
    this.users = this.users.filter((user) => !newUsers.includes(user));
  };

  addUsers = (newUsers: UserType[]) => {
    this.users = [...newUsers, ...this.users];
  };
  deleteTeamUser = (id: number) => {
    this.team = this.team.filter((user) => user.id !== id);
  };
  deleteTeamUsers = (newUsers: UserType[]) => {
    this.team = this.team.filter((user) => !newUsers.includes(user));
  };

  get teamSort() {
    return (value: boolean) => {
      if (value) {
        return this.team.slice().sort((a, b) => a.login.localeCompare(b.login));
      } else if (!value) {
        return this.team.slice().sort((a, b) => b.login.localeCompare(a.login));
      } else {
        return this.team;
      }
    };
  }
}

export default new TeamStore();

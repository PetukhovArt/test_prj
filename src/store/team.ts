import {
  action,
  computed,
  makeAutoObservable,
  observable,
  runInAction,
} from "mobx";
import { API } from "@/api";
import { UserType } from "@/api/api.types.ts";

class TeamStore {
  users: UserType[] = [];
  filteredUsers: UserType[] = [];
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
        if (this.filteredUsers.length === 0) {
          this.filteredUsers = res.data;
        }
        this.state = "done";
      });
    } catch (e) {
      runInAction(() => {
        this.state = "error";
      });
    }
  };
  filterUsers = (value: string) => {
    if (value !== "") {
      this.filteredUsers = this.users.filter((user) =>
        user.login.toLowerCase().includes(value.toLowerCase()),
      );
    } else {
      this.filteredUsers = this.users;
    }
  };
  addTeamUsers = (newUsers: UserType[]) => {
    this.team = [...newUsers, ...this.team];
  };
  deleteUsers = (newUsers: UserType[]) => {
    const filtered = this.filteredUsers.slice();
    newUsers.forEach((newUser) => {
      const index = filtered.findIndex((user) => user === newUser);
      if (index !== -1) {
        filtered.splice(index, 1);
      }
    });
    this.filteredUsers = filtered;
    //TODO this not working ...
  };

  addUsers = (newUsers: UserType[]) => {
    this.filteredUsers = [...newUsers, ...this.filteredUsers];
  };
  deleteTeamUser = (id: number) => {
    const index = this.team.findIndex((user) => user.id === id);

    if (index === -1) {
      return;
    }
    this.team.splice(index, 1);
  };
  deleteTeamUsers = (newUsers: UserType[]) => {
    this.team = this.team.filter((user) => !newUsers.includes(user));
  };
  teamSort = () => {
    this.team = this.team.sort((a, b) => a.login.localeCompare(b.login));
  };
}

export default new TeamStore();

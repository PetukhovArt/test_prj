import { UserType } from "@/api/api.types.ts";

export const findNewUsers = (
  foundUsers: UserType[],
  usersColumn: UserType[],
) => {
  let newUsers: UserType[] = [];
  for (let i = 0; i < foundUsers.length; i++) {
    if (!usersColumn.includes(foundUsers[i])) {
      newUsers.push(foundUsers[i]);
    }
  }
  return newUsers;
};

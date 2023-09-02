import { UserType } from "@/api/api.types.ts";

export const findUsersById = (column: UserType[], checkedUsers: number[]) => {
  return column.filter((user) => checkedUsers.includes(user.id));
};

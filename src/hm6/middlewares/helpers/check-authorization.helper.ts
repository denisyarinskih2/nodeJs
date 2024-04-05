import { fetchUsers } from "../../services";

export function checkAuthorization(authorizationId: string): boolean {
  const allUsers = fetchUsers();

  const isUserExist = allUsers.find((user) => user.id === authorizationId);
  return isUserExist ? true : false;
}

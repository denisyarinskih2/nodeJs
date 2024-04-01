import { User } from "../models";
import dataBase from "../repositories/db.repository";

export function fetchUsers(): User[] {
  return dataBase.users;
}

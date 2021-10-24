import httpClient from "../../http-client";
import { User } from "./types";

const URL = 'https://jsonplaceholder.typicode.com/users';

export default function getUsers(): Promise<User[]> {
  return httpClient.get<User[]>(URL)
    .then((result) => result.data)
}

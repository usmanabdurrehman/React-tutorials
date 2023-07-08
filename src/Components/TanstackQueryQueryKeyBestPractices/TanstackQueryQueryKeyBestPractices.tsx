import { useQuery, useInfiniteQuery } from "@tanstack/react-query";

/*
QUERY KEYS BEST PRACTICES
1) Query key factories
2) Dont mix query keys
3) Array Keys
4) Structure
5) Colocation
*/

const todos = ["TODOS"];
const todosList = ["TODOS", "LIST"];
const todosListByFilter = ["TODOS", "LIST", { archived: false }];
const todosById = ["TODOS", 1];
const todosDetails = ["TODOS", "DETAILS"];

const todoQueryKeys = {
  all: ["TODOS"] as const,
  todosList: () => [...todoQueryKeys.all, "LIST"] as const,
  todosListByFilter: (filter: any) =>
    [...todoQueryKeys.todosList(), filter] as const,
  todosById: (id: number) => [...todoQueryKeys.all, id],
};

export default function TanstackQueryQueryKeyBestPractices() {
  useQuery(["QUERY", "1"]);
  useInfiniteQuery(["QUERY"]);
  useQuery(["QUERY", "2"]);
  useQuery(["DIFFERENT_QUERY", "2"]);
}

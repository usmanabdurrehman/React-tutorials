import {
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from "@tanstack/react-query";

/*
QUERY KEYS BEST PRACTICES
1) Query key factories
2) Dont mix query keys
3) Array Keys
4) Structure
5) Colocation
*/

const Structure = ["SCHEDULER", "TODOS", "LIST", { archived: false }];

const todosQueryKey = {
  all: ["TODOS"],
  list: () => [...todosQueryKey.all, "LIST"],
  listByFilter: (filter: { archived: boolean }) => [
    ...todosQueryKey.list(),
    filter,
  ],
  findById: (id: number) => [...todosQueryKey.all, id],
  details: () => [...todosQueryKey.all, "DETAILS"],
};

export default function TanstackQueryQueryKeyBestPractices() {
  useQuery(["GET_TODOS"]);
  useInfiniteQuery(["GET_TODOS"]);

  const queryClient = useQueryClient();
}

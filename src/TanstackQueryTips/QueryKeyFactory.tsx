import { queryOptions, useQuery } from "@tanstack/react-query";

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

const getTodos = queryOptions({
  queryKey: todosQueryKey.all,
  queryFn: () => [],
});

export const View = () => {
  useQuery(getTodos);

  return null;
};

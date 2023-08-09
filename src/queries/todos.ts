import { createQueryKeys } from "@lukemorales/query-key-factory";

type TodoFilters = {
  completed: boolean;
};

export const todoKeys = createQueryKeys("todos", {
  detail: (todoId: string) => [todoId],
  list: (filters: TodoFilters) => ({
    queryKey: [{ filters }],
    queryFn: (ctx) =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
  }),
});

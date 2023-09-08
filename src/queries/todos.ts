import { createQueryKeys } from "@lukemorales/query-key-factory";

type TodoFilters = {
  completed: boolean;
};

export const todoKeys = createQueryKeys("todos", {
  detail: (id: number) => [id],
  list: (filters: TodoFilters) => {
    return {
      queryKey: [{ filters }],
      queryFn: () =>
        fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
          res.json()
        ),
    };
  },
});

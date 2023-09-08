import { createQueryKeys } from "@lukemorales/query-key-factory";

export const usersKey = createQueryKeys("users", {
  detail: (id: number) => [id],
  list: () => {
    return {
      queryKey: ["list"],
      queryFn: () =>
        fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
          res.json()
        ),
    };
  },
});

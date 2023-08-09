import { createQueryKeys } from "@lukemorales/query-key-factory";

export const userKeys = createQueryKeys("users", {
  detail: (userId: string) => [userId],
  list: () => ({
    queryKey: ["list"],
    queryFn: (ctx) =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
  }),
});

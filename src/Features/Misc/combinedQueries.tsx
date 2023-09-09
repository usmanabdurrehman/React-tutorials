import { useQueries } from "@tanstack/react-query";

const ids = [1, 2, 3];
const { data } = useQueries({
  queries: ids.map((id) => ({
    queryKey: ["post", id],
    queryFn: () => {},
  })),
  combine: (results) => {
    return {
      data: results.map((result) => result.data),
      pending: results.some((result) => result.isPending),
    };
  },
});

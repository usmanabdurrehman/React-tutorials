import { Button } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

export default function TanstackQueryQueryKeyFilters() {
  useQuery(
    ["QUERY", "1"],
    async () => {
      await sleep(4000);
      return "QUERY_1";
    },
    { staleTime: 4000 }
  );
  useQuery(
    ["QUERY", "2"],
    async () => {
      await sleep(4000);
      return "QUERY_2";
    },
    { staleTime: 20000 }
  );
  useQuery(["DIFFERENT_QUERY", "2"], async () => {
    await sleep(4000);
    return "QUERY_2";
  });

  const queryClient = useQueryClient();

  return (
    <Button
      m={2}
      onClick={() => {
        console.log(
          queryClient
            .getQueriesData({
              // queryKey: ["QUERY"],
              type: "active",
              fetchStatus: "idle",
              predicate: (query) => {
                console.log("query", query);
                return query?.state?.data === "QUERY_2";
              },
            })
            .map((queryInfo) => queryInfo?.[0])
        );
      }}
    >
      Check Query Filters
    </Button>
  );
}

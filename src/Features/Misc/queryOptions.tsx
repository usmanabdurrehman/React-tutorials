import { queryOptions, useQuery, useQueryClient } from "@tanstack/react-query";

function groupOptions() {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: () => {},
    staleTime: 5000,
  });
}

useQuery(groupOptions());

const queryClient = useQueryClient();
queryClient.prefetchQuery(groupOptions());

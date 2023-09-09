import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";

import { QUERY_FN, QUERY_KEY } from "../../dummy";

export default function ObjectSignature() {
  // useQuery(QUERY_KEY, QUERY_FN);
  useQuery({ queryKey: QUERY_KEY, queryFn: QUERY_FN });

  // useMutation(QUERY_FN);
  useMutation({ mutationFn: QUERY_FN });

  const queryClient = useQueryClient();
  // queryClient.refetchQueries(QUERY_KEY);
  queryClient.refetchQueries({ queryKey: QUERY_KEY });

  // queryClient.fetchQuery(QUERY_KEY, QUERY_FN);
  queryClient.fetchQuery({ queryKey: QUERY_KEY, queryFn: QUERY_FN });
  return null;
}

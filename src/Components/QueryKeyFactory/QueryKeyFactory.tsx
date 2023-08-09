import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryKeys } from "../../queries";

export default function QueryKeyFactory() {
  const { data: todos = [] } = useQuery(queryKeys.users.list());
  const { data: users = [] } = useQuery(
    queryKeys.todos.list({ completed: true })
  );

  const queryClient = useQueryClient();
  return (
    <button
      onClick={() =>
        queryClient.refetchQueries(queryKeys.users.list().queryKey)
      }
    >
      Refetch List Query
    </button>
  );
}

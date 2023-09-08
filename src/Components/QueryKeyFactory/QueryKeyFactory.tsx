import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { queryKeys } from "../../queries";

const filters = { completed: true };

export default function QueryKeyFactory() {
  const { data: todos = [] } = useQuery(
    queryKeys.todos.list({ completed: true })
  );

  const { data: users = [] } = useQuery(queryKeys.users.list());

  const queryClient = useQueryClient();
  return (
    <>
      <button
        onClick={() => {
          queryClient.refetchQueries(queryKeys.users.list().queryKey);
        }}
      >
        Refetch List Query
      </button>
      <button
        onClick={() => {
          queryClient.fetchQuery(queryKeys.users.list());
        }}
      >
        Fetch List Query
      </button>
    </>
  );
}

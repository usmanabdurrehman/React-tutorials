import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const NewOptimistic = () => {
  const { data } = useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      return data;
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (newUser: string) =>
      axios.post("https://jsonplaceholder.typicode.com/users", {
        name: newUser,
      }),
    onSettled: (data) =>
      queryClient.setQueryData(["GET_USERS"], (users: any[] | undefined) => [
        ...(users || []),
        data?.data,
      ]),
  });

  console.log({ data });

  return (
    <div style={{ margin: 20 }}>
      <ul>
        {data?.map((todo: any) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
        {isPending && (
          <li style={{ opacity: isPending ? 0.5 : 1 }}>{variables}</li>
        )}
      </ul>
      <button onClick={() => mutate("Grocery")} style={{ marginLeft: 15 }}>
        Add Grocery todo
      </button>
    </div>
  );
};

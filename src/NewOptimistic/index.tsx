import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const NewOptimistic = () => {
  const { data } = useQuery({
    queryKey: ["GET_TODOS"],
    queryFn: async () => {
      const { data } = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      return data;
    },
  });
  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (newTodo: string) =>
      axios.post("https://jsonplaceholder.typicode.com/todos", {
        text: newTodo,
      }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  return (
    <div style={{ margin: 20 }}>
      <ul>
        {data?.slice(0, 5)?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
        {isPending && <li>{variables}</li>}
      </ul>
      <button onClick={() => mutate("Grocery")} style={{ marginLeft: 15 }}>
        Add Grocery todo
      </button>
    </div>
  );
};

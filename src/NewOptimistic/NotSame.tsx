import {
  MutationState,
  useMutation,
  UseMutationResult,
  useMutationState,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { User } from "../types";

export const Home = () => {
  const [name, setName] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (newTodo: string) =>
      axios.post("http://localhost:7000/users", { text: newTodo }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["GET_USERS"] }),
    mutationKey: ["ADD_USER"],
  });

  return (
    <div style={{ marginLeft: 15 }}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Add User Name"
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setName("");
            mutate(name);
          }
        }}
      />
    </div>
  );
};

export const UsersList = () => {
  const variables = useMutationState<string>({
    filters: { mutationKey: ["ADD_USER"], status: "pending" },
    select: (mutation) => mutation.state.variables as string,
  });

  const { data: users = [] } = useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axios.get("http://localhost:7000/users");
      return data;
    },
  });

  return (
    <ul>
      {users?.map((user: any) => (
        <li key={user.id}>{user.name}</li>
      ))}
      {variables && <li>{variables}</li>}
    </ul>
  );
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { User } from "../types";

export const NewOptimistic = () => {
  const [name, setName] = useState("");
  const { data: users = [] } = useQuery({
    queryKey: ["GET_USERS"],
    queryFn: async (): Promise<User[]> => {
      const { data } = await axios.get("http://localhost:7000/users");
      return data;
    },
  });

  const queryClient = useQueryClient();

  const { mutate, isPending, variables } = useMutation({
    mutationFn: (newUser: string) =>
      axios.post("http://localhost:7000/users", {
        name: newUser,
      }),
    onSettled: async () =>
      await queryClient.invalidateQueries({ queryKey: ["GET_USERS"] }),
  });

  return (
    <div style={{ margin: 20 }}>
      <ul>
        {users?.map((user: any) => (
          <li key={user.id}>{user.name}</li>
        ))}
        {isPending && <li>{variables}</li>}
      </ul>

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
    </div>
  );
};

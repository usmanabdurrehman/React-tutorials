import { useQuery } from "@tanstack/react-query";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return {
        name: "Alex",
        username: "alex87",
        email: "alex@gmail.com",
        password: "123456",
        confirmPassword: "123456",
      };
    },
  });
};

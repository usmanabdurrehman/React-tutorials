import { MEMBERS } from "@/constants";
import { useQuery } from "@tanstack/react-query";
import React from "react";

export const useMembers = () => {
  return useQuery({
    queryKey: ["Members"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return MEMBERS;
    },
  });
};

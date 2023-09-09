import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { QUERY_KEY } from "../../dummy";

export default function GetQueryData() {
  const queryClient = useQueryClient();

  queryClient.getQueryData(QUERY_KEY);

  queryClient.getQueryState(QUERY_KEY);
  return null;
}

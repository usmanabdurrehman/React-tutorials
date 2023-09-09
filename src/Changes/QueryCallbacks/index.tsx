import { useQuery } from "@tanstack/react-query";
import { QUERY_FN, QUERY_KEY } from "../../dummy";

export default function ObjectSignature() {
  useQuery({
    queryKey: QUERY_KEY,
    queryFn: QUERY_FN,
  });

  return null;
}

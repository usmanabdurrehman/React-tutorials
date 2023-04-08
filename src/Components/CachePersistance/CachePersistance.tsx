import axios from "axios";
import React from "react";
import { useQuery } from "react-query";

export default function CachePersistance() {
  const { isLoading } = useQuery(["LONG_DELAY_QUERY"], async () => {
    const { data } = await axios.get(
      "https://hub.dummyapis.com/delay?seconds=5"
    );
    return data;
  });
  return (
    <div>
      <h2>CachePersistance</h2>
      {isLoading && "Loading..."}
    </div>
  );
}

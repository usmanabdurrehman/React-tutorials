import { Box, Button, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export const QueryCancellation = () => {
  const [showInfo, setShowInfo] = useState(false);

  const { data } = useQuery(["LONG_DELAY_QUERY"], async ({}) => {
    const { data } = await axios.get(
      "https://hub.dummyapis.com/delay?seconds=6"
    );
    return data;
  });

  const queryClient = useQueryClient();

  return (
    <div>
      <Button onClick={() => queryClient.cancelQueries(["LONG_DELAY_QUERY"])}>
        Cancel Request
      </Button>
    </div>
  );
};

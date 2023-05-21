import { Button, Flex } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { Feedback } from "../Feedback";

export const ReactQueryLoadingIndicators = () => {
  const { refetch } = useQuery(["QUERY"], async () => {
    const { data } = await axios.get("/items");
    return data;
  });

  const [feedback, setFeedback] = useState<"error" | "success">();

  const { mutateAsync: mutate } = useMutation(async () => {
    const { data } = await axios.post("/items");
    return data;
  });

  const { mutateAsync: mutateError } = useMutation(async () => {
    const { data } = await axios.post("/items/error");
    return data;
  });

  return (
    <>
      <Flex gap={4}>
        <Button onClick={() => refetch()}>Refetch Query</Button>
        <Button onClick={() => mutate()}>Mutate</Button>
        <Button onClick={() => mutateError()}>Mutate Error</Button>
      </Flex>
    </>
  );
};

import { Button } from "@chakra-ui/react";
import React from "react";
import { useLogin } from "../mutations/useLogin";

export default function Home() {
  const { mutate: login } = useLogin();

  return (
    <div>
      <Button colorScheme="green" onClick={() => login()}>
        Login
      </Button>
    </div>
  );
}

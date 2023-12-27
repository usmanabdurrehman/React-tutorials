import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type UserState = {
  firstName: string;
  lastName: string;
};

type UserAction = {
  updateFirstName: (firstName: string) => void;
  updateLastName: (lastName: string) => void;
  reset: () => void;
};

const initialUserState = { firstName: "", lastName: "" };

const useUserStore = create<UserState & UserAction>()(
  devtools((set) => ({
    ...initialUserState,
    updateFirstName: (firstName: string) => set(() => ({ firstName })),
    updateLastName: (lastName: string) => set(() => ({ lastName })),
    reset: () => set(() => initialUserState),
  }))
);

const updateFirstName = (firstName: string) =>
  useUserStore.setState({ firstName });

export const UserForm = () => {
  const { firstName, lastName, updateFirstName, updateLastName, reset } =
    useUserStore((state) => state);

  console.log({ firstName, lastName });

  return (
    <Box p={4} width={300}>
      <FormControl>
        <FormLabel>First Name</FormLabel>
        <Input
          value={firstName}
          onChange={(e) => updateFirstName(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>Last Name</FormLabel>
        <Input
          value={lastName}
          onChange={(e) => updateLastName(e.target.value)}
        />
      </FormControl>
      <Flex alignItems="center" mt={4} gap={2}>
        <Flex>
          <Button colorScheme={"whatsapp"} onClick={() => {}}>
            Submit
          </Button>
        </Flex>
        <Flex>
          <Button onClick={reset}>Reset</Button>
        </Flex>
      </Flex>
    </Box>
  );
};

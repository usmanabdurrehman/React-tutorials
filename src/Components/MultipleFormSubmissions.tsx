import { Box, Button, Flex, FormControl, FormLabel } from "@chakra-ui/react";
import { FormProvider, useForm } from "react-hook-form";
import ControlledInput from "./Controlled/ControlledInput";

type FormValues = { member: string };

const saveToAdmin = (values: FormValues) => {};
const saveForLater = (values: FormValues) => {};
const complete = (values: FormValues) => {};

export const MultipleFormSubmissions = () => {
  const form = useForm<FormValues>();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(() => {})}>
        <Box>
          <FormControl mt={2}>
            <FormLabel>Member</FormLabel>
            <ControlledInput name="member" />
          </FormControl>

          <Flex alignItems="center" gap={2} mt={4}>
            <Button colorScheme="blue" onClick={() => {}}>
              Send to Admin
            </Button>
            <Button colorScheme="green" onClick={() => {}}>
              Save For Later
            </Button>
            <Button colorScheme="pink" onClick={() => {}}>
              Complete
            </Button>
          </Flex>
        </Box>
      </form>
    </FormProvider>
  );
};

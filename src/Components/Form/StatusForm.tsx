import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { addTodo } from "../../utilities";
import { useState } from "react";

export function StatusForm() {
  return (
    <div>
      <form
        action={async (formData) => {
          const message = formData.get("message");
          if (!message || typeof message !== "string") return;
          await addTodo(message);
        }}
      >
        <Form />
      </form>
    </div>
  );
}

const Form = () => {
  const data = useFormStatus();

  const { pending: isLoading } = data;

  return (
    <Box m={4} width={300}>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Input name="message" />
      </FormControl>

      <Button
        mt={4}
        type="submit"
        colorScheme="whatsapp"
        isDisabled={isLoading}
      >
        {isLoading ? "Submitting" : "Submit"}
      </Button>
    </Box>
  );
};

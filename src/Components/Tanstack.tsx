import { Box, Button, Flex, Heading, Input, Spinner } from "@chakra-ui/react";
import { useForm } from "@tanstack/react-form";

export default function TanstackForm() {
  const form = useForm({
    defaultValues: { name: "", email: "" },
    onSubmit: async ({ value }) => {
      console.log({ value });
    },
  });

  console.log("form rerendering");

  return (
    <Box p={4} boxShadow={"lg"} bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex mt={4} flexDir={"column"} gap={2}>
          <form.Field name="name">
            {(field) => {
              console.log("Name Field is rerendering");
              return (
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                    form.setFieldValue("name", e.target.value);
                  }}
                  onBlur={field.handleBlur}
                  placeholder="Name"
                />
              );
            }}
          </form.Field>

          <form.Field name="email">
            {(field) => {
              console.log("Email Field is rerendering");
              return (
                <Input
                  value={field.state.value}
                  onChange={(e) => {
                    field.handleChange(e.target.value);
                  }}
                  onBlur={field.handleBlur}
                  placeholder="Email"
                />
              );
            }}
          </form.Field>
        </Flex>
        <form.Subscribe
          selector={(state) => [
            state.isValid,
            state.isDirty,
            state.isSubmitting,
          ]}
        >
          {([isValid, isDirty, isSubmitting]) => {
            return (
              <Button
                type="submit"
                colorScheme="blue"
                mt={2}
                isDisabled={!isValid || !isDirty || isSubmitting}
                width="100px"
              >
                {isSubmitting ? <Spinner size="xs" /> : "Submit"}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </Box>
  );
}

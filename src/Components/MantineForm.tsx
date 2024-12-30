import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { useForm } from "@mantine/form";
import Select from "react-select";

export function MantineForm() {
  const form = useForm({
    mode: "controlled",
    initialValues: {
      email: "",
      name: "",
    },
  });

  console.log("form rerendering");
  console.log(form.getInputProps("name"));

  return (
    <Box p={4} boxShadow={"lg"} bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
        <Flex mt={4} flexDir={"column"} gap={2}>
          <Input
            placeholder="Name"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <Select
            options={[
              { label: "Senior", value: "1" },
              { label: "Junior", value: "2" },
            ]}
          />
        </Flex>
      </form>
    </Box>
  );
}

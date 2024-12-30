import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  name: string;
  email: string;
};

export default function RHFForm() {
  const { register, handleSubmit, control, formState } = useForm<Inputs>({
    defaultValues: { name: "", email: "" },
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);
  console.log("form is rerendering");

  return (
    <Box p={4} boxShadow={"lg"} bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex mt={4} flexDir={"column"} gap={2}>
          <Input {...register("name")} placeholder="Name" />

          <Controller
            name="email"
            control={control}
            render={({ field }) => {
              return <Input {...field} placeholder="Email" />;
            }}
          />
        </Flex>
      </form>
    </Box>
  );
}

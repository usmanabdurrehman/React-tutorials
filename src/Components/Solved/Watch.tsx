import { Badge, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { FormProvider, useForm, useWatch } from "react-hook-form";

const Name = () => {
  const name = useWatch({ name: "name" });

  console.log("Child Rerendered");

  return (
    <Badge colorScheme="red">
      <b>Name:</b> {name}
    </Badge>
  );
};

export default function Watch() {
  const form = useForm();

  console.log("Parent Rerendered");

  return (
    <FormProvider {...form}>
      <Name />
      <FormControl mt={2}>
        <FormLabel>Name</FormLabel>
        <Input {...form.register("name")} />
      </FormControl>
      <FormControl>
        <FormLabel>Description</FormLabel>
        <Input {...form.register("description")} />
      </FormControl>
    </FormProvider>
  );
}

import { Badge, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import React from "react";
import {
  FormProvider,
  useForm,
  useFormContext,
  useWatch,
} from "react-hook-form";

const Name = () => {
  const { watch } = useFormContext();
  const name = watch("name");

  console.log("Child Rerendered");

  return (
    <Badge colorScheme="red">
      <b>Name:</b> {name}
    </Badge>
  );
};

export default function Watch() {
  const form = useForm();
  const name = form.watch("name");

  console.log("Parent Rerendered");

  return (
    <FormProvider {...form}>
      <Badge colorScheme="red">
        <b>Name:</b> {name}
      </Badge>
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

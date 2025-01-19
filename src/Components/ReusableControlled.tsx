import { Box, FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import ControlledInput from "./Controlled/ControlledInput";
import ControlledSwitch from "./Controlled/ControlledSwitch";

export const ReusableControlled = () => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Box>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <ControlledInput name="name" />
        </FormControl>
        <FormControl mt={2}>
          <FormLabel>Is Retired?</FormLabel>
          <ControlledSwitch name="isRetired" />
        </FormControl>
      </Box>
    </FormProvider>
  );
};

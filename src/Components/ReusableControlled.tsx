import { Box, FormControl, FormLabel, Input, Switch } from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";

export const ReusableControlled = () => {
  const { control } = useForm();

  return (
    <Box>
      <FormControl>
        <FormLabel>Name</FormLabel>
        <Controller
          name="name"
          control={control}
          render={({ field }) => <Input {...field} />}
        />
      </FormControl>
      <FormControl mt={2}>
        <FormLabel>Is Retired?</FormLabel>
        <Controller
          name="isRetired"
          control={control}
          render={({ field }) => (
            <Switch
              isChecked={field.value}
              onChange={(e) => {
                field.onChange(e.target.checked);
              }}
            />
          )}
        />
      </FormControl>
    </Box>
  );
};

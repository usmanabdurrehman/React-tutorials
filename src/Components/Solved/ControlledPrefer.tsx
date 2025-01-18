import { Box, FormControl, FormLabel } from "@chakra-ui/react";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
import { useMembers } from "@/queries/useMembers";
import ControlledSelect from "../Controlled/ControlledSelect";

export const ControlledPrefer = () => {
  const form = useForm({
    defaultValues: { member: "Michael" },
  });

  const { data: members = [] } = useMembers();

  return (
    <FormProvider {...form}>
      <Box>
        <FormControl mt={2}>
          <FormLabel>Member</FormLabel>
          <ControlledSelect placeholder="Select Member" name="member" mt={2}>
            {members.map((value) => (
              <option value={value}>{value}</option>
            ))}
          </ControlledSelect>
        </FormControl>
      </Box>
    </FormProvider>
  );
};

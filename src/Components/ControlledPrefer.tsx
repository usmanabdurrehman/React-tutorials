import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MEMBERS } from "@/constants";
import { useMembers } from "@/queries/useMembers";

export const ControlledPrefer = () => {
  const { register } = useForm({
    defaultValues: { member: "Michael" },
  });

  const { data: members = [] } = useMembers();

  return (
    <Box>
      <FormControl mt={2}>
        <FormLabel>Member</FormLabel>
        <Select
          {...register("member")}
          placeholder="Select Member"
          name="member"
          mt={2}
        >
          {MEMBERS.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

import { Box, FormControl, FormLabel, Select } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { MEMBERS } from "@/constants";
import { useMembers } from "@/queries/useMembers";

export const ReusableUtils = () => {
  const { setValue } = useForm();

  const { data: members = [] } = useMembers();

  return (
    <Box>
      <FormControl mt={2}>
        <FormLabel>Member</FormLabel>
        <Select
          placeholder="Select Member"
          name="member"
          mt={2}
          onChange={(e) => {
            setValue("name", undefined);
            setValue("description", e.target.value);
            setValue("email", "test@test.com");
          }}
        >
          {members.map((value) => (
            <option value={value}>{value}</option>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

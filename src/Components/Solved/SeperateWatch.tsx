import {
  Badge,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import { Heading } from "lucide-react";
import { FormProvider, useForm, useWatch } from "react-hook-form";
import ControlledInput from "../Controlled/ControlledInput";
import ControlledSwitch from "../Controlled/ControlledSwitch";

const FormDisplayText = () => {
  const [name, description] = useWatch({
    name: ["name", "description"],
  });

  console.log("FormDisplayText rendered");

  return (
    <Box>
      <Heading>{name}</Heading>
      <Text fontWeight="bold" mt={1}>
        {description}
      </Text>
    </Box>
  );
};

const FormDisplaySenior = () => {
  const isSenior = useWatch({
    name: "isSenior",
  });

  console.log("FormDisplaySenior rendered");

  return (
    <Box>
      {isSenior && (
        <Badge mt={2} colorScheme="green">
          Is Senior
        </Badge>
      )}
    </Box>
  );
};

const FormDisplayBtn = () => {
  const isRetired = useWatch({
    name: "isRetired",
  });

  console.log("FormDisplayBtn rendered");

  return (
    <Button mt={2} isDisabled={isRetired} colorScheme="blue">
      Get Stats
    </Button>
  );
};

const FormDisplay = () => {
  console.log("FormDisplay rendered");
  return (
    <>
      <FormDisplayText />
      <FormDisplaySenior />
      <FormDisplayBtn />
    </>
  );
};

const Form = () => {
  return (
    <Flex gap={2} direction={"column"}>
      <ControlledInput name="name" placeholder="Name" />
      <ControlledInput name="description" placeholder="Description" />
      <FormControl display="flex" alignItems="center">
        <FormLabel>Is Senior?</FormLabel>
        <ControlledSwitch name="isSenior" />
      </FormControl>
      <FormControl>
        <FormLabel htmlFor="email-alerts" mb="0">
          is Retired
        </FormLabel>
        <ControlledSwitch name="isRetired" />
      </FormControl>
    </Flex>
  );
};

export default function SeperateWatch() {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <Flex gap={2}>
        <FormDisplay />
        <Form />
      </Flex>
    </FormProvider>
  );
}

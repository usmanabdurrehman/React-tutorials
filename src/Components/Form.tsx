import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  IconButton,
  Input,
  Spinner,
} from "@chakra-ui/react";
import { FieldApi, useForm, useStore } from "@tanstack/react-form";
import { z } from "zod";
import * as Yup from "yup";
import { yupValidator } from "@tanstack/yup-form-adapter";
import { Trash } from "lucide-react";
import { useUser } from "../queries/useUser";

const Field = ({
  label,
  children,
  field,
}: {
  label: string;
  children: React.ReactNode;
  field: FieldApi<any, any, any, any>;
}) => {
  const errors = field.state.meta.errors;

  return (
    <FormControl isInvalid={!!errors?.length}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>{errors?.join(", ")}</FormErrorMessage>
    </FormControl>
  );
};

const sleep = (timeout: number) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const zodSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Email is invalid"),
  username: z.string(),
  password: z.string(),
  confirmPassword: z.string(),
});

const yupSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Email is invalid"),
  username: Yup.string(),
  password: Yup.string(),
  confirmPassword: Yup.string(),
});

export default function Form() {
  const { data, isLoading } = useUser();

  const form = useForm({
    defaultValues: data,
    onSubmit: async ({ value, formApi }) => {
      await sleep(1000);
      console.log({ value });
      formApi.reset();
    },
    validatorAdapter: yupValidator(),
    validators: {
      onChange: yupSchema,
    },
  });

  return (
    <Box p={4} boxShadow={"lg"} bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex mt={4} flexDir={"column"} gap={2}>
          <form.Field
            name="name"
            listeners={{
              onBlur: ({ value }) => {
                form.setFieldValue(
                  "username",
                  value?.toLowerCase()?.slice(0, 3)
                );
              },
            }}
          >
            {(field) => {
              return (
                <Field label="Name" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="username">
            {(field) => {
              return (
                <Field label="Username" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field name="email">
            {(field) => {
              return (
                <Field label="Email" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <Heading fontSize="lg">Team Members</Heading>
          <form.Field name="teamMembers" mode="array">
            {(field) => {
              return (
                <Box>
                  {field?.state?.value?.map((_, i) => {
                    return (
                      <Flex
                        mt={2}
                        border="1px solid #eee"
                        borderRadius="md"
                        p={4}
                        gap={4}
                        pos="relative"
                      >
                        <form.Field
                          key={`${i}name`}
                          name={`teamMembers[${i}].name`}
                        >
                          {(subField) => {
                            return (
                              <Field label="Name" field={subField}>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) => {
                                    subField.handleChange(e.target.value);
                                  }}
                                  onBlur={subField.handleBlur}
                                />
                              </Field>
                            );
                          }}
                        </form.Field>
                        <form.Field
                          key={`${i}email`}
                          name={`teamMembers[${i}].email`}
                        >
                          {(subField) => {
                            return (
                              <Field label="Email" field={subField}>
                                <Input
                                  value={subField.state.value}
                                  onChange={(e) => {
                                    subField.handleChange(e.target.value);
                                  }}
                                  onBlur={subField.handleBlur}
                                />
                              </Field>
                            );
                          }}
                        </form.Field>
                        <IconButton
                          aria-label="Delete"
                          icon={<Trash />}
                          pos="absolute"
                          top={2}
                          right={2}
                          size="sm"
                          colorScheme="red"
                          onClick={() => {
                            field.removeValue(i);
                          }}
                        />
                      </Flex>
                    );
                  })}
                  <Button
                    mt={2}
                    bg="black"
                    color="white"
                    _hover={{
                      bg: "black",
                      color: "white",
                    }}
                    onClick={() => field.pushValue({ email: "", name: "" })}
                  >
                    Add Team Member
                  </Button>
                </Box>
              );
            }}
          </form.Field>
          <form.Field name="password">
            {(field) => {
              return (
                <Field label="Password" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Passwords do not match";
                }
              },
            }}
          >
            {(field) => {
              return (
                <Field label="Confirm Password" field={field}>
                  <Input
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(e.target.value);
                    }}
                    onBlur={field.handleBlur}
                  />
                </Field>
              );
            }}
          </form.Field>
        </Flex>
        <form.Subscribe
          selector={(state) => [
            state.isValid,
            state.isDirty,
            state.isSubmitting,
          ]}
        >
          {([isValid, isDirty, isSubmitting]) => {
            return (
              <Button
                type="submit"
                colorScheme="blue"
                mt={2}
                isDisabled={!isValid || !isDirty || isSubmitting}
                width="100px"
              >
                {isSubmitting ? <Spinner size="xs" /> : "Submit"}
              </Button>
            );
          }}
        </form.Subscribe>
      </form>
    </Box>
  );
}

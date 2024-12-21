import {
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Spinner,
  Box,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useForm, useStore } from "@tanstack/react-form";

import type { FieldApi } from "@tanstack/react-form";

import { z } from "zod";
import { useUser } from "../queries/useUser";
import { Trash } from "lucide-react";
import * as Yup from "yup";
import { yupValidator } from "@tanstack/yup-form-adapter";

// No Validator Adapter Needed for Zod
// import { zodValidator } from "@tanstack/zod-form-adapter";

/*
The form state object has a canSubmit flag that is false when any field is invalid and the form has been touched (canSubmit is true until the form has been touched, even if some fields are "technically" invalid based on their onChange/onBlur props).
*/

const Field = ({
  label,
  children,
  field,
}: {
  label: string;
  children: React.ReactNode;
  field: FieldApi<any, any, any, any>;
}) => {
  return (
    <FormControl isInvalid={!!field.state.meta.errors.length}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormErrorMessage>
        {field.state.meta.errors.join(", ")}
        {/* {field.state.meta.errorMap["onChange"]} */}
      </FormErrorMessage>
    </FormControl>
  );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
});

const userSchemaYup = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Enter a valid email"),
});

export default function Form() {
  const { data, isLoading } = useUser();

  const form = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      teamMembers: [] as { name: string; email: string }[],
    },
    onSubmit: async ({ value, formApi }) => {
      // Do something with form data
      await sleep(1000);
      console.log(value);
      formApi.reset();
    },
    // validatorAdapter: yupValidator(),
    validators: {
      // Add validators to the form the same way you would add them to a field
      // onChange: ({ value }) => {
      // if (value.name.length < 3) {
      //   return { fields: { name: "Name must be at least 3 characters" } };
      // }
      // if (value.password !== value.confirmPassword) {
      //   return { fields: { confirmPassword: "Passwords do not match" } };
      // }
      // return "";
      // },
      // onChange: userSchema,
      // onChange: userSchemaYup,
    },
  });

  // form.reset()

  // For cases when a single string is being returned in validator
  // const formErrorMap = useStore(form.store, (state) => state.errorMap);

  // const isValid = useStore(form.store, (state) => state.isValid);

  console.log("form rerendering");

  return (
    <Box p={4} boxShadow="lg" borderRadius="lg" bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <Flex gap={2} flexDirection="column" mt={4}>
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) =>
                !value
                  ? "A first name is required"
                  : value.length < 3
                  ? "First name must be at least 3 characters"
                  : undefined,
              onChangeAsyncDebounceMs: 500,
              onChangeAsync: async ({ value }) => {
                await new Promise((resolve) => setTimeout(resolve, 1000));
                return (
                  value.includes("error") && 'No "error" allowed in first name'
                );
              },
            }}
            listeners={{
              onBlur: ({ value }) => {
                form.setFieldValue(
                  "username",
                  value?.slice(0, 3)?.toLowerCase()
                );
              },
            }}
          >
            {(field) => (
              <Field label="Name" field={field}>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="username">
            {(field) => (
              <Field label="Username" field={field}>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>
          <form.Field name="email">
            {(field) => (
              <Field label="Email" field={field}>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              </Field>
            )}
          </form.Field>
          <Heading fontSize="lg">Team Members</Heading>
          <form.Field name="teamMembers" mode="array">
            {(field) => {
              return (
                <Box>
                  {field.state.value.map((_, i) => {
                    return (
                      <Flex
                        mt={2}
                        border={"1px solid #eee"}
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
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
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
                                  onChange={(e) =>
                                    subField.handleChange(e.target.value)
                                  }
                                />
                              </Field>
                            );
                          }}
                        </form.Field>
                        <IconButton
                          aria-label="Delete"
                          size="sm"
                          colorScheme="red"
                          pos="absolute"
                          top={2}
                          right={2}
                          icon={<Trash />}
                          onClick={() => {
                            field.removeValue(i);
                          }}
                        />
                      </Flex>
                    );
                  })}

                  <Button
                    onClick={() => field.pushValue({ name: "", email: "" })}
                    type="button"
                    bg="black"
                    color="white"
                    _hover={{ bg: "black", color: "white" }}
                    size="sm"
                    mt={4}
                  >
                    Add Team Member
                  </Button>
                </Box>
              );
            }}
          </form.Field>

          <form.Field name="password">
            {(field) => (
              <Field label="Password" field={field}>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                />
              </Field>
            )}
          </form.Field>
          <form.Field
            name="confirmPassword"
            validators={{
              onChangeListenTo: ["password"],
              onChange: ({ value, fieldApi }) => {
                if (value !== fieldApi.form.getFieldValue("password")) {
                  return "Passwords do not match";
                }
                return undefined;
              },
            }}
          >
            {(field) => (
              <Field label="Confirm Password" field={field}>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  type="password"
                />
              </Field>
            )}
          </form.Field>
          <form.Subscribe
            selector={(state) => [
              state.isValid,
              state.isSubmitting,
              state.isDirty,
            ]}
            children={([isValid, isSubmitting, isDirty]) => {
              console.log("subscribe component rerendering");
              return (
                <Button
                  type="submit"
                  isDisabled={!isValid || !isDirty}
                  width="100px"
                  colorScheme="blue"
                  mt={2}
                >
                  {isSubmitting ? <Spinner size="xs" /> : "Submit"}
                </Button>
              );
            }}
          />
        </Flex>
      </form>
    </Box>
  );
}

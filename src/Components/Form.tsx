import {
  FormHelperText,
  FormLabel,
  FormControl,
  FormErrorMessage,
  Input,
  Button,
  Spinner,
} from "@chakra-ui/react";
import { Flex } from "@chakra-ui/react";
import React from "react";
import { useForm } from "@tanstack/react-form";

import type { FieldApi } from "@tanstack/react-form";

import { z } from "zod";

// No Validator Adapter Needed for Zod
// import { zodValidator } from "@tanstack/zod-form-adapter";

/*
The form state object has a canSubmit flag that is false when any field is invalid and the form has been touched (canSubmit is true until the form has been touched, even if some fields are "technically" invalid based on their onChange/onBlur props).
*/

const Field = ({
  label,
  children,
  helperText,
  field,
}: {
  label: string;
  children: React.ReactNode;
  helperText?: string;
  field: FieldApi<any, any, any, any>;
}) => {
  console.log(field.state.meta.errors);
  return (
    <FormControl isInvalid={!!field.state.meta.errors.length}>
      <FormLabel>{label}</FormLabel>
      {children}
      <FormHelperText>{helperText}</FormHelperText>
      <FormErrorMessage>
        {field.state.meta.errors.join(", ")}
        {/* {field.state.meta.errorMap["onChange"]} */}
      </FormErrorMessage>
    </FormControl>
  );
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const userSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});

export default function Form() {
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      // Do something with form data
      await sleep(1000);
      console.log(value);
    },
    validators: {
      // Add validators to the form the same way you would add them to a field
      onChange: ({ value }) => {
        if (value.name.length < 3) {
          return { fields: { name: "Name must be at least 3 characters" } };
        }
        return "";
      },
      // onChange: userSchema,
    },
  });

  // form.reset()

  console.log("form rerendering");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <Flex p={4} gap={2} flexDirection="column">
        <form.Field
          name="name"
          // validators={{
          //   onChange: ({ value }) =>
          //     !value
          //       ? "A first name is required"
          //       : value.length < 3
          //       ? "First name must be at least 3 characters"
          //       : undefined,
          //   onChangeAsyncDebounceMs: 500,
          //   onChangeAsync: async ({ value }) => {
          //     await new Promise((resolve) => setTimeout(resolve, 1000));
          //     return (
          //       value.includes("error") && 'No "error" allowed in first name'
          //     );
          //   },
          // }}
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
        <form.Subscribe
          // selector={(state) => state}
          children={({ isValid, isSubmitting, isDirty }) => {
            return (
              <Button
                type="submit"
                isDisabled={!isValid || !isDirty}
                width="100px"
                colorScheme="blue"
              >
                {isSubmitting ? <Spinner size="xs" /> : "Submit"}
              </Button>
            );
          }}
        />
      </Flex>
    </form>
  );
}

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";

import * as Yup from "yup";

/*
1) Form Level Validation
2) Field level validation
3) Controlling form level validation occurence
4) Manually triggering validation
*/

const ValidationSchema = Yup.object({
  email: Yup.string()
    .required("The email is required")
    .min(10, "The email should have 10 characters"),
  password: Yup.string().required("The password is required"),
});

export const ValidationCrashCourse = () => (
  <Flex
    height="100vh"
    alignItems={"center"}
    justifyContent="center"
    bg="#d8bfff"
  >
    <Box boxShadow={"2xl"} width="350px" padding="10" rounded="xl" bg="white">
      <Formik
        onSubmit={async () => {}}
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={ValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ handleSubmit, validateForm, validateField }) => {
          return (
            <Form>
              <h2>Formik Validation</h2>
              <Field name="email">
                {({ field, meta }: any) => (
                  <FormControl isInvalid={!!meta.error}>
                    <FormLabel>Email</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
                {({ field, meta }: any) => (
                  <FormControl isInvalid={!!meta.error}>
                    <FormLabel>Password</FormLabel>
                    <Input {...field} />
                    <FormErrorMessage>{meta.error}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Button
                colorScheme={"whatsapp"}
                mt={4}
                mr={4}
                onClick={() => {
                  validateField("password");
                }}
              >
                Trigger Val for Password
              </Button>
              <Button
                colorScheme={"whatsapp"}
                mt={4}
                onClick={() => {
                  handleSubmit();
                }}
              >
                Sign in
              </Button>
            </Form>
          );
        }}
      </Formik>
    </Box>
  </Flex>
);

import { Box, Flex, Heading, Input } from "@chakra-ui/react";
import { FastField, Field, FieldProps, Form, Formik } from "formik";

const initialValues = { name: "", email: "", password: "" };

export default function FormikForm() {
  return (
    <Box p={4} boxShadow={"lg"} bg="white">
      <Heading fontSize="4xl">Sign Up</Heading>
      <Formik initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => {
          console.log("form rerendering");

          return (
            <Form>
              <Flex mt={4} flexDir={"column"} gap={2}>
                <Input
                  value={values.name}
                  placeholder="Name"
                  onChange={(e) => {
                    setFieldValue("sdkjskdj");
                    setFieldValue("name", e.target.value);
                  }}
                />
                <Field name="sdlksdl">
                  {({ field }: FieldProps) => (
                    <Input {...field} placeholder="Email" />
                  )}
                </Field>
                <FastField name="password">
                  {({ field }: FieldProps) => (
                    <Input {...field} placeholder="Password" />
                  )}
                </FastField>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  );
}

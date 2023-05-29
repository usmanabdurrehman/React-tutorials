import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
  useFormik,
  useField,
} from "formik";
import { useEffect } from "react";

import * as Yup from "yup";

/*
All Formik Hooks

useFormik => use formik without React Context
args => All props that <Formik/> accepts
returns => All props that Formik's child component gives

useFormikContext => get all formik props using Formik Context
args => none
returns => All props that Formik's child component gives

useField => for field related formik props using formik context
args => field name
returns => All state related to field
*/

const ValidationSchema = Yup.object({
  height: Yup.number().required("The height is required"),
  weight: Yup.number().required("The weight is required"),
});

const CustomField = () => {
  const { values, setFieldValue, errors } = useFormikContext<{
    height: string;
  }>();
  return (
    <FormControl isInvalid={!!errors.height}>
      <FormLabel>Height in metres</FormLabel>
      <NumberInput>
        <NumberInputField
          value={values.height}
          onChange={(value) => setFieldValue("height", value)}
        />
      </NumberInput>
      <FormErrorMessage>{errors.height}</FormErrorMessage>
    </FormControl>
  );
};

export const AllFormikHooks = () => {
  return (
    <Flex
      height="100vh"
      alignItems={"center"}
      justifyContent="center"
      bg="#bfffc9"
    >
      <Box boxShadow={"2xl"} width="350px" padding="10" rounded="xl" bg="white">
        <Formik
          onSubmit={async () => {}}
          initialValues={{
            height: undefined,
            weight: undefined,
          }}
          validationSchema={ValidationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          validateOnMount={false}
        >
          {({ submitForm, errors }) => {
            return (
              <Form>
                <h2>BMI Calculator</h2>
                <CustomField />
                <Field name="weight">
                  {({ field }: any) => (
                    <FormControl isInvalid={!!errors.weight}>
                      <FormLabel>Weight in kgs</FormLabel>
                      <NumberInput>
                        <NumberInputField {...field} />
                      </NumberInput>
                      <FormErrorMessage>{errors.weight}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button colorScheme={"whatsapp"} onClick={submitForm} mt={4}>
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Flex>
  );
};

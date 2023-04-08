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
import { ErrorMessage, Field, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";

import * as Yup from "yup";

const ValidationSchema = Yup.object({
  height: Yup.number().required("The height is required"),
  weight: Yup.number().required("The weight is required"),
});

export const BMICalculator = () => (
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
          bmi: undefined,
        }}
        validationSchema={ValidationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        validateOnMount={false}
      >
        {({ values, setFieldValue, errors, validateForm }) => {
          return (
            <Form>
              <h2>BMI Calculator</h2>
              <Field name="height">
                {({ field }: any) => (
                  <FormControl isInvalid={!!errors.height}>
                    <FormLabel>Height in metres</FormLabel>
                    <NumberInput>
                      <NumberInputField {...field} />
                    </NumberInput>
                    <FormErrorMessage>{errors.height}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
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
              <Flex alignItems="center" mt={4}>
                <Flex grow={1}>
                  <Button
                    colorScheme={"whatsapp"}
                    onClick={() => {
                      validateForm();
                      if (values.height && values.weight)
                        setFieldValue(
                          "bmi",
                          (values.weight / values.height ** 2).toFixed(1)
                        );
                    }}
                  >
                    Calculate
                  </Button>
                </Flex>
                <Flex grow={1}>BMI: {values.bmi}</Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  </Flex>
);

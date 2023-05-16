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

/*
Formik Form Submission

handleSubmit
submitForm

Stop Subsequent Submissions

Multiple Submit Buttons
*/

const ValidationSchema = Yup.object({
  height: Yup.number().required("The height is required"),
  weight: Yup.number().required("The weight is required"),
});

const timer = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const FormikFormSubmission = () => (
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
        {({ errors, isSubmitting, submitForm, values, validateForm }) => {
          const onSaveClick = () => {
            validateForm().then((validationErrors) => {
              if (!Object.values(validationErrors)?.length) {
                // submitting
                console.log("I am submitting");
              }
            });
          };

          const onSubmitClick = () => {};
          return (
            <Form>
              <h2>Submit Metrics</h2>
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
              <Flex alignItems="center" mt={4} gap={4}>
                <Flex grow={1}>
                  <Button
                    colorScheme={"whatsapp"}
                    onClick={() => {
                      onSubmitClick();
                    }}
                    isDisabled={isSubmitting}
                  >
                    Submit
                  </Button>
                </Flex>
                <Flex grow={1}>
                  <Button
                    colorScheme={"whatsapp"}
                    onClick={() => {
                      onSaveClick();
                    }}
                    isDisabled={isSubmitting}
                  >
                    Save
                  </Button>
                </Flex>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Box>
  </Flex>
);

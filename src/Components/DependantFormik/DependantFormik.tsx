import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  Select,
  Text,
} from "@chakra-ui/react";
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
  useFormikContext,
  validateYupSchema,
} from "formik";
import { useEffect } from "react";

import * as Yup from "yup";

const LOCATIONS = [
  {
    id: "us",
    name: "America",
    zipCode: "34532",
  },
  {
    id: "ca",
    name: "Canada",
    zipCode: "21023",
  },
  {
    id: "uk",
    name: "England",
    zipCode: "00002",
  },
  {
    id: "oth",
    name: "Other",
  },
];

type FormFields = {
  location?: string;
  zipCode?: string;
  provideLocation: boolean;
};

const ZipCode = () => {
  const { values, setFieldValue } = useFormikContext<FormFields>();

  useEffect(() => {
    setFieldValue(
      "zipCode",
      LOCATIONS.find((location) => location.id === values.location)?.zipCode ||
        ""
    );
  }, [values.location]);

  return (
    <Field name="zipCode">
      {({ field }: any) => (
        <FormControl>
          <FormLabel>Zip Code</FormLabel>
          <Input {...field} disabled={!values.provideLocation} />
        </FormControl>
      )}
    </Field>
  );
};

export const DependantFormik = () => (
  <Flex
    height="100vh"
    alignItems={"center"}
    justifyContent="center"
    bg="#eafaa3"
  >
    <Box boxShadow={"2xl"} width="500px" padding="10" rounded="xl" bg="white">
      <Formik
        onSubmit={async () => {}}
        initialValues={
          {
            location: undefined,
            provideLocation: true,
            zipcode: undefined,
          } as FormFields
        }
      >
        {({ values }) => {
          console.log("values", values);
          return (
            <Form>
              <Text fontSize="4xl">Formik Dependant Field</Text>
              <Field name="provideLocation">
                {({ field }: any) => (
                  <FormControl>
                    <Checkbox
                      size="md"
                      colorScheme="red"
                      {...field}
                      isChecked={field.value}
                    >
                      Provide Location
                    </Checkbox>
                  </FormControl>
                )}
              </Field>
              <Field name="location">
                {({ field }: any) => (
                  <FormControl>
                    <FormLabel>Location</FormLabel>
                    <Select {...field} disabled={!values.provideLocation}>
                      {LOCATIONS.map(({ id, name }) => (
                        <option value={id}>{name}</option>
                      ))}
                    </Select>
                  </FormControl>
                )}
              </Field>
              <ZipCode />
            </Form>
          );
        }}
      </Formik>
    </Box>
  </Flex>
);

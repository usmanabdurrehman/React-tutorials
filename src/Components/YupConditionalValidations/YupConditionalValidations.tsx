import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().when("applyValidation", (applyValidation, schema) => {
    if (applyValidation)
      return schema
        .min(2, "Too Short!")
        .max(70, "Too Long!")
        .required("Name is Required");
    else return schema;
  }),
});

export const YupConditionalValidations = () => (
  <div>
    <h1>{"<Formik/> Conditional Messages"}</h1>
    <Formik
      initialValues={{
        name: "",
        applyValidation: false,
      }}
      onSubmit={() => {}}
      validationSchema={Schema}
    >
      {({}) => (
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <label>
            <Field type="checkbox" name="applyValidation" />
            Apply Validation?
          </label>
          <p>
            <ErrorMessage name="name" />
          </p>
        </Form>
      )}
    </Formik>
  </div>
);

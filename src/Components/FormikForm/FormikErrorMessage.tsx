import { ErrorMessage, Field, Form, Formik } from "formik";

import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(70, "Too Long!")
    .required("Name is Required"),
});

export const FormikErrorMessage = () => (
  <div>
    <h1>{"<FormikErrorMessage/>"}</h1>
    <Formik
      initialValues={{
        name: "",
      }}
      onSubmit={() => {}}
      validationSchema={Schema}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field type="text" name="name" placeholder="Name" />
          <p>
            <ErrorMessage name="name" />
          </p>
        </Form>
      )}
    </Formik>
  </div>
);

import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
});

export const FormikInitial = () => (
  <div>
    <h1>{"Formik Initial"}</h1>
    <Formik
      onSubmit={async () => {}}
      initialValues={{
        name: "",
        email: "",
      }}
      initialTouched={{
        name: true,
      }}
      initialErrors={{
        name: "The name is too long",
      }}
      // initialStatus={"Meow"}
      validationSchema={Schema}
    >
      {({ values, errors, touched, status }) => {
        return (
          <Form>
            <Field name="name" placeholder="Name" />
            <br />
            <Field name="email" placeholder="Email" />
            <br />
            <ErrorMessage name="name" />
            <br />
            <ErrorMessage name="email" />
            <br />
          </Form>
        );
      }}
    </Formik>
  </div>
);

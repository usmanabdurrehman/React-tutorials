import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
});

export const FormikResetForm = () => (
  <div>
    <h1>{"Formik Reset Form"}</h1>
    <Formik
      onSubmit={async () => {}}
      initialValues={{
        name: "Bilal",
        email: "bilal@gmail.com",
      }}
      initialTouched={{
        name: false,
      }}
      initialErrors={{
        name: "The name is too long",
      }}
      validationSchema={Schema}
    >
      {({ values, errors, touched, status, resetForm }) => {
        return (
          <Form>
            <Field name="name" placeholder="Name" />
            <br />
            <Field name="email" placeholder="Email" />
            <br />
            <button onClick={() => resetForm()}>Reset Form</button>
            <br />
            <button
              onClick={() =>
                resetForm({
                  values: { name: "Ali", email: "ali@gmail.com" },
                })
              }
            >
              Reset Form to particular state
            </button>
            <br />
          </Form>
        );
      }}
    </Formik>
  </div>
);

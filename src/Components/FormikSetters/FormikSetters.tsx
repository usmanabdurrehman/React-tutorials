import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

const Schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required"),
});

export const FormikSetters = () => (
  <div>
    <h1>{"FormikSetters"}</h1>
    <Formik
      onSubmit={async () => {}}
      initialValues={{
        name: "",
        email: "",
      }}
      initialTouched={{
        name: false,
      }}
      initialErrors={{
        name: "The name is too long",
      }}
    >
      {({ values, errors, touched, status, setFieldTouched }) => {
        return (
          <div>
            <Field name="name" placeholder="Name" />
            <br />
            <Field name="email" placeholder="Email" />
            <br />
            <button onClick={() => setFieldTouched("name", true)}>
              Setter
            </button>
            <br />
          </div>
        );
      }}
    </Formik>
  </div>
);

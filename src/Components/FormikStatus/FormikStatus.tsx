import axios from "axios";
import { FastField, Field, Form, Formik } from "formik";

export const FormikStatus = () => (
  <div>
    <h1>{"Sign up form"}</h1>
    <Formik
      initialValues={{
        name: "",
        email: "",
      }}
      onSubmit={async (values, { setStatus }) => {
        const { name, email } = values;
        const { data } = await axios.post("http://localhost:7000/signup", {
          name,
          email,
        });

        if (data?.fault) setStatus(data?.fault);
      }}
    >
      {({ handleSubmit, status }) => (
        <Form>
          <p>{status}</p>
          <Field name="name" placeholder="Name" />
          <Field name="email" placeholder="Email" />
          <button onClick={() => handleSubmit()}>Submit</button>
        </Form>
      )}
    </Formik>
  </div>
);

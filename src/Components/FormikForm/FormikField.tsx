import { FastField, Field, Form, Formik } from "formik";

export const FormikField = () => (
  <div>
    <h1>{"<FormikField/>"}</h1>
    <Formik
      initialValues={{
        emails: [],
        color: "red",
        firstName: "",
        lastName: "",
        email: "",
      }}
      onSubmit={() => {}}
    >
      {({ values, errors, touched }) => (
        <Form>
          <Field type="text" name="firstName" placeholder="First Name" />
          <Field
            type="text"
            name="firstName"
            placeholder="First Name"
            as="textarea"
          />

          <Field as="select" name="color">
            <option value="red">Red</option>
            <option value="green">Green</option>
            <option value="blue">Blue</option>
          </Field>

          <Field name="lastName">
            {({ field, meta, form }: any) => {
              return <input type="text" placeholder="Last Name" {...field} />;
            }}
          </Field>
        </Form>
      )}
    </Formik>
  </div>
);

import { FastField, Field, Form, Formik } from "formik";

export const FormikFastField = () => (
  <div>
    <h1>{"<FormikFastField/>"}</h1>
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
      {({ values }) => (
        <Form>
          <Field type="text" name="firstName" placeholder="First Name" />
          <FastField name="lastName">
            {({ field, meta, form }: any) => {
              return <input type="text" placeholder="Last Name" {...field} />;
            }}
          </FastField>
        </Form>
      )}
    </Formik>
  </div>
);

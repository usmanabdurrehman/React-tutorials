import { Form, Formik } from "formik";

export const FormikForm = () => (
  <div>
    <h1>{"<Formik/>"}</h1>
    <Formik
      initialValues={{
        emails: [],
        name: "",
        email: "",
      }}
      onSubmit={(values) => {}}
    >
      {({ values, errors, touched }) => <Form></Form>}
    </Formik>
  </div>
);

import { Field, Formik, useField } from "formik";
import * as Yup from "yup";

const TextField = (props) => {
  const [field, meta, helpers] = useField(props);

  return (
    <input
      {...props}
      {...field}
      style={{
        border: field?.value?.length > 10 ? "3px solid red" : "3px solid green",
      }}
    />
  );
};

export const FormikUseField = () => (
  <div>
    <h1>{"Formik useField()"}</h1>
    <Formik
      onSubmit={async () => {}}
      initialValues={{
        name: "",
        email: "",
      }}
    >
      {({ values }) => {
        //
        return (
          <div>
            <TextField name="email" placeholder="Email" />
          </div>
        );
      }}
    </Formik>
  </div>
);

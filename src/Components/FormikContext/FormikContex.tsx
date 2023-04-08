import { Field, Form, Formik, useFormikContext } from "formik";
import { useEffect } from "react";

type EmailPassword = {
  email: string;
  password: string;
  password2: string;
};

const EmailPassword = ({ isConfirm = false }: { isConfirm?: boolean }) => {
  const { values, setFieldValue, setErrors, errors, setTouched } =
    useFormikContext<EmailPassword>();

  useEffect(() => {
    if (values.password !== values.password2 && isConfirm) {
      setErrors({ password2: "The passwords dont match" });
      setTouched({ password2: true });
    }
  }, [values]);

  return (
    <div>
      <input
        placeholder="Email"
        value={values.email}
        onChange={(e) => setFieldValue("email", e.target.value)}
      />
      <input
        placeholder="Password"
        value={values.password}
        onChange={(e) => setFieldValue("password", e.target.value)}
      />
      {isConfirm && (
        <input
          placeholder="Repeat Password"
          value={values.password2}
          onChange={(e) => setFieldValue("password2", e.target.value)}
        />
      )}
      {errors.password2 && <p>{errors.password2}</p>}
    </div>
  );
};

export const FormikContext = () => (
  <div>
    <h1>{"Formik Context"}</h1>
    <Formik
      onSubmit={async () => {}}
      initialValues={{
        password: "",
        email: "",
        password2: "",
      }}
    >
      {({ values }) => {
        return (
          <Form>
            <EmailPassword isConfirm />
          </Form>
        );
      }}
    </Formik>
  </div>
);

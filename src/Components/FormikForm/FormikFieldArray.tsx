import { FastField, Field, FieldArray, Form, Formik } from "formik";

export const FormikFieldArray = () => (
  <div>
    <h1>{"<FormikFieldArray/>"}</h1>
    <Formik
      initialValues={{
        emails: [],
        name: "",
        email: "",
      }}
      onSubmit={() => {}}
    >
      {({ values }) => (
        <Form>
          <Field type="text" name="firstName" placeholder="First Name" />
          <FieldArray name="emails">
            {(arrayHelpers) => {
              return (
                <>
                  {values.emails.length > 0 &&
                    values.emails.map((email, index) => (
                      <div>
                        <Field
                          name={`email${index}`}
                          placeholder={`email${index}`}
                          value={email}
                        />
                        <button onClick={() => arrayHelpers.remove(index)}>
                          -
                        </button>
                      </div>
                    ))}
                  <Field name="email" placeholder="Email" />
                  <button onClick={() => arrayHelpers.push(values.email)}>
                    Add email
                  </button>
                </>
              );
            }}
          </FieldArray>
        </Form>
      )}
    </Formik>
  </div>
);

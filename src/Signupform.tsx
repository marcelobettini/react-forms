import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import fieldCleaner from './lib/fieldCleaner'

const validate = Yup.object({
  firstName: Yup.string()
    .min(2, "2 characters minimum")
    .max(40, "Must be 40 characters or less")
    .required("Field is required")
    .trim(),
  lastName: Yup.string()
    .trim()
    .min(2, "2 characters minimum")
    .max(40, "Must be 40 characters or less")
    .required("Field is required"),
  email: Yup.string()
    .trim()
    .email("Invalid email address")
    .required("Field is required"),
  message: Yup.string()
    .trim()
    .min(10, "ten or more characters...")
    .required(),
  pet: Yup.string()
    .required()
})

const Signupform = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        pet: ""
      }}
      validationSchema={validate}
      onSubmit={(values, { setSubmitting }) => {
        values.email = values.email.trim().replace(/\s+/g, ' ')
        values.firstName = values.firstName.trim().replace(/\s+/g, ' ')
        values.lastName = values.lastName.trim().replace(/\s+/g, ' ')
        values.message = values.message.trim().replace(/\s+/g, ' ')
        fieldCleaner(values)

        setTimeout(() => {
          alert(JSON.stringify(values, null, 5))
          setSubmitting(false)
        }, 500)
      }}>

      {(formik) => (
        <form onSubmit={formik.handleSubmit}>

          <label htmlFor="firstName">Nombre</label>
          <Field type="text" id='firstName' name='firstName' autoComplete="name" />
          <ErrorMessage name='firstName' />
          <label htmlFor="lastName">Apellido</label>
          <Field type="text" id='lastName' name='lastName' autoComplete="lastname" />
          <ErrorMessage name='lastName' />
          <label htmlFor="email">Email Address</label>
          <Field type="text" id='email' name='email' />
          <ErrorMessage name="email" />
          <label htmlFor="message">Your message</label>
          <Field name="message" as="textarea" />
          <ErrorMessage name="message" />
          <br />
          <Field name="pet" as="select">
            <option value="noPet">Elija mascota</option>
            <option value="cat">Gato</option>
            <option value="dog">Perro</option>
            <option value="tortoise">Tortuga</option>
            <option value="tortoise">Ave</option>
          </Field>
          <ErrorMessage name="pet" />
          <button type="submit" disabled={formik.isSubmitting}>{formik.isSubmitting ? '...' : 'Submit'}</button>
        </form>
      )}

    </Formik>
  )
}

export default Signupform
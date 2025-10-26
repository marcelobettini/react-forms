import { Formik, Field, ErrorMessage } from 'formik'
import * as Yup from "yup"
import './Signupform.css'
import fieldCleaner from '../lib/fieldCleaner'

const validate = Yup.object({
  firstName: Yup.string()
    .trim()
    .min(2, "2 characters minimum")
    .max(40, "Must be 40 characters or less")
    .required("Field is required"),
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
  hasPet: Yup.string()
    .required("Please indicate if you have a pet"),
  pet: Yup.string()
    .when("hasPet", {
      is: "yes",
      then: () => Yup.string().required("Please select your pet type"),
      otherwise: () => Yup.string().notRequired(),
    })
})

const Signupform = () => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        email: "",
        message: "",
        hasPet: "",
        pet: ""
      }}
      validationSchema={validate}
      onSubmit={(values, { setSubmitting }) => {
        values.email = values.email.trim().replace(/\s+/g, ' ')
        values.firstName = values.firstName.trim().replace(/\s+/g, ' ')
        values.lastName = values.lastName.trim().replace(/\s+/g, ' ')
        values.message = values.message.trim().replace(/\s+/g, ' ')
        // fieldCleaner(values) -> uncomment to replace verbose one by one procedure above

        setTimeout(() => {
          alert(JSON.stringify(values, null, 5))
          setSubmitting(false)
        }, 500)
      }}>

      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <Field type="text" id='firstName' name='firstName' autoComplete="given-name" autoFocus="true"
              style={{ border: formik.touched.firstName && formik.getFieldMeta('firstName').error ? "1px solid rgba(179, 90, 224, 0.697)" : undefined }} />
            <ErrorMessage name='firstName' />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <Field type="text" id='lastName' name='lastName' autoComplete="family-name"
              style={{ border: formik.touched.lastName && formik.getFieldMeta('lastName').error ? "1px solid rgba(179, 90, 224, 0.697)" : undefined }} />
            <ErrorMessage name='lastName' render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Field type="email" id='email' name='email' autoComplete="email"
              style={{ border: formik.touched.email && formik.getFieldMeta('email').error ? "1px solid rgba(179, 90, 224, 0.697)" : undefined }} />
            <ErrorMessage name="email" render={msg => <div className='error'>{msg}</div>} />
          </div>
          <div className="form-group">
            <label htmlFor="message">Envíanos tu mensaje</label>
            <Field id="message" name="message" as="textarea"
              style={{ border: formik.touched.message && formik.getFieldMeta('message').error ? "1px solid rgba(179, 90, 224, 0.697)" : undefined }} />
            <ErrorMessage name="message" render={msg => <div className='error'>{msg}</div>} />
          </div>
          <br />
          <div className="form-group">
            <div>¿Tienes mascota?</div>
            <div className='radio'>
              <label>
                <span>Sí</span>
                <Field type="radio" name="hasPet" value="yes" />
              </label>
              <label>
                <span>No</span>
                <Field type="radio" name="hasPet" value="no" />
              </label>
            </div>
            <ErrorMessage name="hasPet" render={msg => <div className='error'>{msg}</div>} />
          </div>

          {formik.values.hasPet === "yes" && (
            <div className="form-group">
              <label htmlFor="pet">Tipo de mascota</label>
              <Field name="pet" as="select">
                <option value="">Elija mascota</option>
                <option value="bird">Ave</option>
                <option value="cat">Gato</option>
                <option value="hamster">Hámster</option>
                <option value="dog">Perro</option>
                <option value="fish">Pez</option>
                <option value="tortoise">Tortuga</option>
              </Field>
              <ErrorMessage name="pet" render={msg => <div className='error'>{msg}</div>} />
            </div>
          )}

          <button type="submit" disabled={formik.isSubmitting || !formik.isValid}>{formik.isSubmitting ? '...' : 'Submit'}</button>
        </form>
      )}
    </Formik>
  )
}

export default Signupform
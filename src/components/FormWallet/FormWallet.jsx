import { useFormik } from "formik";
import { FormContainer } from "./FormWallet.styled";

const FormWallet = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    
    <form onSubmit={formik.handleSubmit}>
      <FormContainer>
         <label htmlFor="firstName">First Name</label>
      <input
        id="firstName"
        name="firstName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.firstName}
      />

      <label htmlFor="lastName">Last Name</label>
      <input
        id="lastName"
        name="lastName"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.lastName}
      />

      <button type="submit">Submit</button>
      </FormContainer>
     
    </form>
    
  );
}

export default FormWallet;


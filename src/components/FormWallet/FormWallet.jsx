import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import { ethers } from "ethers";

const FormWallet = ({ account }) => {
  const initialValues = {
    address: "",
    amount: "",
  };

  const handleSubmit = (values, { resetForm }) => {
    let params = [
      {
        from: String(account),
        to: String(values.address),
        gas: Number(21000).toString(16),
        gasPrice: Number(25000).toString(16),
        value: ethers.parseEther(values.amount).toString(16),
      },
    ];

    window.ethereum
      .request({
        method: "eth_sendTransaction",
        params,
      })
      .catch((error) => console.log(error));

    console.log(values);
    resetForm();
  };

  return (
    <>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <label htmlFor="address">Adress</label>
          <Field
            id="address"
            type="text"
            name="address"
            placeholder="Address to"
          />
          <label htmlFor="amount">Amount</label>
          <Field id="amount" type="text" name="amount" placeholder="0.005" />
          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </>
  );
};

FormWallet.propTypes = {
  account: PropTypes.array,
};

export default FormWallet;

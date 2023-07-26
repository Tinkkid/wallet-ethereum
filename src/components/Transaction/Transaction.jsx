import PropTypes from "prop-types";
import { Formik, Form, Field } from "formik";
import Button from "@mui/material/Button";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { ethers } from "ethers";

const Transaction = ({ account }) => {
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
    <Box
      sx={{
        mt: 5,
        p: 2,
        display:"flex",
        justifyContent:"center",
      }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: {
              mobile: 300,
              tablet: 700,
              desktop: 900
            }
          }}
        >
          <TextField type="text" label="Recipient account" name="address" />

          <TextField type="text" label="Amount in ETH" name="amount" />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </Formik>
    </Box>
  );
};

Transaction.propTypes = {
  account: PropTypes.array,
};

export default Transaction;

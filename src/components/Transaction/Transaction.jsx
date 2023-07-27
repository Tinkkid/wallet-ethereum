import PropTypes from "prop-types";
import { Formik } from "formik";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
import { validateAccount, validateAmount } from "../../helpers/validateAccount";
import { ErrorText, FormField, InputWrap, Label } from "./Transaction.styled";

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

    resetForm();
  };

  return (
    <Box
      sx={{
        mt: 5,
        p: 2,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isValid, dirty }) => (
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              width: {
                mobile: 300,
                tablet: 700,
                desktop: 900,
              },
            }}
          >
            <InputWrap>
              <Label>Recipient account</Label>
              <FormField
                type="text"
                label="Recipient account"
                name="address"
                validate={validateAccount}
              />
              <ErrorText name="address" component="div" />
            </InputWrap>
            <InputWrap>
              <Label>Amount in ETH</Label>
              <FormField
                type="text"
                label="Amount in ETH"
                name="amount"
                validate={validateAmount}
              />
              <ErrorText name="amount" component="div" />
            </InputWrap>

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={!(isValid && dirty)}
            >
              Submit
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

Transaction.propTypes = {
  account: PropTypes.array,
};

export default Transaction;

// 0x0890412e7dF4FC959F13e5A8D33EaEaf830d91d4

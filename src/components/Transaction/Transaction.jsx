import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Notiflix from "notiflix";
import Box from "@mui/material/Box";
import { ethers } from "ethers";
import { useFormik } from "formik";
import { validate } from "../../helpers/validateAccount";
import {
  ErrorText,
  InputContainer,
  FormField,
  Label,
  Form,
  Spinner,
} from "./Transaction.styled";
import { useState } from "react";

const Transaction = ({ account }) => {
  const [loading, setLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      address: "",
      amount: "",
    },
    validate,
    onSubmit: (values, { resetForm }) => {
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
        .then(setLoading(true))
        .then(Notiflix.Notify.success("Request successfuly"))
        .catch((error) => Notiflix.Notify.failure(error.message));
      console.log(values);
      setLoading(false);
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        mt: 5,
        p: 2,
        mr: "auto",
        ml: "auto",
        width: {
          mobile: 300,
          tablet: 700,
          desktop: 900,
        },
      }}
    >
      <Form onSubmit={formik.handleSubmit}>
        <InputContainer>
          <Label>Recipient account</Label>
          <FormField
            type="text"
            id="address"
            label="Recipient account"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.errors.address ? (
            <ErrorText>{formik.errors.address}</ErrorText>
          ) : null}
        </InputContainer>
        <InputContainer>
          <Label>Amount in ETH</Label>
          <FormField
            type="text"
            id="amount"
            label="Amount in ETH"
            name="amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
          />
          {formik.errors.amount ? (
            <ErrorText>{formik.errors.amount}</ErrorText>
          ) : null}
        </InputContainer>

        <Button
          color="primary"
          variant="contained"
          sx={{
            width: {
              mobile: 50,
              tablet: 70,
              desktop: 160,
            },
            p: 2,
            mt: 3,
          }}
          type="submit"
          disabled={!(formik.isValid && formik.dirty)}
        >
          {!loading ? "Submit" : <Spinner />}
        </Button>
      </Form>
    </Box>
  );
};

Transaction.propTypes = {
  account: PropTypes.array,
};

export default Transaction;


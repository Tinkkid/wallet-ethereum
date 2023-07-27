export const validateAccount = (value) => {
   let error;
   if (!value) {
     error = 'Required';
   } else if (!/^0x[0-9,a-f,A-F]{40}$/.test(value)) {
     error = 'Invalid format of account';
   }
   return error;
}

export const validateAmount = (value) => {
  let error;
  if (!value) {
    error = "Required";
  } else if (!/[0-9]$/.test(value)) {
    error = "Invalid format of amount. Must be numbers";
  }
  return error;
};

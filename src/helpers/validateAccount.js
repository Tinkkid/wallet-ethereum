export const validate = (values) => {
   const errors = {};
   if (!values.address) {
     errors.address = 'Required';
   } else if (!/^0x[0-9,a-f,A-F]{40}$/.test(values.address)) {
     errors.address = 'Invalid format of account';
   }
  
   if (!values.amount) {
     errors.amount = 'Required';
   } else if (!/[0-9]$/.test(values.amount)) {
     errors.amount = 'Invalid format of amount';
   }
  
   return errors;
}


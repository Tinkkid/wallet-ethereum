import styled from '@emotion/styled'
import { Field, ErrorMessage } from 'formik';

export const InputWrap = styled.div`

`

export const FormField = styled(Field)`
  font-size: 30px;
  padding: 10px;
  width: 100%;
  border-radius: 6px;
  color: #99a3ba;
  border: 1px solid #cdd9ed;
  background: #fff;
  transition: border 0.3s ease;
  &::placeholder {
    color: #CBD1DC;
  }
  &:focus {
    outline: none;
    border-color: #275EFE;
  }
`;

export const ErrorText = styled(ErrorMessage)`
font-size: 18px;
color: #b20000;
text-align: center;
`

export const Label = styled.label`
color:  #275EFE;
font-size: 24px;
`


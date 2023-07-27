import styled from '@emotion/styled'
import { ReactComponent as Loader } from '../../assets/loader.svg'

export const Form = styled.form`
width: 100%;
display: flex;
flex-direction: column;
align-items: center;
gap: 20px;
`

export const InputContainer = styled.div`
width: 100%;
`

export const FormField = styled.input`
  font-size: 18px;
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

 @media screen and (min-width: 768px) {
font-size: 20px;
 }

  @media screen and (min-width: 1280px) {
font-size: 24px;
  }
`;

export const ErrorText = styled.p`
font-size: 14px;
color: #b20000;
text-align: center;

 @media screen and (min-width: 768px) {
font-size: 16px;
 }

  @media screen and (min-width: 1280px) {
font-size: 18px;
  }
`

export const Label = styled.label`
color:  #275EFE;
font-size: 18px;

 @media screen and (min-width: 768px) {
font-size: 20px;
 }

  @media screen and (min-width: 1280px) {
font-size: 24px;
  }
`

export const Spinner = styled(Loader)`
  animation-name: spin;
  animation-duration: 500ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;

  @keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
`;


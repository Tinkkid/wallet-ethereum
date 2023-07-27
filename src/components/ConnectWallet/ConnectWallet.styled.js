import styled from '@emotion/styled'
import { ReactComponent as Ethereum } from '../../assets/ethereum.svg'

export const BalanceAmount = styled.div`
border-radius: 6px;
background-color: inherit;
border: 1px solid #e9ce1e;
font-size: 14px;
color:#fff;
width: 50px;
display: flex;
align-items: center;
justify-content: center;

 @media screen and (min-width: 768px) {
font-size: 18px;
width: 90px;
 }

  @media screen and (min-width: 1280px) {
font-size: 24px;
width: 120px;
  }
`
export const BalanceContainer = styled.div`
display: flex;
padding: 5px;

 @media screen and (min-width: 768px) {
padding: 20px;
  }
`
export const Icon = styled(Ethereum)`
width:50px;
height:50px;

 @media screen and (min-width: 768px) {
width:90px;
height:90px;
  }

   @media screen and (min-width: 1280px) {
width:100px;
height:100px;
  }
`

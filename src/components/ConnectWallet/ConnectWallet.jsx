import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import {  Web3Button, Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
import { ethers } from "ethers";

import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';

const chains = [arbitrum, mainnet, sepolia]
const projectId = import.meta.env.VITE_APP_PROJECT_KEY;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})

const ethereumClient = new EthereumClient(wagmiConfig, chains)

const ConnectWallet = () => {
  const [userBalance, setUserBalance] = useState(' ');
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const initialValues = {
  address: '',
  amount: '',
};

  const connect = async () => {
    if (window.ethereum) {
         await window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result) => {
              accountChanged([result[0]]);             
            }).then(setIsOpen(true))
        } else {
          setError("You nave not MetaMask. Please install it");
        }
   }

   const accountChanged = (accountName) => {
      setAccount(accountName)
      getBalance(accountName)
   }
  
  const getBalance = async (accountAdress) => {
      await window.ethereum
        .request({
          method: "eth_getBalance",
          params: [String(accountAdress), "latest"],
        })
        .then((balance) => {
          setUserBalance(ethers.formatEther(balance));
         });
  }
  
  const customBalance = Number(userBalance).toFixed(3);

  const handleSubmit = (values, { resetForm }) => {
      let params = [
        {
         from: String(account),
          to: String(values.address),
          gas: Number(21000).toString(16),
          gasPrice: Number(25000).toString(16),
          value:(ethers.parseEther(values.amount)).toString(16)
        },
      ];
      
     window.ethereum.request({
        method: "eth_sendTransaction",
        params
    }).catch(error => console.log(error));

    console.log(values);
    resetForm();
  };


  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button onClick={() => connect()} />
        <h3>Balance: {isOpen && <span> {customBalance} </span>}</h3>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
      >
         <Form>
        <label htmlFor="address">Adress</label>
        <Field id="address" type="text" name="address" placeholder="Address to" />
        <label htmlFor="amount">Amount</label>
        <Field id="amount" type="text" name="amount" placeholder="0.005" />
        <button type="submit">Submit</button>
      </Form>
      </Formik>
    </>
  );
}

// 0x0890412e7dF4FC959F13e5A8D33EaEaf830d91d4

export default ConnectWallet;

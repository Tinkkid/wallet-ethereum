import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import {  Web3Button, Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
import { ethers } from "ethers";
import { useState } from "react";
import { useWeb3Modal } from '@web3modal/react';

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
  const { open, close } = useWeb3Modal();

  const [userBalance, setUserBalance] = useState('');
  const [error, setError] = useState(null);
  const [account, setAccount] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

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
  
  // console.log(userBalance)
  const customBalance = Number(userBalance).toFixed(3);
  // const customBalance = userBalance.toFixed(3);

  const sendTransaction = async (e) => {
   
      e.preventDefault();
      let adress = String(e.target.to_adress.value)
      // console.log(adress)
     let res = String(e.target.amount.value);
      let amount = ethers.parseEther(res)

      let params = [
        {
         from: String(account),
          to: adress,
          gas: Number(21000).toString(16),
          gasPrice: Number(25000).toString(16),
          value:amount.toString(16)
        },
      ];
      
    await window.ethereum.request({
        method: "eth_sendTransaction",
        params
      }).catch(error => console.log(error));
   }

  return (
    <>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button onClick={() => connect()} />
        <h3>Balance: {
          isOpen && <span> {customBalance} </span>}
        </h3>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
      <form onSubmit={sendTransaction}>
        <label>Enter transaction adress:</label>
        <input type="text" placeholder="Recipient adress" name="to_adress" />
        <input placeholder="Amount in ETH" name="amount" />
        <input type="submit" value="submit" />
      </form>
    </>
  );
}

export default ConnectWallet;

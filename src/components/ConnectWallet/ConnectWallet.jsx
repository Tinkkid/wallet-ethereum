// import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
// import { Web3Button, Web3Modal } from '@web3modal/react'
// import { configureChains, createConfig, WagmiConfig } from 'wagmi'
// import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
// // import WebButton from '../WebButton/WebButton'


// const chains = [arbitrum, mainnet, sepolia]
// const projectId = import.meta.env.VITE_APP_PROJECT_KEY;

// const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
// const wagmiConfig = createConfig({
//   autoConnect: true,
//   connectors: w3mConnectors({ projectId, chains }),
//   publicClient
// })
// const ethereumClient = new EthereumClient(wagmiConfig, chains)

// const ConnectWallet = () => {
//   return (
//     <>
//       <WagmiConfig config={wagmiConfig}>
//            <Web3Button balance='show'/>
//            {/* <WebButton/> */}
//       </WagmiConfig>
//       <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
//     </>
//   )
// }

// export default ConnectWallet;
import { useState } from "react";
import { ethers } from "ethers";

const ConnectWallet = () => {

   const [error, setError] = useState(null);
   const [account, setAccount] = useState(null);
   const [userBalance, setUserBalance] = useState();

   const connect = () => {
        if (window.ethereum) {
          window.ethereum
            .request({ method: "eth_requestAccounts" })
            .then((result) => {
              accountChanged([result[0]]);
            });
        } else {
          setError("You nave not MetaMask");
        }
   }

   const accountChanged = (accountName) => {
      setAccount(accountName)
      getBalance(accountName)
   }

   const getBalance = (accountAdress) => {
      window.ethereum
        .request({
          method: "eth_getBalance",
          params: [String(accountAdress), "latest"],
        })
        .then((balance) => {
          setUserBalance(ethers.formatEther(balance));
        });
   }

   const sendTransaction = async (e) => {
      e.preventDefault();
      let amount = e.target.amount.value;
      const amountForTransfer = Number(amount).toString(16);
      const toAdress = e.target.to_adress.value;
      console.log(toAdress)

      let params = [
        {
          from: "0x4ab7070368c17F6A55F6b9e847850cAD345D8Edc",
          to: "toAdress",
          gas: Number(21000).toString(16),
          gasPrice: Number(25000).toString(16),
          value: amountForTransfer,
        },
      ];

      // eslint-disable-next-line no-unused-vars
      let result = await window.ethereum.request({
        method: "eth_sendTransaction",
        params
      }).catch(error => console.log(error));
   }

 

  return (
    <>
      <button onClick={connect}> Connect Wallet</button>
      <h3>Adress:{account}</h3>
      <h3>Balance:{userBalance}</h3>
      {error}
        <form onSubmit={sendTransaction}>
           <label>Enter transaction adress:</label>
           <input type="text" placeholder="Recipient adress" name="to_adress" />
           <input type="text" placeholder="Amount in ETH" name="amount"/>
           <input type="submit" value="submit"/>
      </form>
    </>
  );
}

export default ConnectWallet;
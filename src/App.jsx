
import { ethers } from "ethers";

import { useState } from "react";
import ConnectWallet from './components/ConnectWallet/ConnectWallet';
import Footer from "./components/Footer";
import Transaction from "./components/Transaction/Transaction";


function App() {
 const [userBalance, setUserBalance] = useState(" ");
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
    };

    const customBalance = Number(userBalance).toFixed(3);


  return (
    <div style={{ minHeight: "100vh", display:"flex", flexDirection:"column", justifyContent:'space-between' }}>
      <ConnectWallet
        connect={() => connect()}
        isOpen={isOpen}
        customBalance={customBalance}
      />
      <Transaction account={account} />
      <Footer />
    </div>
  );
}

export default App


// import './App.css'
// import FormWallet from './components/FormWallet/FormWallet'
// import NavBar from './components/NavBar/NavBar'



// function App() {



//   return (
//     <>
//       <NavBar/>
//     <FormWallet/>       
//     </>
//   )
// }

// export default App

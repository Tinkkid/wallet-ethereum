import Web3 from 'web3'
const web3 = new Web3('https://twilight-little-surf.ethereum-goerli.discover.quiknode.pro/21e2a05685c1726af4a6baf2b194c82adb72ef6d/');
const address = "0x4ab7070368c17F6A55F6b9e847850cAD345D8Edc";
const balance = web3.eth.getBalance(address);
const wallet = web3.eth.toWei(balance, 'ether');
console.log(balance)
console.log(wallet)
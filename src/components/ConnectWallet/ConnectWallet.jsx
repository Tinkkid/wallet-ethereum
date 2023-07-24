import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Button, Web3Modal } from '@web3modal/react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { arbitrum, mainnet, sepolia } from 'wagmi/chains'
// import WebButton from '../WebButton/WebButton'


const chains = [arbitrum, mainnet, sepolia]
const projectId = import.meta.env.VITE_APP_PROJECT_KEY;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient
})
const ethereumClient = new EthereumClient(wagmiConfig, chains)

const ConnectWallet = () => {
  return (
    <>
      <WagmiConfig config={wagmiConfig}>
           <Web3Button balance='show'/>
           {/* <WebButton/> */}
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient}/>
    </>
  )
}

export default ConnectWallet;
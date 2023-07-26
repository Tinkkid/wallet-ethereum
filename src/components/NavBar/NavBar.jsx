import PropTypes from "prop-types";
import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, sepolia } from "wagmi/chains";

const chains = [arbitrum, mainnet, sepolia];
const projectId = import.meta.env.VITE_APP_PROJECT_KEY;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: false,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const NavBar = ({ connect, customBalance, isOpen }) => {
  return (
    <div>
      <WagmiConfig config={wagmiConfig}>
        <Web3Button onClick={connect} />
        <h3>Balance: {isOpen && <span> {customBalance} </span>}</h3>
      </WagmiConfig>
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </div>
  );
};

NavBar.propTypes = {
  connect: PropTypes.func,
  customBalance: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default NavBar;

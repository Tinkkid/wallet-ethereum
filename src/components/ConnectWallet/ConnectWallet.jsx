import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
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

const ConnectWallet = ({ connect, customBalance, isOpen }) => {
  return (
    <div>
       <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Some Logo
          </Typography>
            <WagmiConfig config={wagmiConfig}>
               <h3>Balance: {isOpen && <span> {customBalance} </span>}</h3>
        <Web3Button onClick={connect} />      
      </WagmiConfig>
            <Web3Modal projectId={projectId} ethereumClient={ethereumClient}
              themeVariables={{
                '--w3m-accent-color': '#e9ce1e',
                '--w3m-accent-fill-color': '#000'
  }}
/>
        </Toolbar>
      </AppBar>
    </Box>
      
    </div>
  );
};

ConnectWallet.propTypes = {
  connect: PropTypes.func,
  customBalance: PropTypes.string,
  isOpen: PropTypes.bool,
};

export default ConnectWallet;

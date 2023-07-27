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
import { useWeb3Modal, Web3Button, Web3Modal } from "@web3modal/react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { arbitrum, mainnet, sepolia, goerli } from "wagmi/chains";
import { BalanceAmount, BalanceContainer, Icon } from "./ConnectWallet.styled";

const chains = [arbitrum, mainnet, sepolia, goerli];
const projectId = import.meta.env.VITE_APP_PROJECT_KEY;

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, chains }),
  publicClient,
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const ConnectWallet = ({ connect, customBalance }) => {

  const { open } = useWeb3Modal()

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar
            sx={{
              pr: { mobile: 1, tablet: 3, desktop: 5 },
              pl: { mobile: 1, tablet: 3, desktop: 5 },
            }}
          >
            <Typography component="div" sx={{ flexGrow: 1 }}>
              {" "}
              <Icon />
            </Typography>

            <WagmiConfig config={wagmiConfig}>
              <BalanceContainer>
                <Typography
                  variant="h6"
                  sx={{
                    mr: {
                      mobile: "5px",
                      tablet: "8px",
                      desktop: "10px"
                    },
                    fontSize: {
                      mobile: "16px",
                      tablet: "18px",
                      desktop: "24px",
                    },
                  }}
                >
                  Balance
                </Typography>
                <BalanceAmount>
                  {open ? (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {
                          mobile: "16px",
                          tablet: "18px",
                          desktop: "24px",
                        },
                      }}
                    >
                      {customBalance}
                    </Typography>
                  ) : (
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: {
                          mobile: "16px",
                          tablet: "18px",
                          desktop: "24px",
                        },
                      }}
                    >
                      0.000
                    </Typography>
                  )}
                </BalanceAmount>
              </BalanceContainer>
              <Web3Button onClick={connect} customBalance={customBalance} />
            </WagmiConfig>

            <Web3Modal
              projectId={projectId}
              ethereumClient={ethereumClient}
              themeVariables={{
                "--w3m-accent-color": "#e9ce1e",
                "--w3m-accent-fill-color": "#000",
                
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

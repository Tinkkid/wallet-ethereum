import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: "#e9ce1e",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container maxWidth="sm">   
        <Typography variant="body2" color="text.primary" sx={{mb:1}}>
          Yuliia Kostovynska {new Date().getFullYear()} 
           </Typography>
           <Link color="inherit" target="_blank" rel="noreferrer" href="https://github.com/Tinkkid/wallet-ethereum">
               <GitHubIcon/> 
          </Link>{" "}
           <Link color="inherit" target="_blank" rel="noreferrer"  href="https://www.linkedin.com/in/yuliia-kostovynska/">
               <LinkedInIcon/>
          </Link>{" "}
         
          {"."}
       
      </Container>
    </Box>
  );
}

export default Footer

import { useStorage } from "@plasmohq/storage/hook"
import Configuration from "~components/Configuration"
import './style.css'
import { StyledEngineProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"

function OptionsIndex() {
  const [paperspaceApiKey, setPaperspaceApiKey] = useStorage<string>("paperspace_api_key")

  return(
    <StyledEngineProvider injectFirst>
      <CssBaseline />

      <Box className="flex-grow">
        <AppBar position="static">
          <Typography variant="h6" component="div" className="p-2">
            Paperspace Machines
          </Typography>
        </AppBar>
      </Box>

      <Container className="pt-4 flex justify-center">
        <Configuration defaultKey={paperspaceApiKey} onSave={setPaperspaceApiKey} />
      </Container>
    </StyledEngineProvider>
  )
}

export default OptionsIndex
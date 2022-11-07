import { useStorage } from "@plasmohq/storage/hook"
import Configuration from "~components/Configuration"
import './style.css'
import { StyledEngineProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Box from "@mui/material/Box"
import AppBar from "@mui/material/AppBar"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import {useSnackbar, SnackbarProvider} from 'notistack'

const ConfigurationSaver = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [paperspaceApiKey, setPaperspaceApiKey] = useStorage<string>("paperspace_api_key")

  const onSave = (apiKey) => {
    setPaperspaceApiKey(apiKey).then(() => enqueueSnackbar('Saved !', { variant: 'success' }))
  }

  return <Configuration defaultKey={paperspaceApiKey} onSave={onSave} />
}

function OptionsIndex() {
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
        <SnackbarProvider maxSnack={3}>
          <ConfigurationSaver />
        </SnackbarProvider>
      </Container>
    </StyledEngineProvider>
  )
}

export default OptionsIndex

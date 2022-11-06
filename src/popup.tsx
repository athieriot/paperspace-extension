import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Machines from '~Machines'
import { StyledEngineProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import './popup.css'
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const IndexPopup = () => {
  const queryClient = new QueryClient()

  return (
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <CssBaseline />

        <Box className="flex-grow">
          <AppBar position="static">
            <Typography variant="h6" component="div" className="p-2">
              Machines
            </Typography>
          </AppBar>
        </Box>

        <Container className="pt-4 w-80 h-96 bg-slate-100 flex justify-center">
          <Machines />
        </Container>
      </QueryClientProvider>
    </StyledEngineProvider>
  )
}

export default IndexPopup

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import Machines from '~Machines'

const IndexPopup = () => {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <Machines />
    </QueryClientProvider>
  )
}

export default IndexPopup

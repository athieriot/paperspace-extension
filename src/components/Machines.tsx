import {useMachines} from "~queries/machineQueries"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import CardActions from "@mui/material/CardActions"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import UtilizationCard from "~components/Utilization"
import Divider from "@mui/material/Divider"
import { useMemo } from "react"
import Power from "~components/Power"
import {getStateProperty, StateProperty } from "~types"
import Button from "@mui/material/Button"

const MachineCard = ({ machine }) => {
  const stateProperty = useMemo<StateProperty>(() => getStateProperty(machine.state), [machine])

  return (
    <Card className={`border-2 border-solid ${stateProperty.borderColor}`}>
      <CardContent>
        <Typography color="text.secondary" gutterBottom>
          {machine.agentType?.toLowerCase().includes('windows') ? <img src="https://img.icons8.com/ios-glyphs/90/null/windows-client.png"/> : machine.agentType }
        </Typography>
        <Typography variant="h5">
          {machine.name}
        </Typography>
        <Typography className="mb-1.5" variant="caption" color="text.secondary">
          {machine.id}
        </Typography>
        <Typography variant="body2">
          {`${machine.usageRate} | ${machine.region}`}
        </Typography>
        <Divider className="m-2" />
        <UtilizationCard machineId={machine.id} />
      </CardContent>

      <CardActions>
        <Power machineId={machine.id} stateProperty={stateProperty} />
        <Button variant="outlined" className="ml-2" size="small" target="_blank" href={`${process.env.PLASMO_PUBLIC_PAPERSPACE_CONSOLE_URL}/${machine.id}`}>
          Desktop
        </Button>
      </CardActions>
    </Card>
  )
}

const Machines = () => {
  const { isLoading, data: machines } = useMachines()

  if (isLoading) {
      return <CircularProgress className="place-self-center" />
  }

  return (
    <Stack spacing={2} className="flex-grow">
      { machines.map(machine => <MachineCard key={machine.id} machine={machine} />) }
    </Stack>
  )
}

export default Machines
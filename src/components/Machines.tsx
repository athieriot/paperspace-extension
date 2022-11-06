import {useMachines, usePower} from "~queries/machineQueries"
import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Typography from "@mui/material/Typography"
import LoadingButton from "@mui/lab/LoadingButton"
import CardActions from "@mui/material/CardActions"
import CircularProgress from "@mui/material/CircularProgress"
import Stack from "@mui/material/Stack"
import UtilizationCard from "~components/Utilization"
import Divider from "@mui/material/Divider"
import { useMemo } from "react"

interface StateNext {
  color: string
  next: string
  nextColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
  readOnly: boolean
}

const MachineCard = ({ machine }) => {
    const power = usePower(machine.id)

    const stateNext = useMemo<StateNext>(() => { switch (machine.state) {
        case "off": return { color: 'border-black', next: 'Start', nextColor: 'success', readOnly: false }
        case "ready": return { color: 'border-emerald-500', next: 'Stop', nextColor: 'error', readOnly: false }
        case "serviceready": return { color: 'border-emerald-500', next: machine.state, readOnly: true }
        case "starting": return { color: 'border-orange-500', next: machine.state, readOnly: true }
        case "stopping": return { color: 'border-red-500', next: machine.state, readOnly: true }
        default: return { color: 'border-black', next: machine.state, readOnly: true }
    }}, [machine])

    return (
      <Card className={`border-2 border-solid ${stateNext.color}`}>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {machine.agentType?.toLowerCase().includes('windows') ? <img src="https://img.icons8.com/ios-glyphs/90/null/windows-client.png"/> : <img src="https://img.icons8.com/ios-filled/100/null/linux.png"/> }
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
          <LoadingButton
            variant="contained"
            size="small"
            color={stateNext.nextColor}
            disabled={stateNext.readOnly}
            onClick={() => power.mutate(machine.state == "off" ? "start" : "stop")}
            loading={power.isLoading}
          >
            {stateNext.next}
          </LoadingButton>
        </CardActions>
      </Card>
  )
}

const Machines = () => {
  const { isLoading, data: machines } = useMachines()

  if (isLoading) {
    return (
      <CircularProgress className="place-self-center" />
    )
  }

  return (
    <Stack spacing={2} className="flex-grow">
      { machines.map(machine => <MachineCard key={machine.id} machine={machine} />) }
    </Stack>
  )
}

export default Machines
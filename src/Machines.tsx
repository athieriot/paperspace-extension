import {useMachines, useUtilization} from "~queries/machineQueries"
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import UtilizationCard from "~Utilization";

const MachineCard = ({ machine }) => {
    return (
      <Card>
        <CardContent>
          <Typography color="text.secondary" gutterBottom>
            {machine.agentType?.toLowerCase().includes('windows') ? <img src="https://img.icons8.com/ios-glyphs/90/null/windows-client.png"/> : <img src="https://img.icons8.com/ios-filled/100/null/linux.png"/> }
          </Typography>
          <Typography variant="h5" component="div">
            {machine.name}
          </Typography>
          <Typography className="mb-1.5" color="text.secondary">
            {machine.id}
          </Typography>
          <Typography variant="body2">
            {`${machine.usageRate} | ${machine.region}`}
          </Typography>

          <UtilizationCard machineId={machine.id} />
        </CardContent>
        <CardActions>
          <Button size="small">{machine.state}</Button>
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
import {useMachines, useUtilization} from "~queries/machineQueries"
import dayjs from "dayjs";

const MachineCard = ({ machine }) => {
  return (
    <div>
      <div>{machine.agentType}</div>
      <div><strong>{machine.name}</strong></div>
      <div>{`${machine.usageRate} | ${machine.region}`}</div>
      <div><strong>ID</strong> {machine.id}</div>
      <div><strong>{machine.state}</strong></div>
      <UtilizationCard machineId={machine.id} />
    </div>
  )
}

interface Props {
  machineId: string
}

const UtilizationCard = ({ machineId }: Props) => {
  const { isLoading, data } = useUtilization(machineId, dayjs().startOf('month'))

  if (isLoading) {
      return <div>Loading...</div>
  }

  const { utilization, storageUtilization } = data

  return (
    <div>
      <div><strong>Machine billing: </strong>{utilization.monthlyRate ? utilization.monthlyRate : (parseFloat(utilization.hourlyRate) * parseFloat(utilization.secondsUsed) / 60 / 60)}</div>
      {storageUtilization && <div><strong>Storage billing: </strong>{storageUtilization.monthlyRate ? storageUtilization.monthlyRate : (parseFloat(storageUtilization.hourlyRate) * parseFloat(storageUtilization.secondsUsed) / 60 / 60)}</div>}
    </div>
  )
}

const Machines = () => {
  const { isLoading, data: machines } = useMachines()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      { machines.map(machine => <MachineCard key={machine.id} machine={machine} />) }
    </div>
  )
}

export default Machines
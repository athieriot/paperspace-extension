import dayjs from "dayjs"
import { useUtilization } from "~queries/machineQueries"

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

export default UtilizationCard

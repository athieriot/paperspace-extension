import Skeleton from "@mui/material/Skeleton"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"
import dayjs from "dayjs"
import { useUtilization } from "~queries/machineQueries"
import type { UtilizationResponse } from "~types"

interface Props {
    machineId: string
}

const computeInfo = ({ utilization, storageUtilization }: UtilizationResponse) => {
  const machineHours = utilization.secondsUsed / 60 / 60
  const machinePrice = utilization.monthlyRate ? parseFloat(utilization.monthlyRate) : (parseFloat(utilization.hourlyRate) * machineHours)
  const storagePrice = storageUtilization ? storageUtilization.monthlyRate ? parseFloat(storageUtilization.monthlyRate) : (parseFloat(storageUtilization.hourlyRate) * storageUtilization.secondsUsed / 60 / 60) : 0

  return {
    time: machineHours,
    price: machinePrice + storagePrice
  }
}

const UtilizationCard = ({ machineId }: Props) => {
  const { isLoading, data } = useUtilization(machineId, dayjs().startOf('month'))

  if (isLoading) {
      return (
        <>
          <Skeleton variant="rectangular" width={100} />
          <Skeleton variant="rectangular" width={100} className="mt-1" />
        </>
      )
  }

  const { time, price } = computeInfo(data)

  return (
    <>
      <Typography variant="body2">
        Usage: <strong>{time.toFixed(0)}h</strong>
      </Typography>
      <Typography variant="body2">
        Price: <strong>{price.toFixed(2)}$</strong>
      </Typography>
    </>
  )
}

export default UtilizationCard

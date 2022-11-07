import LoadingButton from "@mui/lab/LoadingButton"
import capitalize from "@mui/material/utils/capitalize"
import type { StateProperty } from "~components/Machines"
import { usePower } from "~queries/machineQueries"

interface Props {
  machineId: string
  stateProperty: StateProperty
}

const Power = ({ machineId, stateProperty }: Props) => {
  const power = usePower(machineId)

  return (
    <LoadingButton
      variant="contained"
      size="small"
      color={stateProperty.actionColor}
      disabled={!stateProperty.action}
      onClick={() => power.mutate(stateProperty.action)}
      loading={power.isLoading}
    >
      {capitalize(stateProperty.action || stateProperty.state)}
    </LoadingButton>
  )
}

export default Power
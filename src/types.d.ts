enum State {
  Off = "off",
  Starting = "starting",
  Stopping = "stopping",
  Restarting = "restarting",
  Serviceready = "serviceready",
  Ready = "ready",
  Upgrading = "upgrading",
  Provisioning = "provisioning",
}
interface Machine {
  id: string
  name: string
  os: string
  usageRate: string
  agentType: string
  state: State
  region: string
}

interface Utilization {
  machineId: string
  secondsUsed: float
  hourlyRate?: string
  monthlyRate?: string
  billingMonth: string
}
export enum State {
  Off = "off",
  Starting = "starting",
  Stopping = "stopping",
  Restarting = "restarting",
  ServiceReady = "serviceready",
  Ready = "ready",
  Upgrading = "upgrading",
  Provisioning = "provisioning",
}

export interface StateProperty {
  state: State
  borderColor: string
  action?: 'start' | 'stop' | 'restart'
  actionColor?: 'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning'
}

// Maybe would be better as an class
export function getStateProperty(state: State): StateProperty {
  switch (state) {
    case State.Off: return { state: State.Off, borderColor: 'border-black', action: 'start', actionColor: 'success' }
    case State.Ready: return { state: State.Ready, borderColor: 'border-emerald-500', action: 'stop', actionColor: 'error' }
    case State.ServiceReady: return { state: State.ServiceReady, borderColor: 'border-emerald-500', action: 'stop', actionColor: 'error' }
    case State.Starting: return { state: State.Starting, borderColor: 'border-orange-500' }
    case State.Restarting: return { state: State.Restarting, borderColor: 'border-red-500' }
    default: return { state: state, borderColor: 'border-black' }
  }
}

export interface Machine {
  id: string
  name: string
  os: string
  usageRate: string
  agentType: string
  state: State
  region: string
}

// Would also be better as a class
export interface UtilizationResponse {
  machineId: string
  utilization: Utilization
  storageUtilization?: Utilization
}

export interface Utilization {
  machineId: string
  secondsUsed: number
  hourlyRate?: string
  monthlyRate?: string
  billingMonth: string
}
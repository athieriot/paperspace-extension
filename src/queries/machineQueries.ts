import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import type dayjs from 'dayjs'

const instance = axios.create({
  baseURL: 'https://api.paperspace.io',
  headers: { 'X-Api-Key': '7a8a0b83cb4eefc4180b99d42e45a5' }
})

const fetchMachines = async () => instance.get('/machines/getMachines').then(response => response.data)

export const useMachines = () => useQuery<Machine[]>(['machines'], fetchMachines)

export interface UtilizationResponse {
  machineId: string
  utilization: Utilization
  storageUtilization?: Utilization
}

const fetchUtilization = async (machineId: string, billingMonth: dayjs.Dayjs) => {
    const params = {
        machineId: machineId,
      billingMonth: billingMonth.format('YYYY-MM')
    }

  return instance
  .get('/machines/getUtilization', { params: params })
  .then(response => response.data)
}

export const useUtilization = (machineId: string, billingMonth: dayjs.Dayjs) => (
  useQuery<UtilizationResponse>(['utilization', machineId, billingMonth.toISOString()], () => fetchUtilization(machineId, billingMonth))
)
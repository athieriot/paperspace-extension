import {useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { AxiosInstance } from 'axios'
import type dayjs from 'dayjs'
import { useContext } from 'react'
import { PaperspaceInstanceContext } from '~PaperspaceInstanceProvider'
import type { Machine, UtilizationResponse } from '~types'

//7a8a0b83cb4eefc4180b99d42e45a5

/**
 * List
 */
export const useMachines = () => {
  const instance = useContext(PaperspaceInstanceContext)

  return useQuery<Machine[]>(['machines'], () => instance.get('/machines/getMachines').then(response => response.data), {
    // Refetch the data every 5 seconds
    refetchInterval: 5 * 1000,
  })
}

/**
* Utilization
*/

const fetchUtilization = async (machineId: string, billingMonth: dayjs.Dayjs, instance: AxiosInstance) => {
    const params = {
      machineId: machineId,
      billingMonth: billingMonth.format('YYYY-MM')
    }

  return instance
    .get('/machines/getUtilization', { params: params })
    .then(response => response.data)
}

export const useUtilization = (machineId: string, billingMonth: dayjs.Dayjs) => {
  const instance = useContext(PaperspaceInstanceContext)

  return useQuery<UtilizationResponse>(['utilization', machineId, billingMonth.toISOString()], () => fetchUtilization(machineId, billingMonth, instance))
}

/**
* Start / Stop / Restart
*/

export const usePower = (machineId: string) => {
  const instance = useContext(PaperspaceInstanceContext)
  const queryClient = useQueryClient()

  return useMutation({mutationFn: (state: 'start' | 'stop' | 'restart') => instance.post(`/machines/${machineId}/${state}`), onSuccess: () => {
    return queryClient.invalidateQueries({ queryKey: ['machines'] })
  }})
}

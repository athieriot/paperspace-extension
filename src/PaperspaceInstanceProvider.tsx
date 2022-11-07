import { useStorage } from '@plasmohq/storage/hook'
import type { AxiosInstance } from 'axios'
import axios from 'axios'
import * as React from 'react'
import Configuration from '~components/Configuration'

export const PaperspaceInstanceContext = React.createContext<AxiosInstance | undefined>(undefined)

interface Props {
  children?: React.ReactNode
}

const PaperspaceInstanceProvider = ({ children }: Props) => {
  const [paperspaceApiKey, setPaperspaceApiKey] = useStorage<string>("paperspace_api_key")

  if (!paperspaceApiKey) {
      return <Configuration onSave={setPaperspaceApiKey} />
  }

  const instance = axios.create({
    baseURL: process.env.PLASMO_PUBLIC_PAPERSPACE_BASE_URL,
    headers: { 'X-Api-Key': paperspaceApiKey }
  })

  return (
    <PaperspaceInstanceContext.Provider value={instance}>
      {children}
    </PaperspaceInstanceContext.Provider>
  )
}

export default PaperspaceInstanceProvider
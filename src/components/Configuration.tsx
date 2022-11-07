import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from "react"
import Link from '@mui/material/Link'

interface Props {
  defaultKey?: string
  onSave: (key: string) => void
}

const Configuration = ({ defaultKey, onSave }: Props) => {
    const [apiKey, setApiKey] = useState<string>(defaultKey)

    if (defaultKey && !apiKey) {
      setApiKey(defaultKey)
    }

    return (
      <Card>
        <CardContent>
          <Typography component="div">
            Please configure Paperspace extension <Link href="https://console.paperspace.com/tej2amlnm/settings/apikeys" target="_blank">here</Link>
          </Typography>
          <TextField
            label="Paperspace API Key"
            value={apiKey || ''}
            onChange={(event) => setApiKey(event.target.value)}
          />
          <Button onClick={() => onSave(apiKey)}>
            Save
          </Button>
        </CardContent>
      </Card>
    )
}

export default Configuration
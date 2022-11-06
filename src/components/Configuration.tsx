import TextField from '@mui/material/TextField'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import { useState } from "react"

interface Props {
  defaultKey?: string
  onSave: (key: string) => void
}

const Configuration = ({ defaultKey, onSave }: Props) => {
    const [key, setKey] = useState(defaultKey)

    return (
      <Card>
        <CardContent>
          <Typography component="div">Please configure Paperspace extension</Typography>
          <TextField
            label="Paperspace API Key"
            value={key || ''}
            onChange={(event) => setKey(event.target.value)}
          />
          <Button onClick={() => onSave(key)}>
            Save
          </Button>
        </CardContent>
      </Card>
    )
}

export default Configuration
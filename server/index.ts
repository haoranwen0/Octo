import express, { Express, Request, Response } from 'express'
import diagramRoutes from './routes/diagram'
import diagramRoutesV2 from './routes/diagram-v2'
import dotenv from 'dotenv'
import cors from 'cors'

const app: Express = express()

dotenv.config()

// Cor middleware allowing all origin access
app.use(cors())
app.use(express.json())

// Initialize routes
app.use('/diagram', diagramRoutes)
app.use('/diagram-v2', diagramRoutesV2)

app.get('/', (req: Request, res: Response) => {
  res.status(200).send('Connected!')
})

// Get env variables
const port = process.env.PORT

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

export default app

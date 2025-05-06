import express from 'express'
import cors from 'cors'
import { FRONTEND_URL } from './config/config.js'

// imports de rutas
import authRoutes from './routes/authRoutes.js'
import userRoutes from './routes/userRoutes.js'
import taskRoutes from './routes/taskRoutes.js'
import fileRoutes from './routes/fileRoutes.js'
import awsRoutes from './routes/awsRoutes.js'

const app = express()

// Middleware para parsear JSON
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ limit: '10mb', extended: true }))
app.use(
  cors({
    origin: FRONTEND_URL,
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization'
  })
)

// Auth
app.use('/auth', authRoutes)

// User
app.use('/user', userRoutes)

// Task
app.use('/task', taskRoutes)

// Files
app.use('/file', fileRoutes)

// aws
app.use('/aws', awsRoutes)

app.get('/health', (req, res) => {
  res.status(200).send('OK')
})

// Manejo de errores 404
app.use((_req, res, next) => {
  res.status(404).json({ message: 'Recurso no encontrado' })
})

export default app

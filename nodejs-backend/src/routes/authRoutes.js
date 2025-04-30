import express from 'express'

// imports de métodos desde el controlador
import { index, login, register } from '../controllers/authController.js'

const router = express.Router()

router.get('/', index)
router.post('/login', login) // login para pacientes y medicos (pendiente para administradores)
router.post('/register', register) // registro de pacientes y medicos (pendiente para administradores)

export default router

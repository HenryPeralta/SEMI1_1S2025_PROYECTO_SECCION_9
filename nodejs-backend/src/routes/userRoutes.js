import express from 'express'

// imports de métodos desde el controlador
import {
  index,
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  deleteUserById,
  deleteUserByUsername,
  deleteUserByEmail
} from '../controllers/userController.js'

const router = express.Router()

router.get('/', index)
router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.get('/email/:email', getUserByEmail)
router.get('/username/:username', getUserByUsername)
router.put('/:id', updateUser)
router.delete('/:id', deleteUserById)
router.delete('/username/:username', deleteUserByUsername)
router.delete('/email/:email', deleteUserByEmail)

export default router

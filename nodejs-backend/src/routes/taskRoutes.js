import express from 'express'

// imports de métodos desde el controlador
import {
  index,
  getAllTasks,
  getTaskById,
  getTaskByUserId,
  getTaskByTitle,
  createTask,
  updateTaskById,
  deleteTaskById
} from '../controllers/taskController.js'

const router = express.Router()

router.get('/', index)
router.get('/all', getAllTasks)
router.get('/:id', getTaskById)
router.get('/user/:usuario_id', getTaskByUserId)
router.get('/title/:titulo', getTaskByTitle)
router.post('/', createTask)
router.put('/:id', updateTaskById)
router.delete('/:id', deleteTaskById)

export default router

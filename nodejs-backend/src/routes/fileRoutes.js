import express from 'express'

// imports de métodos desde el controlador
import {
  index,
  getAllFiles,
  getFile,
  createFile,
  updateFile,
  deleteFile,
  getAllFilesUser
} from '../controllers/fileController.js'

const router = express.Router()

router.get('/', index)
router.get('/all', getAllFiles)
router.get('/:id', getFile)
router.post('/', createFile)
router.put('/:id', updateFile)
router.delete('/:id', deleteFile)
router.get('/all/:id', getAllFilesUser)

export default router

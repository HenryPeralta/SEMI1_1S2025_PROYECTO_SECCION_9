/* eslint-disable camelcase */
import {
  createTask,
  getAll,
  getTaskById,
  updateTaskById,
  deleteTaskById,
  getTaskByUserId,
  getTaskByTitle
} from '../models/taskModel.js'

export const createTaskService = async (req, res) => {
  const { usuario_id, titulo, descripcion, completada = false } = req.body

  const task = await createTask(usuario_id, titulo, descripcion, completada)

  return {
    task
  }
}

export const getAllService = async () => await getAll()

export const getTaskByIdService = async (req, res) => {
  const { id } = req.params

  const task = await getTaskById(id)

  if (!task) {
    throw new Error(`Tarea con id ${id} no encontrada.`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    id: task.id,
    usuario_id: task.usuario_id,
    titulo: task.titulo,
    descripcion: task.descripcion,
    completada: task.completada,
    fecha_creacion: task.fecha_creacion,
    fecha_modificacion: task.fecha_modificacion
  }
}

export const getTaskByUserIdService = async (req, res) => {
  const { usuario_id } = req.params

  const tasks = await getTaskByUserId(usuario_id)

  if (!tasks) {
    throw new Error(`Tareas del usuario con id ${usuario_id} no encontradas.`, {
      cause: { statusCode: 404 }
    })
  }

  return tasks
}

export const getTaskByTitleService = async (req, res) => {
  const { titulo } = req.params

  const tasks = await getTaskByTitle(titulo)

  if (!tasks) {
    throw new Error(`Tareas con el título ${titulo} no encontradas.`, {
      cause: { statusCode: 404 }
    })
  }

  return tasks
}

export const updateTaskByIdService = async (req, res) => {
  const { id } = req.params
  const { usuario_id, titulo, descripcion, completada } = req.body

  return {
    affected_rows: await updateTaskById(
      id,
      usuario_id,
      titulo,
      descripcion,
      completada
    )
  }
}

export const deleteTaskByIdService = async (req, res) => {
  const { id } = req.params

  return {
    affected_rows: await deleteTaskById(id)
  }
}

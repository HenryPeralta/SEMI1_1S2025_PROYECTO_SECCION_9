import { responseHandler } from '../utils/responseHandler.js'
import {
  getAllService,
  createTaskService,
  getTaskByIdService,
  getTaskByUserIdService,
  getTaskByTitleService,
  updateTaskByIdService,
  deleteTaskByIdService
} from '../services/taskService.js'

export const index = (_req, res) =>
  responseHandler(res, {
    stringCode: 'WELCOME',
    message: 'Bienvenido al endpoint de tareas'
  })

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await getAllService(req, res)

    responseHandler(res, {
      stringCode: 'TASKS_FOUND',
      message: 'Tareas encontradas',
      payload: tasks
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASKS_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const createTask = async (req, res) => {
  try {
    const task = await createTaskService(req, res)

    responseHandler(res, {
      stringCode: 'TASK_CREATED',
      message: 'Tarea creada',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASK_NOT_CREATED',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getTaskById = async (req, res) => {
  try {
    const task = await getTaskByIdService(req, res)

    responseHandler(res, {
      stringCode: 'TASK_FOUND',
      message: 'Tarea encontrada',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASK_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getTaskByUserId = async (req, res) => {
  try {
    const task = await getTaskByUserIdService(req, res)

    responseHandler(res, {
      stringCode: 'TASKS_FOUND',
      message: 'Tareas encontradas',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASKS_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getTaskByTitle = async (req, res) => {
  try {
    const task = await getTaskByTitleService(req, res)

    responseHandler(res, {
      stringCode: 'TASKS_FOUND',
      message: 'Tareas encontradas',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASKS_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const updateTaskById = async (req, res) => {
  try {
    const task = await updateTaskByIdService(req, res)

    responseHandler(res, {
      stringCode: 'TASK_UPDATED',
      message: 'Tarea actualizado',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASK_NOT_UPDATED',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const deleteTaskById = async (req, res) => {
  try {
    const task = await deleteTaskByIdService(req, res)

    responseHandler(res, {
      stringCode: 'TASK_DELETED',
      message: 'Tarea eliminada',
      payload: task
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'TASK_NOT_DELETED',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

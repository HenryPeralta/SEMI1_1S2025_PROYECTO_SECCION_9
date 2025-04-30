/* eslint-disable camelcase */
import { responseHandler } from '../utils/responseHandler.js'
import {
  getAllService,
  getUserByIdService,
  getUserByEmailService,
  getUserByUsernameService,
  updateUserById,
  deleteUserByIdService,
  deleteUserByUsernameService,
  deleteUserByEmailService
} from '../services/userService.js'

export const index = (_req, res) =>
  responseHandler(res, {
    stringCode: 'WELCOME',
    message: 'Bienvenido al endpoint de usuarios'
  })

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllService(req, res)

    responseHandler(res, {
      stringCode: 'USERS_FOUND',
      message: 'Usuarios encontrados',
      payload: users
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USERS_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getUserById = async (req, res) => {
  try {
    const user = await getUserByIdService(req, res)

    responseHandler(res, {
      stringCode: 'USER_FOUND',
      message: 'Usuario encontrado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getUserByEmail = async (req, res) => {
  try {
    const user = await getUserByEmailService(req, res)

    responseHandler(res, {
      stringCode: 'USER_FOUND',
      message: 'Usuario encontrado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const getUserByUsername = async (req, res) => {
  try {
    const user = await getUserByUsernameService(req, res)

    responseHandler(res, {
      stringCode: 'USER_FOUND',
      message: 'Usuario encontrado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const updateUser = async (req, res) => {
  try {
    const user = await updateUserById(req, res)

    responseHandler(res, {
      stringCode: 'USER_UPDATED',
      message: 'Usuario actualizado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const deleteUserById = async (req, res) => {
  try {
    const user = await deleteUserByIdService(req, res)

    responseHandler(res, {
      stringCode: 'USER_DELETED',
      message: 'Usuario eliminado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const deleteUserByUsername = async (req, res) => {
  try {
    const user = await deleteUserByUsernameService(req, res)

    responseHandler(res, {
      stringCode: 'USER_DELETED',
      message: 'Usuario eliminado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

export const deleteUserByEmail = async (req, res) => {
  try {
    const user = await deleteUserByEmailService(req, res)

    responseHandler(res, {
      stringCode: 'USER_DELETED',
      message: 'Usuario eliminado',
      payload: user
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'USER_NOT_FOUND',
      numberCode: cause?.statusCode ? cause.statusCode : 404,
      message
    })
  }
}

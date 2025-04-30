/* eslint-disable camelcase */
import { responseHandler } from '../utils/responseHandler.js'
import {
  getAllService,
  getFileByIdService,
  createFileService,
  updateFileService,
  deleteFileService,
  getAllFilesUserId
} from '../services/fileService.js'

export const index = (_req, res) => {
  responseHandler(res, {
    stringCode: 'WELCOME',
    message: 'Bienvenido al endpoint de usuarios'
  })
}

export const getAllFiles = async (req, res) => {
  try {
    const files = await getAllService()

    responseHandler(res, {
      stringCode: 'FILES_FOUND',
      message: 'Archivos encontrados',
      payload: files
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILES_NOT_FOUND',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

export const getFile = async (req, res) => {
  try {
    const file = await getFileByIdService(req, res)

    responseHandler(res, {
      stringCode: 'FILE_FOUND',
      message: 'Archivo encontrado',
      payload: file
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILE_NOT_FOUND',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

export const createFile = async (req, res) => {
  try {
    const file = await createFileService(req, res)

    responseHandler(res, {
      stringCode: 'FILE_CREATED',
      message: 'Archivo creado',
      payload: file
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILE_NOT_CREATED',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

export const updateFile = async (req, res) => {
  try {
    const file = await updateFileService(req, res)

    responseHandler(res, {
      stringCode: 'FILE_UPDATED',
      message: 'Archivo actualizado',
      payload: file
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILE_NOT_UPDATED',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

export const deleteFile = async (req, res) => {
  try {
    const file = await deleteFileService(req, res)

    responseHandler(res, {
      stringCode: 'FILE_DELETED',
      message: 'Archivo eliminado',
      payload: file
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILE_NOT_DELETED',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

export const getAllFilesUser = async (req, res) => {
  try {
    const files = await getAllFilesUserId(req, res)

    responseHandler(res, {
      stringCode: 'FILES_FOUND',
      message: 'Archivos encontrados',
      payload: files
    })
  } catch (error) {
    const { message, cause } = error
    responseHandler(res, {
      status: 'error',
      stringCode: 'FILES_NOT_FOUND',
      numberCode: cause?.statusCode || 500,
      message
    })
  }
}

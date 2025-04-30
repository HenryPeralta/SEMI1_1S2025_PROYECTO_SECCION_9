/* eslint-disable camelcase */
import {
  getAll,
  getFileById,
  createFile,
  updateFile,
  deleteFile,
  getAllfilesUserBD
} from '../models/fileModel.js'

export const getAllService = async () => await getAll()

export const getFileByIdService = async (req, res) => {
  const { id } = req.params

  const file = await getFileById(id)

  if (!file) {
    throw new Error(`Archivo con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    id: file.id,
    usuario_id: file.usuario_id,
    nombre_archivo: file.nombre_archivo,
    tipo_archivo: file.tipo_archivo,
    url_archivo: file.url_archivo,
    fecha_creacion: file.fecha_creacion,
    fecha_modificacion: file.fecha_modificacion
  }
}

export const createFileService = async (req, res) => {
  const { usuario_id, nombre_archivo, tipo_archivo, url_archivo } = req.body

  const file = await createFile({
    usuario_id,
    nombre_archivo,
    tipo_archivo,
    url_archivo
  })

  return {
    id: file.id
  }
}

export const updateFileService = async (req, res) => {
  const { id } = req.params
  const { nombre_archivo, tipo_archivo, url_archivo } = req.body

  const file = await updateFile(id, nombre_archivo, tipo_archivo, url_archivo)

  if (!file) {
    throw new Error(`Archivo con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    affecet_rows: file.affected_rows
  }
}

export const deleteFileService = async (req, res) => {
  const { id } = req.params

  const file = await deleteFile(id)

  if (!file) {
    throw new Error(`Archivo con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    affecet_rows: file.affectedRows
  }
}

export const getAllFilesUserId = async (req, res) => {
  const { id } = req.params
  const file = await getAllfilesUserBD(id)
  return file
}
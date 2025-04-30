/* eslint-disable camelcase */
import { validateEmail } from '../utils/validateInput.js'
import {
  getAll,
  getUserById,
  getUserByEmail,
  getUserByUsername,
  updateUser,
  deleteUserByUsername,
  deleteUserByEmail,
  deleteUserById
} from '../models/userModel.js'

export const getAllService = async () => await getAll()

export const getUserByIdService = async (req, res) => {
  const { id } = req.params

  const user = await getUserById(id)

  if (!user) {
    throw new Error(`Usuario con id ${id} no encontrado`, {
      cause: { statusCode: 404 }
    })
  }

  return {
    id: user.id,
    nombre_usuario: user.nombre_usuario,
    correo: user.correo,
    imagen_perfil_url: user.imagen_perfil_url,
    fecha_registro: user.fecha_registro,
    fecha_modificacion: user.fecha_modificacion
  }
}

export const getUserByEmailService = async (req, res) => {
  const { email } = req.params

  if (!validateEmail(email)) {
    throw new Error('Email no válido', { cause: { statusCode: 400 } })
  }

  const user = await getUserByEmail(email)

  return {
    id: user.id,
    nombre_usuario: user.nombre_usuario,
    correo: user.correo,
    imagen_perfil_url: user.imagen_perfil_url,
    fecha_registro: user.fecha_registro,
    fecha_modificacion: user.fecha_modificacion
  }
}

export const getUserByUsernameService = async (req, res) => {
  const { username } = req.params

  const user = await getUserByUsername(username)

  return {
    id: user.id,
    nombre_usuario: user.nombre_usuario,
    correo: user.correo,
    imagen_perfil_url: user.imagen_perfil_url,
    fecha_registro: user.fecha_registro,
    fecha_modificacion: user.fecha_modificacion
  }
}

export const updateUserById = async (req, res) => {
  const { id } = req.params
  const { password, photo } = req.body

  return {
    affected_rows: await updateUser(id, password, photo)
  }
}

export const deleteUserByIdService = async (req, res) => {
  const { id } = req.params

  return {
    affected_rows: await deleteUserById(id)
  }
}

export const deleteUserByUsernameService = async (req, res) => {
  const { username } = req.params

  return {
    affected_rows: await deleteUserByUsername(username)
  }
}

export const deleteUserByEmailService = async (req, res) => {
  const { email } = req.params

  if (!validateEmail(email)) {
    throw new Error('Email no válido', { cause: { statusCode: 400 } })
  }

  return {
    affected_rows: await deleteUserByEmail(email)
  }
}
